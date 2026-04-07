import { createRoot } from 'react-dom/client';
import './style.css';
import '@repo/ui/styles.css';
import { RouterProvider } from 'react-router/dom';
import { router } from './routes/router';
import { FlowProvider } from '@repo/walker/react';

createRoot(document.getElementById('app')!).render(
  <FlowProvider>
    <RouterProvider router={router} />,
  </FlowProvider>
);
