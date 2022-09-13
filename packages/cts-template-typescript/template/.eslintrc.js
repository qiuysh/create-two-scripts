module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'wolin',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],                              //使用推荐的React代码检测规范
  plugins: ['@typescript-eslint', 'react-hooks', 'jest'],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  settings: {             //自动发现React的版本，从而进行规范react代码
    react: {
      pragma: "React",
      version: "detect"
    },
    "import/extensions": [".js", ".ts", ".tsx"],
    "import/resolver": {
      webpack: {
        config: "./scripts/base.js",
      },
    },
  },
  parserOptions: {        //指定ESLint可以解析JSX语法
    "ecmaVersion": 2019,
    "sourceType": 'module',
    "ecmaFeatures": {
      jsx: true
    }
  },
  rules: {
    "prefer-const": "warn",
    "@typescript-eslint/camelcase": ['off', { properties: 'always' }],
    "@typescript-eslint/explicit-function-return-type": [
      'off',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }
    ],
    "no-var": "warn",
    "one-var": "warn",
    "no-sequences": "warn",
    "no-cond-assign": "warn",
    "no-unused-expressions": ["warn", { "allowTernary": true }],
    "no-import-assign": "warn",
    "no-nested-ternary": "warn",
    "no-bitwise": "warn",
    "no-void": "warn",
    "no-restricted-globals": "warn",
    "yoda": "off",
    "prefer-destructuring": "warn",
    "import/newline-after-import": "warn",
    "import/prefer-default-export": "warn",
    "import/order": "warn",
    "import/no-unresolved": "warn",
    "import/no-extraneous-dependencies": "off",
    "react/sort-comp": "warn",
    "class-methods-use-this": "warn",
    "react/jsx-wrap-multilines": [
      "error",
      { declaration: false, assignment: false },
    ],
    "react/jsx-fragments": "warn",
    "react/prefer-stateless-function": "warn",
    "react/jsx-closing-bracket-location": "warn",
    "react/no-unused-state": "warn",
    "react/state-in-constructor": "warn",
    "react/prop-types": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "jsx-a11y/no-static-element-interactions": "warn"
  }
};