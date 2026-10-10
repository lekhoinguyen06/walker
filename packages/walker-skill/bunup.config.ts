import { defineConfig } from "bunup";

export default defineConfig({
  entry: "./index.ts",
  name: "node",
  format: ["esm", "cjs"],
  target: "node",
  minify: true,
  dts: true,
});
