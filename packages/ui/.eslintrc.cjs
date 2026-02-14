/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: [".eslintrc.cjs"],
  extends: ["@repo/eslint-config/index"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
