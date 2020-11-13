// 引入react核心api
import React from 'react';
// 
import ReactDOM from 'react-dom'
// 使用redux
import { Provider } from "react-redux";
// 引入store
import store from './redux/store'
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);
