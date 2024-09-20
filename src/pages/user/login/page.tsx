import { useState } from 'react';
import BetaCard from '@/components/layout/Card';
import Login from './Login';
import Registry from './Regsitry';

function LoginPage() {
  const [action, setAction] = useState<'login' | 'registry'>('login');
  return (
    <div className="h-screen flex justify-center items-center bg-layout-base">
      <BetaCard
        style={{
          maxWidth: '600px',
          minWidth: '400px',
          margin: '0 auto',
          padding: '20px',
        }}
      >
        <div className="text-2xl font-bold mb-4">
          {action === 'login' ? '登录' : '注册'}
        </div>
        {action === 'login' ? (
          <Login handleAction={setAction} />
        ) : (
          <Registry handleAction={setAction} />
        )}
      </BetaCard>
    </div>
  );
}
export default LoginPage;
