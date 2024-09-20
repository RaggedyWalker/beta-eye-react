// /** @type {import('tailwindcss').Config} */
import theme from './src/themes/theme';

export default {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
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
