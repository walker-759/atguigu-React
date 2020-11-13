import React from 'react';
import './App.less';
// 主体布局组件
import Layouts from './layouts/index'
// 使用路由
import {Router} from 'react-router-dom'
// 创建浏览器历史记录对象
import {createBrowserHistory} from 'history'
const history= createBrowserHistory()
function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Layouts></Layouts>
      </div>
    </Router>
  );
}

export default App;
// create-react-app安装postcss