import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['core/index.ts', 'react-lib/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
});
