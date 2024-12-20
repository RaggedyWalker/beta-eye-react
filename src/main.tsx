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
import { StyleProvider } from '@ant-design/cssinjs';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { UserProvider } from './context/user';
import './main.css';

dayjs.locale(zhCN.locale);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyleProvider layer>
      <ConfigProvider theme={themeConfig} locale={zhCN}>
        <UserProvider>
          <App>
            <RouterProvider router={router}></RouterProvider>
          </App>
        </UserProvider>
      </ConfigProvider>
    </StyleProvider>
  </React.StrictMode>,
);
