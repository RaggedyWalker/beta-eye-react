import { useState } from 'react';

function useUserInfo() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );

  function clearToken() {
    localStorage.removeItem('token');
    setToken(null);
  }

  return {
    token,
    clearToken,
  };
}

export default useUserInfo;
