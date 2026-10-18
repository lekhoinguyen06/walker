#!/usr/bin/env bun

import { ConsolePosition, createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import App from "./components/App";
import program from "./program";

export const renderer = await createCliRenderer({
  consoleOptions: {
    position: ConsolePosition.BOTTOM,
    sizePercent: 20,
  },
});

program.parse(process.argv);

createRoot(renderer).render(<App />);
