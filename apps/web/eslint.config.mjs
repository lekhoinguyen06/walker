import config from "@repo/eslint-config/index";

/** @type {import("eslint").Linter.Config} */
export default [
  config,
  {
    ignores: [".prettierrc.mjs", "eslint.config.mjs"],
  },
];
