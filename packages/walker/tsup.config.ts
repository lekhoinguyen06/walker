import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['core/index.ts', 'react-lib/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
});
