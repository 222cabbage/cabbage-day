/*
 * @Auther: qinzhenhao
 * @Date: 2023-10-23 17:51:24
 * @LastEditors: qinzhenhao
 * @LastEditTime: 2023-10-24 11:10:56
 * @Description: 
 */
import React from 'react'
import ChartLine from './components/ChartLine'
import ChartLiquid from './components/ChartLiquid'
import ChartMap from './components/ChartMap'

const Statistics = () => {
    return (
        <div style={{ height: "100%", flex: 1, display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ width: '50%', height: '50%' }}>
                <ChartLine></ChartLine>
            </div>
            <div style={{ width: '50%', height: '50%' }}>
                <ChartLiquid></ChartLiquid>
            </div>
            <div style={{ width: '50%', height: '50%' }}>
                <ChartMap></ChartMap>
            </div>
            <div style={{ width: '50%', height: '50%' }}>123</div>
        </div>
    )
}

export default Statistics