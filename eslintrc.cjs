/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: { node: true, es2021: true },
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["@typescript-eslint", "import", "prettier"],
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "no-console": "off",
    "import/extensions": "off",
    "prettier/prettier": "error",
  },
};
