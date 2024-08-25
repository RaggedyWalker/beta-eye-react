import { createBrowserRouter } from 'react-router-dom';
import routesConfig from '@/routes/routesConfig.tsx';

const router = createBrowserRouter(routesConfig, { basename: '/eye' });

export default router;
