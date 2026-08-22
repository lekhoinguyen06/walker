import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/dev/index.ts", "src/core/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  minify: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom"],
});
