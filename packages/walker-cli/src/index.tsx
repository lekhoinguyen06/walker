#!/usr/bin/env bun

import { createCliRenderer } from "@opentui/core";
import { createRoot, useKeyboard } from "@opentui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import app from "./app";
import { pushLog, useLogStore } from "./store";
import { secrets } from "bun";

// function App() {
//   const server = useRef<ReturnType<typeof Bun.serve>>(null);
//   const [serverRunning, setServerRunning] = useState(false);
//   const [bottomMsg, setbottomMsg] = useState<string>("Press q to quit");
//   const log = useLogStore((state) => state.logs);
//   const shuttingDown = useRef(false);
//
//   const shutdown = useCallback(() => {
//     if (shuttingDown.current) return;
//     shuttingDown.current = true;
//
//     setbottomMsg("Shutting down...");
//     setTimeout(() => {
//       server.current?.stop(true);
//       renderer.destroy();
//     }, 1000);
//   }, []);
//
//   useKeyboard((key) => {
//     if (key.name === "q") {
//       shutdown();
//     }
//   });
//
//   const handleSelect = useCallback(
//     (_index: number, option: { value?: string } | null) => {
//       if (option?.value === "local" && !server.current) {
//         server.current = Bun.serve({ fetch: app.fetch, port: 6767 });
//         setServerRunning(true);
//       } else if (option?.value === "exit") {
//         shutdown();
//       }
//     },
//     [],
//   );
//
//   return (
//     <scrollbox
//       stickyScroll
//       stickyStart="bottom"
//       style={{ width: "100%", height: "100%" }}
//     >
//       <box style={{ flexDirection: "column", gap: 2 }}>
//         <box
//           style={{
//             width: "100%",
//             flexDirection: "row",
//             alignItems: "center",
//             gap: 2,
//             padding: 2,
//           }}
//         >
//           <box
//             style={{
//               width: 16,
//               height: 8,
//               backgroundColor: "FFF",
//             }}
//           ></box>
//           <ascii-font font="block" text="Walker"></ascii-font>
//         </box>
//         <box title="Class" style={{ width: "100%" }}>
//           <select
//             focused
//             onSelect={handleSelect}
//             style={{
//               width: "100%",
//               height: 6,
//               flexDirection: "column",
//               selectedTextColor: "000000",
//               selectedDescriptionColor: "000000",
//               focusedBackgroundColor: "000000",
//               selectedBackgroundColor: "FFFFFF",
//             }}
//             options={[
//               {
//                 name: "Login",
//                 description: "Authenticate with remote Walker Server",
//                 value: "login",
//               },
//               {
//                 name: "Local",
//                 description: "Start local Walker Server",
//                 value: "local",
//               },
//               {
//                 name: "Exit",
//                 description: "Exit the application",
//                 value: "exit",
//               },
//             ]}
//           />
//         </box>
//         {serverRunning && (
//           <text>Walker Server is running on port {server.current?.port}</text>
//         )}
//         {log.length > 0 && <text>{log.join("\n")}</text>}
//         <text>{bottomMsg}</text>
//       </box>
//     </scrollbox>
//   );
// }

function Home() {
  return (
    <box
      style={{
        width: "100%",
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        padding: 2,
      }}
    >
      <box
        style={{
          width: 8,
          height: 4,
          backgroundColor: "FFF",
        }}
      ></box>
      <ascii-font font="tiny" text="Walker"></ascii-font>
    </box>
  );
}

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

function Config() {
  const [focus, setFocus] = useState<"openrouter">("openrouter");
  const [ORvalue, setORvalue] = useState<string>("");
  const [ORstoredKey, setORstoredKey] = useState<string | null>(null);

  const saveORkey = useCallback(async (val: string) => {
    await secrets.set({
      service: "walker-cli",
      name: "openrouter-api-key",
      value: val,
    });
  }, []);

  useEffect(() => {
    const fetchStoredValue = async () => {
      const key = await secrets.get({
        service: "walker-cli",
        name: "openrouter-api-key",
      });
      setORstoredKey(key || null);
    };
    fetchStoredValue();
  }, [saveORkey]);

  return (
    <box
      style={{
        width: "100%",
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
      <box
        style={{
          width: "100%",
          flexDirection: "column",
          gap: 1,
          padding: 1,
        }}
      >
        <text>OpenRouter</text>
        <text>Value: {ORstoredKey ? "***" : ""}</text>
        <input
          focused={focus === "openrouter"}
          placeholder="Enter OpenRouter API key"
          value={ORvalue}
          onInput={(v) => setORvalue(v)}
          style={
            {
              // focusedBackgroundColor: "FFFFFF",
              // focusedTextColor: "000000",
            }
          }
          onSubmit={() => {
            setORvalue("");
            saveORkey(ORvalue);
          }}
        />
      </box>
    </box>
  );
}

function App() {
  const [tab, setTab] = useState<string | null>(null);
  return (
    <box
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {tab === null && <Home />}
      {tab === "local" && <Local />}
      {tab === "config" && <Config />}
      <box
        style={{
          width: "100%",
          flexShrink: 0,
        }}
      >
        <tab-select
          focused
          onSelect={(_index: number, option: { value?: string } | null) => {
            setTab(option?.value || null);
          }}
          showDescription={false}
          style={{
            width: "100%",
            flexDirection: "column",
            selectedTextColor: "000000",
            selectedDescriptionColor: "FFFFFF",
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
              name: "Config",
              description: "Configure Walker CLI settings",
              value: "config",
            },
          ]}
        ></tab-select>
      </box>
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
