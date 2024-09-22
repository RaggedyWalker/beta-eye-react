import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BetaCard from '@/components/layout/Card';
import Login from './Login';
import Registry from './Regsitry';

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

function LoginPage() {
  const location = useLocation();
  const [action, setAction] = useState<'login' | 'registry'>('login');

  useEffect(() => {
    setAction(location.pathname === '/registry' ? 'registry' : 'login');
  }, [location.pathname]);

  return (
    <div
      className="h-screen flex justify-center items-center bg-layout-base"
      style={Object.assign({}, background.a)}
    >
      <BetaCard
        style={{
          zIndex: 10000,
          maxWidth: '600px',
          minWidth: '400px',
          margin: '0 auto',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="text-2xl font-bold mb-4">
          {action === 'login' ? '登录' : '注册'}
        </div>
        {action === 'login' ? <Login /> : <Registry />}
      </BetaCard>
    </div>
  );
}
export default LoginPage;
