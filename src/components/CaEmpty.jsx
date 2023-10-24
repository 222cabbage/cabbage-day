/*
 * @Auther: qinzhenhao
 * @Date: 2023-10-23 15:52:12
 * @LastEditors: qinzhenhao
 * @LastEditTime: 2023-10-23 17:40:02
 * @Description: 
 */
import React from 'react';
import { Empty } from 'antd';

const CaEmpty = ({ description }) => <Empty description={description} image={Empty.PRESENTED_IMAGE_SIMPLE} />;

export default CaEmpty;