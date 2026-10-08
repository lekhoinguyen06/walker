import { defineConfig } from "bunup";

export default defineConfig({
  entry: ["src/client/index.ts", "src/client/client/index.ts"],
  name: "node",
  format: ["esm", "cjs"],
  target: "node",
  minify: true,
  dts: true,
});
