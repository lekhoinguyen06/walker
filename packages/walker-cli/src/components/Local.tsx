import { useEffect, useRef, useState } from "react";
import { pushLog, useLogStore } from "../stores/log.store";
import { startServer } from "../server";
import { addToast } from "../stores/toast.store";

function Local() {
  const server = useRef<ReturnType<typeof Bun.serve>>(null);
  const [serverRunning, setServerRunning] = useState(false);
  const log = useLogStore((state) => state.logs);

  const handleStartServer = async () => {
    if (!serverRunning) {
      try {
        const app = await startServer();
        server.current = Bun.serve({ fetch: app.fetch, port: 6767 });
        setServerRunning(true);
        pushLog(`Walker Server is running on port ${server.current?.port}`);
      } catch (error) {
        addToast({
          type: "error",
          message: (error as Error).message,
          duration: 2000,
        });
        pushLog(`Error starting server: ${error}`);
        console.error("Error starting server:", error);
        return;
      }
    }
  };

  useEffect(() => {
    (async () => {
      await handleStartServer();
    })();
    return () => {
      server.current?.stop(true);
      setServerRunning(false);
    };
  }, []);
  return (
    <box
      style={{
        width: "100%",
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
      <scrollbox
        stickyScroll
        stickyStart="bottom"
        style={{ width: "100%", flexGrow: 1 }}
      >
        {log.length > 0 && <text>{log.join("\n")}</text>}
      </scrollbox>
    </box>
  );
}

export default Local;
