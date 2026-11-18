import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

import quality from './eslint-rules/index.cjs';

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const testFiles = [
  '**/*{.,-}{test,spec}.{js,jsx,ts,tsx,mjs,cjs,mts,cts}',
  '**/{__tests__,__mocks__,fixtures,mocks}/**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}',
];

export default defineConfig([
  {
    languageOptions: {
      parserOptions: { tsconfigRootDir: import.meta.dirname },
      globals: {
        console: 'readonly',
        process: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['src/**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}'],
    plugins: { quality },
    rules: {
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-var': 'error',
      'prefer-const': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      complexity: ['warn', 12],
      'max-depth': ['warn', 4],
      'max-statements': ['warn', 20],
      'max-params': ['warn', 4],
      'max-lines-per-function': [
        'warn',
        { max: 150, skipBlankLines: true, skipComments: true },
      ],
      'max-nested-callbacks': ['warn', 3],
      'quality/max-lines': ['error', { max: 350 }],
      'quality/no-direct-console': [
        'error',
        { logger: 'src/lib/logger.ts' },
      ],
    },
  },
  {
    files: ['src/lib/logger.ts'],
    rules: {
      'quality/no-direct-console': 'off',
    },
  },
  {
    files: testFiles,
    plugins: { quality },
    rules: {
      'quality/max-lines': ['warn', { max: 350, includeTests: true }],
      'max-statements': 'off',
      'max-lines-per-function': 'off',
      'max-nested-callbacks': 'off',
    },
  },
  {
    files: ['eslint-rules/**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { module: 'readonly', require: 'readonly' },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  globalIgnores([
    '.next/**',
    '_archive/**',
    'node_modules/**',
    'next-env.d.ts',
    '**/*.tsbuildinfo',
    'package-lock.json',
  ]),
]);
