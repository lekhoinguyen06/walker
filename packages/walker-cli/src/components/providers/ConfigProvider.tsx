import { useEffect } from "react";
import { useConfigStore } from "../../stores/config.store";

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useConfigStore((state) => state.hydrate);

  useEffect(() => {
    (async () => {
      await hydrate();
    })();
  }, [hydrate]);

  return <box>{children}</box>;
}
