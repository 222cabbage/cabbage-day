/*
 * @Auther: qinzhenhao
 * @Date: 2023-10-25 09:34:00
 * @LastEditors: qinzhenhao
 * @LastEditTime: 2023-10-25 11:03:24
 * @Description: 
 */
import React from 'react'
// import './index.module.scss'
import { Button, Space, message } from 'antd';
import Style from './index.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { storageGet, storageSet } from '../../common/localUtils';
import { envir } from '../../config';
import CaIconFont from '../../components/CaIconFont'
import { Bullet } from '@ant-design/plots';

const Virtue = () => {

    const add = () => {
        setNum(num + 1)
        storageSet(envir.VirtueKey, num + 1)
        message.open({
            type: 'success',
            content: '功德+1',
        });
    }

    const [num, setNum] = useState(0)

    useEffect(() => {
        getNum()
    }, [])

    const getNum = () => {
        const data = storageGet(envir.VirtueKey) // 获取本地缓存的数据
        if (data) {
            setNum(data)
        } else {
            setNum(0)
            storageSet(envir.VirtueKey, 0)
        }
    }

    const data = [
        {
            title: num < 50 ? '小有成就' : '修佛有成',
            ranges: [100],
            measures: [num],
            target: 0,
        },
    ]; // @TODO 差一张垂直方向的缩略图

    const config = {
        data,
        measureField: 'measures',
        rangeField: 'ranges',
        targetField: 'target',
        xField: 'title',
        color: {
            range: '#f0efff',
            measure: '#5B8FF9',
            target: '#3D76DD',
        },
        xAxis: {
            line: null,
        },
        yAxis: false,
        layout: 'vertical',
        label: {
            measure: {
                position: 'middle',
                style: {
                    fill: '#fff',
                },
            },
        },
        // 自定义 legend
        legend: {
            custom: true,
            position: 'bottom',
            items: [
                {
                    value: '当前修佛进度',
                    name: '当前修佛进度',
                    marker: {
                        symbol: 'square',
                        style: {
                            fill: '#5B8FF9',
                            r: 5,
                        },
                    },
                },
                {
                    value: '修佛有成',
                    name: '修佛有成',
                    marker: {
                        symbol: 'line',
                        style: {
                            stroke: '#3D76DD',
                            r: 5,
                        },
                    },
                },
            ],
        },
    };

    return <div style={{ height: '100%' }}>
        <h1><CaIconFont type='icon-fo' style={{ fontSize: '40px' }} />点击攒功德(累计功德{num})</h1>
        {/* <audio id="audio_id" controls loop src="./1103img/敲击木鱼_耳聆网_[声音ID：19572].wav">木鱼声</audio> */}
        <br />
        {/* <audio id="audio_id1" controls autoplay loop src="./1103img/佛教歌曲 - 大悲咒.mp3">大悲咒</audio> */}
        <Button type="primary" onClick={() => {
            add()
        }}>点击攒功德</Button>
        <div style={{ flex: 1, height: "80%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className={Style['imgBox']} onClick={() => add()}></div>
            <div className={Style['container']}>
                <Bullet {...config} />
            </div>
        </div>
    </div>
}

export default Virtue