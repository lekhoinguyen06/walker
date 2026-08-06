import { useMouse } from "@repo/react";
import * as motion from "motion/react-client";

export default function Mouse() {
  const { x, y } = useMouse();
  return (
    <motion.div
      style={{ ...box, x, y }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1 }}
    />
  );
}

/**
 * ==============   Styles   ================
 */

const box = {
  width: 100,
  height: 100,
  backgroundColor: "var(--hue-1)",
  borderRadius: 5,
};
