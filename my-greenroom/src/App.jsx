import React from 'react';
// 主题布局组件
import Layout from "./layouts";
// 使用路由
import { Router } from 'react-router-dom'
import { createBrowserHistory } from "history";
import './assets/index.less'
// 创建历史记录对象
const history = createBrowserHistory();

function App() {
  return (
    // 主体布局组件
    <Router history={history}>
      <Layout />
    </Router>

  );
}

export default App;

