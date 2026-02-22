import { createBrowserRouter } from 'react-router';
import { LandingPage } from '@/features/landing/page';
import { DemoPage } from '@/features/demo/page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/demo',
    element: <DemoPage />,
  },
]);
