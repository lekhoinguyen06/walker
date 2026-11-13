import { defineConfig } from "bunup";
import { tailwindcss } from "@bunup/plugin-tailwindcss";

const config: any = defineConfig({
  entry: ["src/index.ts", "src/core/index.ts", "src/walker/ui/index.ts"],
  plugins: [tailwindcss()],
  format: ["esm", "cjs"],
  dts: {
    inferTypes: true,
  },
  clean: true,
  sourcemap: true,
  // external: [
  //   "react",
  //   "react-dom",
  //   "walker-dom",
  //   "walker-react",
  //   "walker-shared",
  // ],
  env: { NODE_ENV: "production" },
});

export default config;
