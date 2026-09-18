import { Item } from "@/item";
import { useMouseOffset } from "./useMouseStore";
import { motion } from "motion/react";
import { useMemo, useRef } from "react";
import type { HookPropsType, HookResponseType } from "walker-core";
import { usePanelToast } from "@/ui";

export type MouseProps = {
  children?: React.ReactNode;
};

export async function mouseHook(props: HookPropsType): HookResponseType {
  const { setX, setY } = useMouseOffset();
  const { pushToast } = usePanelToast();

  const walker = document.getElementById(props.action.targetId);
  const targetEl = walker?.firstElementChild;

  if (targetEl) {
    const rect = targetEl.getBoundingClientRect();

    const centerX = rect.x + rect.width / 2 + window.scrollX;
    const centerY = rect.y + rect.height / 2 + window.scrollY;

    setX(centerX);
    setY(centerY);
  } else {
    pushToast({
      type: "error",
      message: "Item not found",
    });
  }

  return;
}

export function Mouse({ children }: MouseProps) {
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
          >
            {children}
          </motion.div>
        </div>
      </div>
    </Item>
  );
}
