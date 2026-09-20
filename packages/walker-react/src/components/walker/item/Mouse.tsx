import { useMemo, useRef } from "react";
import { Item } from "./Items";
import * as motion from "motion/react-client";
import { useMouse } from "@/hooks/useMouse";

export type MouseProps = {
  children?: React.ReactNode;
};

export function Mouse({ children }: MouseProps) {
  const { x: targetX, y: targetY } = useMouse();
  const containerRef = useRef<HTMLDivElement>(null);

  const offset = useMemo(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return { x: 0, y: 0 };
  }, [targetX, targetY]);

  return (
    <Item id="mouse-container" description="The container of Walker Mouse.">
      <div
        ref={containerRef}
        className="size-8 flex justify-center items-center z-999999"
      >
        <div>
          <motion.div
            animate={{
              x: targetX - offset.x,
              y: targetY - offset.y,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              type: "spring",
              stiffness: 200,
              damping: 30,
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </Item>
  );
}
