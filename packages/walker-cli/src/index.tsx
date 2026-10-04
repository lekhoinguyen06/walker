import { createCliRenderer } from "@opentui/core";
import { createRoot, useKeyboard } from "@opentui/react";
import { useCallback, useRef, useState } from "react";
import app from "./app";
import { useLogStore } from "./store";

function App() {
  const server = useRef<ReturnType<typeof Bun.serve>>(null);
  const [serverRunning, setServerRunning] = useState(false);
  const [bottomMsg, setbottomMsg] = useState<string>("Press q to quit");
  const log = useLogStore((state) => state.logs);
  const shuttingDown = useRef(false);

  const shutdown = useCallback(() => {
    if (shuttingDown.current) return;
    shuttingDown.current = true;

    setbottomMsg("Shutting down...");
    setTimeout(() => {
      server.current?.stop(true);
      renderer.destroy();
    }, 1000);
  }, []);

  useKeyboard((key) => {
    if (key.name === "q") {
      shutdown();
    }
  });

  const handleSelect = useCallback(
    (_index: number, option: { value?: string } | null) => {
      if (option?.value === "local" && !server.current) {
        server.current = Bun.serve({ fetch: app.fetch, port: 6767 });
        setServerRunning(true);
      } else if (option?.value === "exit") {
        shutdown();
      }
    },
    [],
  );

  return (
    <scrollbox
      stickyScroll
      stickyStart="bottom"
      style={{ width: "100%", height: "100%" }}
    >
      <box style={{ flexDirection: "column", gap: 2 }}>
        <box
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            padding: 2,
          }}
        >
          <box
            style={{
              width: 16,
              height: 8,
              backgroundColor: "FFF",
            }}
          ></box>
          <ascii-font font="block" text="Walker"></ascii-font>
        </box>
        <box title="Class" style={{ width: "100%" }}>
          <select
            focused
            onSelect={handleSelect}
            style={{
              width: "100%",
              height: 6,
              flexDirection: "column",
              selectedTextColor: "000000",
              selectedDescriptionColor: "000000",
              focusedBackgroundColor: "000000",
              selectedBackgroundColor: "FFFFFF",
            }}
            options={[
              {
                name: "Login",
                description: "Authenticate with remote Walker Server",
                value: "login",
              },
              {
                name: "Local",
                description: "Start local Walker Server",
                value: "local",
              },
              {
                name: "Exit",
                description: "Exit the application",
                value: "exit",
              },
            ]}
          />
        </box>
        {serverRunning && (
          <text>Walker Server is running on port {server.current?.port}</text>
        )}
        {log.length > 0 && <text>{log.join("\n")}</text>}
        <text>{bottomMsg}</text>
      </box>
    </scrollbox>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
