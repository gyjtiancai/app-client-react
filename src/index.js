import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';
// console.log('process.env', process.env)
ReactDOM.render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
