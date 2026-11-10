import "./index.css";
import "walker-react-panel/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppLayout from "./AppLayout";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Components } from "./components/Components";
import { InputPage } from "./features/input/page";
import { SelectPage } from "./features/select/page";
import { DialogPage } from "./features/dialog/page";
import { ScrollAreaPage } from "./features/scroll-area/page";
import { ToastPage } from "./features/toast/page";
import { PanelToastProvider } from "walker-react-panel";
import { Item } from "walker-react";
import { ade } from "./walker/ade";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Components />,
      },
      {
        path: "input",
        element: <InputPage />,
      },
      {
        path: "select",
        element: <SelectPage />,
      },
      {
        path: "dialog",
        element: <DialogPage />,
      },
      {
        path: "scroll-area",
        element: <ScrollAreaPage />,
      },
      {
        path: "toast",
        element: <ToastPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <PanelToastProvider>{children}</PanelToastProvider>
    </StrictMode>
  );
}

function App() {
  return (
    <Item {...ade.p()}>
      <RouterProvider router={router} />
    </Item>
  );
}

createRoot(document.getElementById("root")!).render(
  <Provider>
    <App />
  </Provider>,
);
