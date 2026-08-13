import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppLayout from "./AppLayout";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Components } from "./components/Components";
import { InputPage } from "./features/input/page";
import {
  RuntimeProvider,
  App,
  type MiddlewarePropsType,
  type MiddlewareResponseType,
  type MiddlewareType,
} from "@repo/react";
import { ButtonPage } from "./features/button/page";
import { SelectPage } from "./features/select/page";
import { DialogPage } from "./features/dialog/page";
import { ScrollAreaPage } from "./features/scroll-area/page";
import { ToastPage } from "./features/toast/page";
import { toast } from "./components/ui/toast";

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

async function message(props: MiddlewarePropsType): MiddlewareResponseType {
  toast.add({
    title: props.action.message,
  });
}

export const messageMiddleware: MiddlewareType = {
  name: "message",
  description: "Displays a message to the user",
  handler: message,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RuntimeProvider
      config={{}}
      middlewares={new Map([["message", messageMiddleware]])}
    >
      <App
        id="playground-react"
        description="The Walker library's playground for React"
      >
        <RouterProvider router={router} />
      </App>
    </RuntimeProvider>
  </StrictMode>,
);
