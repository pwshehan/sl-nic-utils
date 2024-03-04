module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Use TypeScript parser
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json', // Path to your TypeScript config
  },
  env: {
    es6: true,
    node: true,
  },
  plugins: [
    '@typescript-eslint', // Add the TypeScript plugin
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // TypeScript recommended rules
    'plugin:prettier/recommended'
  ],
  rules: {
    // TypeScript-specific rules:
    '@typescript-eslint/no-unused-vars': 'warn',
    // ... other rules (both general JS and TypeScript)
  },
  overrides: [
    {
      files: ['src/**/*.{js,jsx,ts,tsx}'],
      excludedFiles: '**/node_modules/**',
    }
  ]
};
