import { viteConfig } from '@repo/eslint-config/vite';
import tsParser from '@typescript-eslint/parser';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...viteConfig,
  {
    ignores: ['.prettierrc.mjs', 'eslint.config.mjs'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },
  },
];
