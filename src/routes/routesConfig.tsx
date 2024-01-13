import { Navigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout.tsx';
import ErrorPage from '@/pages/error';
import predictPage from '@/pages/strategy/predict/page.tsx';

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
        element: predictPage,
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
        element: <div>市场</div>,
        meta: {
          title: '市场',
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
        element: <div>模拟</div>,
        meta: {
          title: '模拟',
        },
      },
    ],
  },
  { path: '*', element: <ErrorPage /> },
];

export default routesConfig;
