import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  matchRoutes,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useUserContext } from '@/context/user';
import routesConfig, { RouteConfig } from '@/routes/routesConfig.tsx';
import service from '@/service';
import { User } from '@/types/user';
import SuperSearch from '@/components/layout/header/SuperSearch.tsx';
import Logo from '@/components/layout/Logo.tsx';
import Avatar from './Avatar';

type ItemType = {
  key: string;
  label: JSX.Element | string;
  icon?: JSX.Element;
};

function getAllSiderMenus(user: User | null): NonNullable<ItemType>[] {
  const headerMenus: NonNullable<ItemType>[] = [];
  routesConfig.forEach((route) => {
    route.children?.forEach((child) => {
      if (child.meta?.menuLevel === 2) {
        if (
          !child.meta?.role ||
          child.meta?.role.length === 0 ||
          (user &&
            child.meta?.role.length > 0 &&
            child.meta?.role.includes(user.role))
        ) {
          headerMenus.push({
            key: [route.path, child.path].join('/') as string,
            label: child.meta?.title as string,
            icon: child.meta?.icon,
          });
        }
      }
    });
  });

  return headerMenus;
}

const AppLayout: React.FC<{ theme?: 'dark' | 'light' }> = (props) => {
  const systemTheme = props.theme || 'light';
  const [collapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [allSiderMenus, setAllSiderMenus] = useState<NonNullable<ItemType>[]>(
    [],
  );
  const showSider = useMemo(() => !collapsed, [collapsed]);

  // 判断当前路由是否需要登录权限，需要权限的判断权限，否则方形
  const checkAuth = useCallback(function (route: RouteConfig) {
    if (route.meta?.auth === false) {
      return;
    }
    if (!localStorage.token) {
      return navigate('/login', { replace: true, state: { from: pathname } });
    }
    if (!user) {
      // 获取用户信息
      service.user.info().then((res) => {
        console.log(res);

        setUser(res);
      });
    }
  }, []);

  useEffect(() => {
    const matches = matchRoutes(routesConfig, pathname);
    console.log('matchRoutes', pathname);
    if (matches && matches.length > 0) {
      checkAuth(matches[matches.length - 1].route);
    }
  }, [checkAuth, pathname]);

  useEffect(() => {
    setAllSiderMenus(getAllSiderMenus(user));
  }, [user]);

  return (
    <div className="rounded-2xl bg-[#896bb60f]">
      <div className="flex h-screen flex-row">
        {showSider && (
          <aside
            className="hidden min-w-[120] overflow-y-auto whitespace-nowrap border-r-2 border-r-gray-100 bg-white lg:block"
            style={{ borderRightStyle: 'solid' }}
          >
            <Logo theme={systemTheme} className="px-4 pr-10" />
            <div className="mt-6 flex flex-col space-y-2">
              {allSiderMenus.map((item) => (
                <nav
                  className={`duration-600 text-md mx-4 flex cursor-pointer items-center gap-4 rounded-md px-5 py-2 font-semibold transition hover:bg-primary/10 hover:text-primary ${pathname === item.key ? 'bg-primary/10 text-primary' : 'text-gray-500'} `}
                  key={item.key}
                  onClick={() => navigate(item.key)}
                >
                  <span className="inline-flex text-xl">{item.icon}</span>
                  {item.label}
                </nav>
              ))}
            </div>
          </aside>
        )}
        <div className={`flex w-full flex-1 flex-col`}>
          <header
            className="flex flex-row items-center justify-between border-0 border-b-2 border-solid border-b-gray-200 bg-container-base/95 px-10 py-3"
            style={{
              boxShadow:
                '0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)',
            }}
          >
            <Logo theme={systemTheme} className="block lg:hidden" />
            <SuperSearch className="w-60"></SuperSearch>
            <Avatar></Avatar>
          </header>
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
