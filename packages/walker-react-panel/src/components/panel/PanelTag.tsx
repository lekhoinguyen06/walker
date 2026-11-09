import { Button } from "@/components/ui/button";
import { usePanel } from "@/hooks";
import { ChevronsDown } from "lucide-react";
import * as motion from "motion/react-client";

export function PanelTag() {
  const { isHidden, setIsHidden } = usePanel();
  return (
    <div className="absolute top-0 left-1/2 -translate-y-full -translate-x-1/2">
      <Button
        variant="default"
        size="icon"
        className="rounded-none border-none shadow-2xl"
        onClick={() => {
          setIsHidden(!isHidden);
        }}
      >
        <motion.div
          animate={{ rotate: isHidden ? 180 : 0 }}
          transition={{ duration: 0.1 }}
        >
          <ChevronsDown />
        </motion.div>
      </Button>
    </div>
  );
}
