/*
 * @Auther: qinzhenhao
 * @Date: 2023-10-16 13:46:52
 * @LastEditors: qinzhenhao
 * @LastEditTime: 2023-10-16 16:04:56
 * @Description: 
 */
import React from "react";

const Layout = React.lazy(()=> import(/* webpackChunkName: "Home" */ "../views/layout"))
const LoginPage = React.lazy(()=> import(/* webpackChunkName: "Home" */ "../views/login"))

const routers = [
  {
    title: '首页',
    path: '/',
    component: Layout,
  },
  {
    title: '首页',
    path: '/home/*',
    component: Layout,
  },
  {
    title: '登录',
    path: '/login',
    component: LoginPage,
  },
];

export default routers;