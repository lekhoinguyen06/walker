import { defineConfig } from "bunup";
import { tailwindcss } from "@bunup/plugin-tailwindcss";

const config: any = defineConfig({
  entry: [
    "src/index.ts",
    "src/core/index.ts",
    "src/components/walker/ui/index.ts",
  ],
  plugins: [tailwindcss()],
  format: ["esm", "cjs"],
  dts: {
    inferTypes: true,
  },
  minify: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
});

export default config;
