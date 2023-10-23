import React, { useEffect, useState, Suspense, lazy } from 'react';
import type { Dayjs } from 'dayjs';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar, Modal, Space, Input, Button, Row, Col, message, Card, Tag } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {
    ClockCircleOutlined,
    GlobalOutlined,
    PlusOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import CaEmpty from '../../components/CaEmpty'
import CaIconFont from '../../components/CaIconFont'
import { storageGet, storageSet } from '../../common/localUtils';
import { envir } from '../../config';
import Style from './index.module.scss'
dayjs.locale('zh-cn');

const getListData = (value: Dayjs, todos, selectTime) => {
    return todos[value.format(envir.formatDate)] || [];
};

const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
        return 1394;
    }
};

const DateManager = () => {

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value, toDos, selectTime);
        return (
            <ul className="events">
                {listData.length > 0 && listData.map((item, index) => (
                    <li key={index}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current); // 天
        if (info.type === 'month') return monthCellRender(current); // 月
        return info.originNode;
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        storageGet(selectTime, [])
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [toDos, setToDos] = useState({})
    const [selectTime, setSelectTime] = useState('')
    const [things, setThings] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        const data = storageGet(envir.localKey) // 获取本地缓存的数据
        if (data) {
            setToDos(data)
        } else {
            setToDos({})
            storageSet(envir.localKey, {})
        }
    }, [])

    const title = (title, icon) => {
        return <div className={Style['card_title']}>
            <Space>
                <>{icon}</>
                <>{title}</>
            </Space>
        </div>
    }

    const log = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
      };

    return (
        <div style={{ display: 'flex', height: "100%" }}>
            <div style={{ flex: 1, marginRight: '10px' }}>
                <Card title={title('当日计划', <CaIconFont type='icon-dingzhi' style={{ fontSize: '20px' }} />)} style={{ height: '100%' }} extra={<Button
                    icon={<PlusOutlined />}
                    type='primary'
                    onClick={() => {
                        showModal()
                    }}>
                    添加
                </Button>}>
                    {
                        toDos[selectTime] ? <dl>
                            {
                                toDos[selectTime] && toDos[selectTime].length > 0 && toDos[selectTime].map((item, index) => (
                                    <li key={index}>
                                        <Badge key={index} status={item.type as BadgeProps['status']} text={item.content} />
                                    </li>
                                ))
                            }
                        </dl> : <CaEmpty description='暂无计划' />
                    }
                </Card>
            </div>
            <div style={{ flex: 2, height: '100%' }}>
                <Card title={title('全部计划', <CaIconFont type='icon-bianji' style={{ fontSize: '20px' }} />)} style={{ height: '100%', overflowY: 'scroll' }}>
                    <Calendar cellRender={cellRender} onSelect={(date, info) => {
                        if (info.source == 'date') {
                            setSelectTime(date.format(envir.formatDate))
                        }
                    }} />
                </Card>
            </div>
            <Modal centered title={selectTime} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {
                    toDos[selectTime] ? <dl>
                        {
                            toDos[selectTime] && toDos[selectTime].length > 0 && toDos[selectTime].map((item, index) => (
                                <li key={index}>
                                    <Badge status={item.type as BadgeProps['status']} text={item.content} />
                                </li>
                            ))
                        }
                    </dl> : <div>暂无计划</div>
                }
                <Row gutter={[16, 16]}>
                    <Col span={88}>
                        <Input placeholder="你想做什么！" value={value} onChange={(inputValue) => {
                            setValue(inputValue.target.value)
                        }} />
                    </Col>
                    <Col span={8}>
                        <Button type="primary" onClick={() => {

                            if (value == '') {
                                message.info({
                                    type: 'error',
                                    content: '计划不能为空欧',
                                });
                                return
                            }

                            let dos = { ...toDos }

                            if (dos[selectTime]) {
                                dos[selectTime] = [...dos[selectTime], { type: 'success', content: value }]
                            } else {
                                dos[selectTime] = [{ type: 'success', content: value }]
                            }

                            setToDos(dos)

                            storageSet(envir.localKey, dos)

                            setValue('')

                        }}>添加</Button>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default DateManager