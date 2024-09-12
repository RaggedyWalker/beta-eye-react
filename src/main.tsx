import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { App } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import '@/config/dao.ts';
import router from '@/routes';
import '@/themes/normalize.css';
import themeConfig from '@/themes/theme.config.ts';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import './main.css';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={themeConfig} locale={zhCN}>
      <App>
        <RouterProvider router={router}></RouterProvider>
      </App>
    </ConfigProvider>
  </React.StrictMode>,
);
