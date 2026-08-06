import type {
  MiddlewarePropsType,
  MiddlewareResponseType,
  MiddlewareType,
} from "@repo/core";
import { createContext, useContext, useState } from "react";

const MouseContext = createContext<{
  x: number;
  y: number;
  setX: (x: number) => void;
  setY: (y: number) => void;
}>({
  x: 0,
  y: 0,
  setX: (x: number) => {},
  setY: (y: number) => {},
});

export function useMouse() {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error("useMouse must be used within a MouseProvider");
  }
  return context;
}

export function MouseProvider({ children }: { children: React.ReactNode }) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  return (
    <MouseContext.Provider value={{ x, y, setX, setY }}>
      {children}
    </MouseContext.Provider>
  );
}

export async function mouseMiddlewareHandler(
  props: MiddlewarePropsType,
): MiddlewareResponseType {
  const { setX, setY } = useMouse();

  const targetEl = document.querySelector(props.action.target);

  if (targetEl) {
    const targetX =
      targetEl.getBoundingClientRect().left +
      targetEl.getBoundingClientRect().width / 2;
    const targetY =
      targetEl.getBoundingClientRect().top +
      targetEl.getBoundingClientRect().height / 2;

    setX(targetX);
    setY(targetY);
  }

  return;
}

export const mouseMiddleware: MiddlewareType = {
  name: "mouse",
  description: "Middleware to handle mouse movement in React",
  handler: mouseMiddlewareHandler,
};
