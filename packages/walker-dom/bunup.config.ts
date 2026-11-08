import { defineConfig } from "bunup";

const config: any = defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: {
    inferTypes: true,
  },
  minify: true,
  sourcemap: true,
  clean: true,
});

export default config;
