// import React from 'react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout.tsx';
import ErrorPage from '@/pages/error';
import OverviewPage from '@/pages/market/overview/page.tsx';
import StockPage from '@/pages/market/stock/page.tsx';
import PredictPage from '@/pages/strategy/predict/page.tsx';

export interface RouteConfig {
  meta?: {
    title?: string;
    menuLevel?: number;
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
    path: '/strategy',
    element: <AppLayout />,
    meta: {
      title: '策略',
      menuLevel: 1,
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
        element: <div>开仓策略</div>,
        meta: {
          menuLevel: 2,
          title: '开仓策略',
        },
      },
      {
        path: 'finder',
        element: <div>选股器</div>,
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
    },
    children: [
      {
        index: true,
        element: <Navigate replace to="/playground/train" />,
        meta: {
          title: '市场',
        },
      },
      {
        path: 'train',
        element: <div>练习</div>,
        meta: {
          title: 'k线练习',
          menuLevel: 2,
        },
      },
    ],
  },
  { path: '*', element: <ErrorPage /> },
];

export default routesConfig;
