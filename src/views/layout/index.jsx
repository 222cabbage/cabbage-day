/*
 * @Auther: qinzhenhao
 * @Date: 2023-10-13 17:36:58
 * @LastEditors: qinzhenhao
 * @LastEditTime: 2023-10-23 17:56:59
 * @Description: 
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    GlobalOutlined,
    CalendarOutlined,
    VideoCameraOutlined,
    BulbOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DateManager from '../date-manager';
import LowCode from '../low-code';
import SmallStore from '../smallStore';
import Statistics from '../statistics';

const LayoutContainer = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    // theme="dark"
                    style={{
                        height: '100vh',
                    }}
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={(e) => {
                        navigate(e.key)
                    }}
                    items={[
                        {
                            key: '/home/statistics',
                            icon: <CalendarOutlined />,
                            label: '工作台',
                        },
                        {
                            key: '/home/datemanager',
                            icon: <CalendarOutlined />,
                            label: '日程',
                        },
                        {
                            key: '/home/smallstore',
                            icon: <BulbOutlined />,
                            label: '我的小店',
                        },
                        {
                            key: '/home/lowcode',
                            icon: <BulbOutlined />,
                            label: '随便画画',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Routes>
                        <Route exact path="/statistics" element={<Statistics />} />
                        <Route exact path="/datemanager" element={<DateManager />} />
                        <Route exact path="/smallstore" element={<SmallStore />} />
                        <Route exact path="/lowcode" element={<LowCode />} />
                        <Route exact path="*" element={<DateManager />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    )
}
export default LayoutContainer