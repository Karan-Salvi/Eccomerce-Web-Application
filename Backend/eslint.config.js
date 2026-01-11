import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      import: importPlugin,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',

      // Backend friendly rules
      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Import order
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
    },
  },
];
