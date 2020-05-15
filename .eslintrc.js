module.exports = {
  parser: "@typescript-eslint/parser",

  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],

  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    project: "./tsconfig.json",
  },

  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-use-before-define": "off",
  },

  settings: {
    "import/resolver": {
      node: {
        extensions: [
          ".js",
          ".ts",
        ],
      },
    },
  },
};
