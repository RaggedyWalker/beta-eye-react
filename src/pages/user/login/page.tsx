import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BetaCard from '@/components/layout/Card';
import ApplyForAccount from './ApplyForAccount';
import Login from './Login';
import Registry from './Regsitry';
import Resetpw from './Resetpw';

const background = {
  a: {
    background:
      'repeating-radial-gradient(circle at 46.33% 46.33%,rgba(107, 225, 255, 0.2) 0%,rgba(114, 46, 209, 0.2) 100%)',
  },
  c: {
    background:
      'repeating-linear-gradient(120deg,rgba(107, 225, 255, 0.2) 0%,rgba(114, 46, 209, 0.2) 100%)',
  },
  b: { backgroundImage: 'linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)' },
};

type ActionType = 'login' | 'registry' | 'applyForAccount' | 'resetpw';
function LoginPage() {
  const location = useLocation();
  const [action, setAction] = useState<ActionType>('login');

  useEffect(() => {
    if (location.pathname === '/registry') {
      setAction('registry');
    } else if (location.pathname === '/login') {
      setAction('login');
    } else if (location.pathname === '/applyForAccount') {
      setAction('applyForAccount');
    } else if (location.pathname === '/resetpw') {
      setAction('resetpw');
    }
  }, [location.pathname]);

  const actionEnum = {
    registry: {
      component: <Registry></Registry>,
      title: '注册',
    },
    login: {
      component: <Login></Login>,
      title: '登录',
    },
    applyForAccount: {
      component: <ApplyForAccount></ApplyForAccount>,
      title: '申请账号',
    },
    resetpw: {
      component: <Resetpw></Resetpw>,
      title: '重置密码',
    },
  };

  return (
    <div
      className="flex h-screen items-center justify-center bg-layout-base"
      style={Object.assign({}, background.a)}
    >
      <BetaCard
        className="sm:min-w-full md:min-w-[400px] md:max-w-[600px]"
        style={{
          margin: '0 auto',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="mb-4 text-2xl font-bold">
          {actionEnum[action].title}
        </div>
        {actionEnum[action].component}
      </BetaCard>
    </div>
  );
}
export default LoginPage;
