import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores([
    '.next/**',
    '**/dist/**',
    'coverage/**',
    '**/*.jsx',
    '**/*.d.ts',
  ]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': [
        'error',
        {
          allowExportNames: ['generateMetadata', 'generateStaticParams'],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]);
