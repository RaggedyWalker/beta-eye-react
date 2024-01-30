import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import '@/config/dao.ts';
import router from '@/routes';
import theme from '@/themes/theme.config.ts';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ConfigProvider theme={theme} locale={zhCN}>
    <RouterProvider router={router}></RouterProvider>
  </ConfigProvider>,
  // </React.StrictMode>,
);
