#!/usr/bin/env bun

import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import App from "./App";
import program from "./program";

program.parse(process.argv);

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
