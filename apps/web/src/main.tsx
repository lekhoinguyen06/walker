import { createRoot } from 'react-dom/client';
import './style.css';
import { RouterProvider } from 'react-router/dom';
import { router } from './routes/router';
import { FlowProvider } from '@repo/react';
import { initFlow } from '@repo/core';

createRoot(document.getElementById('app')!).render(
  <FlowProvider initializer={initFlow}>
    <RouterProvider router={router} />
  </FlowProvider>
);
