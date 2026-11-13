import { defineConfig } from "bunup";

const config: any = defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: {
    inferTypes: true,
  },
  sourcemap: true,
  clean: true,
  // external: ["walker-shared"],
});

export default config;
