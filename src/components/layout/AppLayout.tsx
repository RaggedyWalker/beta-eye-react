import React, { useEffect, useMemo, useState } from 'react';
import {
  Link,
  matchRoutes,
  Outlet,
  useLocation,
  useMatches,
} from 'react-router-dom';
import { Button, ConfigProvider, Layout, Menu, theme } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import routesConfig from '@/routes/routesConfig.tsx';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Logo from '@/components/layout/Logo.tsx';

const { Header, Content, Sider } = Layout;

function getHeaderMenus(): NonNullable<ItemType>[] {
  const headerMenus: NonNullable<ItemType>[] = [];
  routesConfig.forEach((route) => {
    if (route?.meta?.menuLevel === 1) {
      headerMenus.push({
        key: route.path as string,
        label: <Link to={route.path as string}>{route.meta?.title}</Link>,
      });
    }
  });
  return headerMenus;
}

const AppLayout: React.FC<{ theme?: 'dark' | 'light' }> = (props) => {
  const [currentHeaderMenu, setCurrentHeaderMenu] = useState('');
  const [currentSideMenu, setCurrentSideMenu] = useState('');
  const { pathname } = useLocation();
  const systemTheme = props.theme || 'dark';
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const headerMenus = useMemo<NonNullable<ItemType>[]>(() => {
    return getHeaderMenus();
  }, []);
  const sideMenus = useMemo<NonNullable<ItemType>[]>(() => {
    let sideMenus: NonNullable<ItemType>[] = [];
    const routes = matchRoutes(routesConfig, pathname);
    if (routes !== null && routes.length > 0 && routes[0].route.children) {
      const children = routes[0].route.children.filter(
        (item) => item?.meta?.menuLevel === 2,
      );
      sideMenus = children.map((item) => {
        const to = [currentHeaderMenu, item.path].join('/');
        return {
          key: to,
          label: (<Link to={to}>{item.meta?.title}</Link>) as JSX.Element,
        };
      });
    }
    return sideMenus;
  }, [currentHeaderMenu]);

  const matches = useMatches();
  console.log('matches', matches);

  // console.log('matchPath', matchPath(routesConfig, location.pathname));

  useEffect(() => {
    // setSideMenus(getSideMenus(location));
    const routes = matchRoutes(routesConfig, pathname);
    console.log('matchRoutes', routes);
    const pathArr: string[] = [];
    if (routes !== null) {
      routes.forEach((route, index) => {
        if (index === 0) {
          setCurrentHeaderMenu(route.pathnameBase);
        }
        if (index === 1) {
          setCurrentSideMenu(route.pathnameBase);
        }
      });
    }
    console.log('sideMenus', sideMenus);
    console.log('pathArr', pathArr);
  }, [pathname]);

  const showSider = useMemo(
    () => sideMenus.length > 0 && !collapsed,
    [sideMenus, collapsed],
  );

  return (
    <Layout className="h-screen">
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        <div className="demo-logo" />
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
            algorithm: theme.darkAlgorithm,
            components: {
              Menu: {
                darkItemSelectedBg: 'transparent',
                darkItemSelectedColor: colorPrimary,
                // itemSelectedBg: 'transparent',
                // itemSelectedColor: colorPrimary,
              },
            },
          }}
        >
          <Menu
            theme={systemTheme}
            mode="horizontal"
            defaultSelectedKeys={
              headerMenus.length > 0 ? [headerMenus[0].key as string] : []
            }
            selectedKeys={[currentHeaderMenu]}
            items={headerMenus}
          />
        </ConfigProvider>
      </Header>
      <Content>
        <Layout className="h-full">
          {showSider && (
            <Sider
              width={200}
              collapsedWidth={0}
              style={{
                background: '#fcf9fd',
              }}
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
          )}
          <Layout
            className={['h-full', 'overflow-y-auto', showSider ? '' : ''].join(
              ' ',
            )}
          >
            <Content
              className="px-12 py-8"
              style={{
                // padding: 24,
                marginLeft: 0,
                minHeight: 280,
                background: colorBgContainer,
                overflow: 'auto',
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Content>
    </Layout>
  );
};

export default AppLayout;
