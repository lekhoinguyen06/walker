import { Item, useMouseOffset } from "@walker/react";
import * as motion from "motion/react-client";
import { useMemo, useRef } from "react";

export default function Mouse() {
  const { x: targetX, y: targetY } = useMouseOffset();
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
            className="aspect-square size-4 bg-foreground"
          />
        </div>
      </div>
    </Item>
  );
}
