import React, { lazy } from 'react';
import { AiOutlineExperiment, AiOutlineStock } from 'react-icons/ai';
import { RiAdminLine, RiBtcLine } from 'react-icons/ri';
import { TbViewfinder } from 'react-icons/tb';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { UserRole } from '@/types/user';
import WaitNewModule from '@/components/common/waitNewModule/WaitNewModule.tsx';
import AppLayout from '@/components/layout/AppLayout.tsx';
import ErrorPage from '@/pages/error';
import OverviewPage from '@/pages/market/overview/page.tsx';
// import StockPage from '@/pages/market/stock/page.tsx';
import TrainPage from '@/pages/playground/train/page';
// import TrainSandBox from '@/pages/playground/train/sandbox/page';
import PredictPage from '@/pages/strategy/predict/page.tsx';
import LoginPage from '@/pages/user/login/page';
import SuspensePage from './SuspensePage';

const StockPage = lazy(() => import('@/pages/market/stock/page.tsx'));
const BackgroundPage = lazy(() => import('@/pages/background/page'));
const TrainSandBox = lazy(
  () => import('@/pages/playground/train/sandbox/page'),
);

export type RouteConfig = {
  meta?: {
    title?: string;
    menuLevel?: number;
    auth?: boolean;
    icon?: JSX.Element;
    role?: UserRole[];
  };
  children?: RouteConfig[];
  element?: React.ReactNode;
  errorElement?: React.ReactNode;
  index?: true | false;
  path?: string;
} & RouteObject;

const routesConfig: RouteConfig[] = [
  {
    path: '/',
    element: <Navigate replace to="/playground/train" />,
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
    path: '/resetpw',
    element: <LoginPage />,
    meta: {
      title: '重置密码',
      auth: false,
    },
  },
  {
    path: '/applyForAccount',
    element: <LoginPage />,
    meta: {
      title: '申请账号',
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
      icon: <RiBtcLine />,
    },
    children: [
      {
        index: true,
        element: <Navigate replace to="/strategy/predict" />,
        meta: {
          title: '策略',
          icon: <RiBtcLine />,
        },
      },
      {
        path: 'predict',
        element: <PredictPage />,
        meta: {
          menuLevel: 2,
          title: '预测走势',
          icon: <AiOutlineStock />,
        },
      },
      {
        path: 'exchange',
        element: <WaitNewModule />,
        meta: {
          menuLevel: 2,
          title: '开仓策略',
          icon: <RiBtcLine />,
        },
      },
      {
        path: 'finder',
        element: <WaitNewModule />,
        meta: {
          menuLevel: 2,
          title: '选股器',
          icon: <TbViewfinder />,
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
      icon: <RiBtcLine />,
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
        element: (
          <SuspensePage>
            <StockPage />
          </SuspensePage>
        ),
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
      icon: <RiBtcLine />,
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
          title: 'k线训练',
          menuLevel: 2,
          icon: <AiOutlineExperiment />,
        },
      },
      {
        path: 'train/sandbox/:id',
        // Component: React.lazy(() => import('@/pages/playground/train/sandbox/page')),
        element: (
          <SuspensePage>
            <TrainSandBox />
          </SuspensePage>
        ),
        meta: {
          title: 'k线训练沙盒',
          icon: <AiOutlineExperiment />,
        },
      },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'background',
        element: (
          <SuspensePage>
            <BackgroundPage />
          </SuspensePage>
        ),
        meta: {
          title: '后台管理',
          menuLevel: 2,
          icon: <RiAdminLine />,
          role: [UserRole.ADMIN],
        },
      },
    ],
  },
  { path: '*', element: <ErrorPage /> },
];

export default routesConfig;
