/*
 * @Auther: qinzhenhao
 * @Date: 2023-10-13 17:36:58
 * @LastEditors: qinzhenhao
 * @LastEditTime: 2023-10-16 16:37:43
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
import LowCode from '../low-code';
import DateManager from '../date-manageer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const LayoutContainer = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ height:'100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    // theme="dark"
                    style={{ 
                        height:'100vh',
                     }}
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={(e) => {
                        console.log(e)
                        navigate(e.key)
                    }}
                    onSelect={(e) => {
                        console.log(e)
                    }}
                    items={[
                        {
                            key: '/home/datemanager',
                            icon: <CalendarOutlined />,
                            label: '日程',
                        },
                        {
                            key: '/home/lowcode',
                            icon: <BulbOutlined />,
                            label: '低码',
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
                        minHeight:280,
                        background: colorBgContainer,
                    }}
                >
                    <Routes>
                        <Route exact path="/datemanager" element={<DateManager />} />
                        <Route exact path="/lowcode" element={<LowCode />} />
                        <Route exact path="*" element={<DateManager />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    )
}
export default LayoutContainer