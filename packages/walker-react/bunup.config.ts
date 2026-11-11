import { defineConfig } from "bunup";

const config: any = defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: {
    inferTypes: true,
  },
  clean: true,
  sourcemap: true,
  // external: ["react", "react-dom", "walker-dom", "walker-shared"],
  env: { NODE_ENV: "production" },
});

export default config;
