import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    files: ["tests/**/*.test.js", "tests/**/*.spec.js"], // Ajusta a tu estructura de carpetas
    languageOptions: {
      globals: globals.jest,
    },
  },
  pluginJs.configs.recommended,
];
