import { createCliRenderer } from "@opentui/core";
import { createRoot, useKeyboard } from "@opentui/react";
import { useCallback, useState } from "react";

function App() {
  return (
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
      <box title="Class" style={{ width: "100%", height: "100%" }}>
        <select
          focused
          style={{
            width: "100%",
            flexDirection: "column",
            flexGrow: 1,
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
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
