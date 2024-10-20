// /** @type {import('tailwindcss').Config} */
import theme from './src/themes/theme';

export default {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: theme.colors.primary,
        'layout-base': theme.colors['layout-base'],
        'container-base': theme.colors['container-base'],
      },
      boxShadow: {
        container: theme.shadow.container,
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
