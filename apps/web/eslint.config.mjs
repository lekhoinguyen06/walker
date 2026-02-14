import { viteConfig } from '@repo/eslint-config/vite';

/** @type {import("eslint").Linter.Config} */
export default [
  ...viteConfig,
  {
    ignores: ['.prettierrc.mjs', 'eslint.config.mjs'],
  },
];