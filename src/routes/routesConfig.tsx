// import React from 'react';
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import WaitNewModule from '@/components/common/waitNewModule/WaitNewModule.tsx';
import AppLayout from '@/components/layout/AppLayout.tsx';
import ErrorPage from '@/pages/error';
import OverviewPage from '@/pages/market/overview/page.tsx';
import StockPage from '@/pages/market/stock/page.tsx';
import TrainPage from '@/pages/playground/train/page';
import PredictPage from '@/pages/strategy/predict/page.tsx';
import LoginPage from '@/pages/user/login/page';

// const TrainSandBox = () => import('@/pages/playground/train/sandbox/page');

export interface RouteConfig {
  meta?: {
    title?: string;
    menuLevel?: number;
    auth?: boolean;
  };
  children?: RouteConfig[];
  element?: React.ReactNode;
  errorElement?: React.ReactNode;
  index?: boolean;
  path?: string;
}

const routesConfig = [
  {
    path: '/',
    element: <Navigate replace to="/strategy" />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    meta: {
      title: '登录',
      auth: false,
    },
  },
  {
    path: '/registry',
    element: <LoginPage />,
    meta: {
      title: '注册',
      auth: false,
    },
  },
  {
    path: '/strategy',
    element: <AppLayout />,
    meta: {
      title: '策略',
      menuLevel: 1,
      auth: true,
    },
    children: [
      {
        index: true,
        element: <Navigate replace to="/strategy/predict" />,
        meta: {
          title: '策略',
        },
      },
      {
        path: 'predict',
        element: <PredictPage />,
        meta: {
          menuLevel: 2,
          title: '预测走势',
        },
      },
      {
        path: 'exchange',
        element: <WaitNewModule />,
        meta: {
          menuLevel: 2,
          title: '开仓策略',
        },
      },
      {
        path: 'finder',
        element: <WaitNewModule />,
        meta: {
          menuLevel: 2,
          title: '选股器',
        },
      },
    ],
  },
  {
    path: '/market',
    element: <AppLayout />,
    meta: {
      menuLevel: 1,
      title: '市场',
      auth: true,
    },
    children: [
      {
        index: true,
        element: <Navigate replace to="/market/overview" />,
        meta: {
          title: '市场',
        },
      },
      {
        path: 'overview',
        element: <OverviewPage />,
        meta: {
          // menuLevel: 2,
          title: '市场总览',
        },
      },
      {
        path: 'stock/:code?',
        element: <StockPage />,
        meta: {
          // menuLevel: 2,
          title: '个股',
        },
      },
    ],
  },
  {
    path: '/playground',
    element: <AppLayout />,
    meta: {
      menuLevel: 1,
      title: '模拟',
      auth: true,
    },
    children: [
      {
        index: true,
        element: <Navigate replace to="/playground/train" />,
        meta: {
          title: '模拟',
        },
      },
      {
        path: 'train',
        element: <TrainPage />,
        meta: {
          title: 'k线练习',
          menuLevel: 2,
        },
      },
      {
        path: 'train/sandbox/:id',
        Component: lazy(() => import('@/pages/playground/train/sandbox/page')),
        meta: {
          title: 'k线训练沙盒',
        },
      },
    ],
  },
  { path: '*', element: <ErrorPage /> },
];

export default routesConfig;
