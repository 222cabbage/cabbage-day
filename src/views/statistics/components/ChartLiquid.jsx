/*
 * @Auther: qinzhenhao
 * @Date: 2023-10-24 11:24:09
 * @LastEditors: qinzhenhao
 * @LastEditTime: 2023-10-24 17:09:55
 * @Description: 
 */
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Liquid } from '@ant-design/plots';
import CaIconFont from '../../../components/CaIconFont'

const ChartLiquid = () => {

    const [data, setData] = useState(0);

    const config = {
        percent: data,
        outline: {
            border: 4,
            distance: 8,
        },
        wave: {
            length: 128,
        },
        statistic: {
            title: '1'
        }
    };

    useEffect(() => {
        getDate()
    }, [])

    const getDate = () => {
        var today = new Date();
        var hours = today.getHours();
        setData(hours / 24)
    }

    return <div style={{ width: '100%', height: '100%', padding: '20px' }}>
        <h2><CaIconFont type='icon-dingzhi' style={{ fontSize: '20px' }} />
            当日进度<span style={{ fontWeight:'lighter' }}>(没关系的，又活过了一天，已经很棒了)</span>
        </h2>
        <Liquid {...config} />
    </div>
}

export default ChartLiquid