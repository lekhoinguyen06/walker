import { defineConfig } from "bunup";

export default defineConfig({
  entry: "./src/generated/index.ts",
  name: "node",
  format: ["esm", "cjs"],
  target: "node",
  minify: true,
  dts: true,
});
