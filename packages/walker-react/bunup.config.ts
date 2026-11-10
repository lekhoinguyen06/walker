import { defineConfig } from "bunup";

const config: any = defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: {
    inferTypes: true,
  },
  sourcemap: true,
  external: ["react", "react-dom", "walker-dom"],
  clean: true,
});

export default config;
