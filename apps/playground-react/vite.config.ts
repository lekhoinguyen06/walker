import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";
import { envFactory } from "./env.ts";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    define: envFactory(mode),
    plugins: [
      react(),
      tailwindcss(),
      svgr(),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
