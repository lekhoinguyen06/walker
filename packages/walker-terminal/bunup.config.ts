import { defineConfig } from "bunup";

export default defineConfig({
  entry: "./src/index.tsx",
  name: "node",
  format: ["esm"],
  target: "node",
  minify: true,
  dts: true,
});
