import { createRoot } from 'react-dom/client';
import './style.css';
import '@repo/ui/styles.css';
import { RouterProvider } from 'react-router/dom';
import { router } from './routes/router';

createRoot(document.getElementById('app')!).render(
  <RouterProvider router={router} />,
);
