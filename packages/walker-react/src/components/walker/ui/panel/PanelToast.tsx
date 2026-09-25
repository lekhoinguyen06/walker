import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence } from "motion/react";
import { useEffect, type ReactNode } from "react";
import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";
import { usePanel, usePanelToast } from "@/hooks";

const panelToastVariants = cva(
  "w-full flex flex-col pb-6 -mb-6 rounded-t-[24px]",
  {
    variants: {
      type: {
        walking: "bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50",
        info: "bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-50",
        success:
          "bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-50",
        warn: "bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-50",
        error: "bg-red-50 text-destructive dark:bg-red-950",
        plain: "bg-white dark:bg-black",
      },
    },
    defaultVariants: {
      type: "plain",
    },
  },
);

export type PanelToastItemType = {
  type: VariantProps<typeof panelToastVariants>["type"];
  message: string;
  duration?: number;
  render?: ReactNode;
};

export function PanelToast() {
  const { isHidden, setIsHidden } = usePanel();
  const { toast } = usePanelToast();
  useEffect(() => {
    if (isHidden) {
      setIsHidden(false);
    }
  }, [toast]);
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ y: "100%", height: 0, opacity: 0 }}
          animate={{
            y: 0,
            height: "auto",
            opacity: 1,
          }}
          exit={{ y: "100%", height: 0, opacity: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
          className={cn(panelToastVariants({ type: toast.type }))}
        >
          <div className="w-full flex items-center mb-1.5 min-h-8">
            {toast.render ? (
              toast.render
            ) : (
              <span
                className={cn(
                  "text-sm px-6",
                  toast.type === "walking" ? "shimmer" : "",
                )}
              >
                {toast.message}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
