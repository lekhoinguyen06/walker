import { useEffect, useRef, useState } from "react";
import { pushLog, useLogStore } from "./store";
import app from "./server";

function Local() {
  const server = useRef<ReturnType<typeof Bun.serve>>(null);
  const [serverRunning, setServerRunning] = useState(false);
  const log = useLogStore((state) => state.logs);

  useEffect(() => {
    server.current = Bun.serve({ fetch: app.fetch, port: 6767 });
    setServerRunning(true);
    pushLog(`Walker Server is running on port ${server.current?.port}`);
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
