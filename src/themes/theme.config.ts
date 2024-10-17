import theme from './theme';

// import theme from '@/assets/theme.json';

const themeConfig = {
  token: {
    fontFamily: 'PlusJakartaSans',
    colorPrimary: theme.colors.primary,
    colorInfo: theme.colors.info,
    wireframe: false,
    borderRadius: 4,
    colorTextBase: theme.colors['text-base'],
    // colorFillQuaternary: theme.colors['layout-base'],
    colorContainerBase: theme.colors['container-base'],
  },
  components: {
    Table: {
      // headerBg: 'rgb(246,245,247)',
      headerBg: '#f5f5f5',
    },
  },
  // 暗黑模式
  // algorithm: theme.darkAlgorithm,
};

export default themeConfig;
