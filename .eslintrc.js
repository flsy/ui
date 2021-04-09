module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  ignorePatterns: ['build', 'lib', 'node_modules'],
  plugins: ['@typescript-eslint', 'jest'],
  extends: ['airbnb-typescript', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:jest/recommended', 'prettier'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'consistent-return': 0,
    'max-len': [2, 180],
    'no-useless-return': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 1,
    'react/prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    '@typescript-eslint/ban-types': [1, { types: { object: false } }],
    'react/jsx-boolean-value': [2, 'always'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'jest/no-jasmine-globals': 1,
    'import/extensions': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'prettier/prettier': [
      'error',
      {
        printWidth: 180,
        trailingComma: 'all',
        singleQuote: true,
        endOfLine: 'lf',
        semi: true,
        tabWidth: 2,
      },
    ],
  },
};
