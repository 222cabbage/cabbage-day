import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import routers from './routers';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
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
    </Router>
  )
}

export default App
