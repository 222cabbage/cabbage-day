/*
 * @Auther: qinzhenhao
 * @Date: 2023-10-24 11:24:09
 * @LastEditors: qinzhenhao
 * @LastEditTime: 2023-10-24 16:41:04
 * @Description: 
 */
import React, { useState } from 'react'
import { Line } from '@ant-design/plots';
import { useEffect } from 'react';
import { storageGet } from '../../../common/localUtils';
import { envir } from '../../../config';
import dayjs from 'dayjs'

const ChartLine = () => {

    const [data, setData] = useState([]);

    const config = {
        data,
        padding: 'auto',
        xField: 'date',
        yField: 'num',
        xAxis: {
            tickCount: 7,
        },
        tooltip: {
            formatter: (datum) => {
                return { name: '当日计划数', value: datum.num + '件' };
            },
        }
    };

    useEffect(() => {
        getDate()
    }, [])

    const getDate = () => {
        var sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        let arr = []
        for (var i = 0; i <= 6; i++) {
            var date = new Date(sevenDaysAgo);
            date.setDate(sevenDaysAgo.getDate() + i);
            arr.push(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate())
        }

        let data = storageGet(envir.localKey)
        let dataArr = []

        console.log(arr.length)

        for (var i = 0; i <= arr.length; i++) {
            if (data && data[arr[i]] && data[arr[i]].length) {
                dayjs(arr[i]).format(envir.formatDate)
                dataArr.push({
                    date: arr[i],
                    num: data[arr[i]].length || 0
                })
            } else {
                dataArr.push({
                    date: arr[i],
                    num: 0
                })
            }
        }

        setData(dataArr)
    }

    return <div style={{ width: '100%', height: '100%', padding: '20px' }}>
        <Line {...config} />
    </div>
}

export default ChartLine