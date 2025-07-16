const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...compat.extends(
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "@angular-eslint/recommended",
    "@angular-eslint/template/process-inline-templates"
  ),
  {
    files: ["**/*.ts"],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase"
        }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case"
        }
      ],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
      "no-var": "error"
    }
  },
  {
    files: ["**/*.html"],
    extends: [...compat.extends("@angular-eslint/template/recommended")],
    rules: {
      "@angular-eslint/template/no-negated-async": "error"
    }
  }
];