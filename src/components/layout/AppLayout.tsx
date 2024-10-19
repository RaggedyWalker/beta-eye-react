import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  matchRoutes,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Button, ConfigProvider, Layout, Menu, theme } from 'antd';
import routesConfig, { RouteConfig } from '@/routes/routesConfig.tsx';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import SuperSearch from '@/components/layout/header/SuperSearch.tsx';
import Logo from '@/components/layout/Logo.tsx';

type ItemType = {
  key: string;
  label: JSX.Element | string;
  icon?: JSX.Element;
};
function getHeaderMenus(): NonNullable<ItemType>[] {
  const headerMenus: NonNullable<ItemType>[] = [];
  routesConfig.forEach((route) => {
    if (route?.meta?.menuLevel === 1) {
      headerMenus.push({
        key: route.path as string,
        // label: <NavLink to={route.path as string}>{route.meta?.title}</NavLink>,
        label: route.meta?.title as string,
        icon: route.meta?.icon,
      });
    }
  });
  return headerMenus;
}

function getAllSiderMenus(): NonNullable<ItemType>[] {
  const headerMenus: NonNullable<ItemType>[] = [];
  routesConfig.forEach((route) => {
    route.children?.forEach((child) => {
      if (child.meta?.menuLevel === 2) {
        headerMenus.push({
          key: [route.path, child.path].join('/') as string,
          label: child.meta?.title as string,
          icon: child.meta?.icon,
        });
      }
    });
  });
  console.log(headerMenus);

  return headerMenus;
}

const AppLayout: React.FC<{ theme?: 'dark' | 'light' }> = (props) => {
  const [currentHeaderMenu, setCurrentHeaderMenu] = useState('');
  const [currentSideMenu, setCurrentSideMenu] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const systemTheme = props.theme || 'light';
  const { token } = theme.useToken();

  const headerMenus = useRef<NonNullable<ItemType>[]>(getHeaderMenus());
  const allSiderMenus = useRef<NonNullable<ItemType>[]>(getAllSiderMenus());

  // const sideMenus = useMemo<NonNullable<ItemType>[]>(() => {
  //   let sideMenus: NonNullable<ItemType>[] = [];
  //   const routes = matchRoutes(routesConfig, pathname);
  //   if (routes !== null && routes.length > 0 && routes[0].route.children) {
  //     const children = routes[0].route.children.filter(
  //       (item: RouteConfig) => item?.meta?.menuLevel === 2,
  //     );
  //     sideMenus = children.map((item) => {
  //       const to = [currentHeaderMenu, item.path].join('/');
  //       return {
  //         key: to,
  //         label: (<NavLink to={to}>{item.meta?.title}</NavLink>) as JSX.Element,
  //       };
  //     });
  //   }
  //   return sideMenus;
  // }, [currentHeaderMenu, pathname]);

  // useEffect(() => {
  //   const routes = matchRoutes(routesConfig, pathname);
  //   console.log('matchRoutes', routes);
  //   const auth = routes?.find((item) => item.route.meta?.auth === true);
  //   if (auth && !localStorage.token) {
  //     return navigate('/login', { replace: true, state: { from: pathname } });
  //   }
  //   if (routes !== null) {
  //     routes.forEach((route, index) => {
  //       if (index === 0) {
  //         setCurrentHeaderMenu(route.pathnameBase);
  //       }
  //       if (index === 1) {
  //         setCurrentSideMenu(route.pathnameBase);
  //       }
  //     });
  //   }
  // }, [pathname]);

  const showSider = useMemo(() => !collapsed, [collapsed]);
  return (
    <div className="rounded-2xl bg-[#896bb60f]">
      {/* <header
        style={{
          paddingLeft: 0,
          width: '100%',
          display: 'none',
          alignItems: 'center',
          userSelect: 'none',
          justifyContent: 'space-between',
          color: '#f7f7f7',
        }}
      >
        <div className="flex items-center">
          <Logo />
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{ color: 'white' }} />
              ) : (
                <MenuFoldOutlined style={{ color: 'white' }} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <ConfigProvider
            theme={{
              // algorithm: theme.darkAlgorithm,
              token: {
                motionDurationSlow: '0.1s',
              },
              components: {
                Menu: {
                  // darkItemColor: 'rgba(255,255,255,0.8)',
                  // darkItemSelectedBg: 'transparent',
                  // darkItemSelectedColor: token.colorLink,
                  motionUnit: 0,
                  fontSize: 16,
                  fontWeightStrong: 600,
                },
              },
            }}
          >
            <Menu
              className={'font-bold'}
              theme={systemTheme}
              mode="horizontal"
              defaultSelectedKeys={
                headerMenus.current.length > 0
                  ? [headerMenus.current[0].key as string]
                  : []
              }
              selectedKeys={[currentHeaderMenu]}
              items={headerMenus.current}
            />
          </ConfigProvider>
        </div>
        <div className="flex">
          <SuperSearch className="w-4 min-w-60 content-end"></SuperSearch>
        </div>
      </header> */}
      <div className="flex h-screen flex-row">
        {/* {!showSider && (
          <Sider
            width={200}
            collapsedWidth={0}
            style={
              {
                // background: '#001529',
              }
            }
            collapsed={collapsed}
          >
            <Menu
              theme={systemTheme}
              mode="inline"
              defaultSelectedKeys={
                sideMenus.length > 0 ? [sideMenus[0].key as string] : []
              }
              selectedKeys={[currentSideMenu]}
              style={{ height: '100%', borderRight: 0 }}
              items={sideMenus}
            />
          </Sider>
        )} */}
        {showSider && (
          <aside
            className="hidden h-screen min-w-[120] overflow-y-auto border-r-2 border-r-gray-100 bg-white md:block"
            style={{ borderRightStyle: 'solid' }}
          >
            <Logo theme={systemTheme} className="px-4 pr-10" />
            <div className="mt-6 flex flex-col space-y-2">
              {allSiderMenus.current.map((item) => (
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
        <div className={`flex h-screen flex-1 flex-col`}>
          <header className="flex flex-row justify-end space-y-6 px-10 pt-6">
            <SuperSearch className="w-60"></SuperSearch>
          </header>
          <main className="h-max flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
