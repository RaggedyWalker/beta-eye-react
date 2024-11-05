import React, { useCallback, useEffect, useState } from 'react';
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
import { motion } from 'framer-motion';
import SuperSearch from '@/components/layout/header/SuperSearch.tsx';
import Logo from '@/components/layout/Logo.tsx';
import Avatar from './Avatar';
import LayoutToggle from './LayoutToggle';

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
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [allSiderMenus, setAllSiderMenus] = useState<NonNullable<ItemType>[]>(
    [],
  );
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

  const handleToggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  return (
    <div className="rounded-2xl bg-[#896bb60f]">
      <div className="flex h-screen flex-row">
        <motion.aside
          layout
          className="hidden overflow-y-auto whitespace-nowrap border-r-2 border-r-gray-100 bg-white px-4 lg:block"
          style={{ borderRightStyle: 'solid' }}
        >
          <Logo
            collapsed={collapsed}
            theme={systemTheme}
            className=""
            size={'4rem'}
          />
          <div className="mt-6 flex flex-col space-y-2">
            {allSiderMenus.map((item) => (
              <nav
                className={`${collapsed ? 'justify-center' : 'px-4'} text-md flex cursor-pointer items-center rounded-md py-2 font-semibold hover:bg-primary/10 hover:text-primary ${pathname === item.key ? 'bg-primary/10 text-primary' : 'text-gray-500'}`}
                key={item.key}
                onClick={() => navigate(item.key)}
              >
                <motion.span
                  className={`inline-flex text-2xl`}
                  title={item.label.toString()}
                >
                  {item.icon}
                </motion.span>
                <span
                  className={`${collapsed ? 'hidden' : 'block'} text-md ml-2 mr-4`}
                >
                  {item.label}
                </span>
              </nav>
            ))}
          </div>
        </motion.aside>

        <motion.div layout className={`flex w-full min-w-0 flex-auto flex-col`}>
          <header
            className="flex flex-row items-center justify-between border-0 border-b-2 border-solid border-b-gray-200 bg-container-base/95 px-10 py-3"
            style={{
              boxShadow:
                '0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)',
            }}
          >
            <Logo
              collapsed={collapsed}
              theme={systemTheme}
              className="block lg:hidden"
            />
            <SuperSearch className="w-60"></SuperSearch>
            <Avatar></Avatar>
          </header>
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </motion.div>
      </div>
      <LayoutToggle
        collapsed={collapsed}
        handleToggle={handleToggle}
      ></LayoutToggle>
    </div>
  );
};

export default AppLayout;
