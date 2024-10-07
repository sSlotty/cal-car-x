module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:react/recommended', // Uses recommended rules for React
    'plugin:@typescript-eslint/recommended', // Uses recommended rules for TypeScript
    'next/core-web-vitals', // Includes Next.js specific rules
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows the parsing of modern ES features
    sourceType: 'module', // Allows the use of imports
    ecmaFeatures: {
      jsx: true, // Allows the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules
  },
};
