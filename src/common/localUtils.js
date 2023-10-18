/*
 * @Auther: qinzhenhao
 * @Date: 2023-10-18 09:40:15
 * @LastEditors: qinzhenhao
 * @LastEditTime: 2023-10-18 10:27:34
 * @Description: 
 */
const storage = localStorage || sessionStorage;
const $extension = '$MOON'
/**
 * 以key-value形式存储相应的值到Storage
 * @param {*} key 存储的key值
 * @param {*} value 存储的value值
 */
export const storageSet = (key, value) => {
    if (!value) {
        return
    }
    const name = key.includes($extension) ? key : $extension + key
    const newVlue = { value, type: isType(value), time: Date.now() }
    storage.setItem(name, JSON.stringify(newVlue))
}

/**
 * 通过key从获取存储的值
 * @param {*} key 存储数据对应的key值
 * @param {long} invalidTime 失效时间，毫秒
 */
export const storageGet = (key, invalidTime = Date.now()) => {
    const name = key.includes($extension) ? key : $extension + key
    const valueJson = storage.getItem(name)
    if (valueJson) {
        const data = JSON.parse(valueJson)
        const { value, time } = data;
        if ((Date.now() - time) <= (invalidTime || Date.now())) {
            return value
        }
    }
}

/**
 * 删除key值对应Storage中的数据
 * @param {*} key 
 */
export const storageDelate = (key) => {
    const name = key.includes($extension) ? key : $extension + key
    storage.removeItem(name)
}

/**
 * 删除Storage中所有的数据
 */
export const storageClear = () => {
    storage.clear()
}

/**
 * 获取Storage中存储的数据个数
 */
export const storageLength = () => {
    return storage.length
}

const isType = (obj) => {
    return obj && (/\[object(.*?)\]/gi.exec(Object.prototype.toString.call(obj))[1].trim()) || 'undefined'
}