import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => ({
  test: {
    environment: "jsdom",
    env: loadEnv(mode, process.cwd(), ""),
  },
}));
