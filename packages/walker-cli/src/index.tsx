#!/usr/bin/env bun

import { ConsolePosition, createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import App from "./components/App";
import program from "./program";

program.parse(process.argv);

const renderer = await createCliRenderer({
  consoleOptions: {
    position: ConsolePosition.BOTTOM,
    sizePercent: 20,
  },
});

renderer.console.show();
createRoot(renderer).render(<App />);
