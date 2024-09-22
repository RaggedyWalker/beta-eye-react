import { useState } from 'react';

function useUserInfo() {
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem('token'),
  );

  function clearToken() {
    localStorage.removeItem('token');
    setUserToken(null);
  }

  function setToken(token: string) {
    localStorage.setItem('token', token);
    setUserToken(token);
  }

  return {
    userToken,
    clearToken,
    setToken,
  };
}

export default useUserInfo;
