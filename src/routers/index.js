import Home from '../views/home';
import Login from '../views/login'

const routers = [
  {
    title: '首页',
    path: '/',
    component: Home,
  },
  {
    title: '关于',
    path: '/login',
    component: Login,
  },
];

export default routers;