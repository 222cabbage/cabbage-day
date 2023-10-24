/*
 * @Auther: qinzhenhao
 * @Date: 2023-10-19 09:17:20
 * @LastEditors: qinzhenhao
 * @LastEditTime: 2023-10-23 11:58:14
 * @Description: 
 */
import { useState, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import routers from './routers';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Suspense>
        <Routes>
          {routers.map((item, index) => {
            return (
              <Route
                key={index}
                exact
                path={item.path}
                element={<item.component />} // 不是老版本的：component 或 render
              // onEnter、onBeforeMount、onMounted事件，会在组件初始化时执行一次，切换路由不执行
              // 若 修改 document.title 查看文档：https://blog.csdn.net/weixin_44461275/article/details/122843160
              />
            );
          })}
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
