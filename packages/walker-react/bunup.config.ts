import { defineConfig } from "bunup";
import { tailwindcss } from "@bunup/plugin-tailwindcss";

export default defineConfig({
  entry: ["src/index.ts", "src/core/index.ts", "src/ui/index.ts"],
  plugins: [tailwindcss()],
  format: ["esm", "cjs"],
  dts: true,
  minify: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
});
