import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './rem'
// 使用redux
import { Provider } from 'react-redux'
// 使用store
import store from './redux/store'
// import * as serviceWorker from './serviceWorker';

// 标准的react入口页面就这样就可以了,其他的都不用
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
