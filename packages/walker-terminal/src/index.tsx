#!/usr/bin/env bun

import { ConsolePosition, createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import App from "./components/App";
import { initializeProgram } from "./program";

const program = initializeProgram();
program.parse(process.argv);

export const renderer: Awaited<ReturnType<typeof createCliRenderer>> =
  await createCliRenderer({
    consoleOptions: {
      position: ConsolePosition.BOTTOM,
      sizePercent: 20,
    },
  });

if (program.opts().debug) {
  renderer.console.show();
}

createRoot(renderer).render(<App />);
