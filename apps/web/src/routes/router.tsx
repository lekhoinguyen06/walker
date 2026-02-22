import { createBrowserRouter } from 'react-router';
import { LandingPage } from '@/features/landing/page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
]);
