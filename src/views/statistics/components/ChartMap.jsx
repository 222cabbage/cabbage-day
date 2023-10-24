/*
 * @Auther: qinzhenhao
 * @Date: 2023-10-24 11:24:09
 * @LastEditors: qinzhenhao
 * @LastEditTime: 2023-10-24 17:52:06
 * @Description: 
 */
import React, { useState } from 'react'
import { useEffect } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import { envir } from '../../../config';

window._AMapSecurityConfig = {
    securityJsCode: envir.GDSafe
}

const ChartMap = () => {

    const [location, setLocation] = useState([])

    useEffect(() => {
        getLocation()
    }, [])

    useEffect(()=>{
        initMap()
    }, [location])

    const getLocation = () => {
        var today = new Date();
        var hours = today.getHours();
        if (9 < Number(hours) && Number(hours) < 18) {
            setLocation([106.46599, 29.56043])
        } else {
            setLocation([106.34221, 29.63350])
        }
    }

    const initMap = () => {
        if (location.length > 0) {
            AMapLoader.load({
                "key": envir.GDKey,              // 申请好的Web端开发者Key，首次调用 load 时必填
                "version": "2.0",   // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
                "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap) => {
                const map = new AMap.Map('container', {
                    viewMode: '2D',  // 默认使用 2D 模式
                    zoom: 14,  //初始化地图层级
                    center: location
                });
                const marker = new AMap.Marker({
                    position: location //位置
                })
                map.add(marker); //添加到地图
            }).catch(e => {
                console.log(e);
            })
        }
    }

    return <div id="container" style={{ width: '100%', height: '100%', padding: '20px' }}></div>
}

export default ChartMap