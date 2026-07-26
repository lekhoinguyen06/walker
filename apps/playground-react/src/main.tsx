import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppLayout from "./AppLayout";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Components } from "./components/Components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Components />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
);
