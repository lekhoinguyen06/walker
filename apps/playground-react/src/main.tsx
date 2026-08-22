import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "walker-react/dev/index.css";
import "./index.css";
import AppLayout from "./AppLayout";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Components } from "./components/Components";
import { InputPage } from "./features/input/page";
import { RuntimeProvider } from "walker-react";
import { ButtonPage } from "./features/button/page";
import { SelectPage } from "./features/select/page";
import { DialogPage } from "./features/dialog/page";
import { ScrollAreaPage } from "./features/scroll-area/page";
import { ToastPage } from "./features/toast/page";
import { toast } from "./components/ui/toast";
import type { HookPropsType } from "walker-react/core";
import type { HookResponseType } from "walker-react/core";

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
        path: "button",
        element: <ButtonPage />,
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

async function message(props: HookPropsType): HookResponseType {
  toast.add({
    title: props.action.message,
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RuntimeProvider
      config={{
        app: {
          id: "playground-react",
          description: "The Walker library's playground for React",
        },
        hooks: {
          onMessage: message,
        },
        config: {
          verbose: true,
        },
      }}
    >
      <RouterProvider router={router} />
    </RuntimeProvider>
  </StrictMode>,
);
