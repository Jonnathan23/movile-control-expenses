import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import unicorn from 'eslint-plugin-unicorn'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  eslintPluginPrettierRecommended,
  globalIgnores(['node_modules', 'dist', 'build', '.agents', '**/*.config.js', '**/*.config.mjs', '**/*.config.ts', '**/*.json']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      unicorn,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Evitar el uso de abreviaciones comunes
      'unicorn/prevent-abbreviations': [
        'error',
        {
          checkFilenames: false,
          checkDefaultAndExportedParams: false,
        },
      ],
      // Reglas estrictas de nomenclatura
      '@typescript-eslint/naming-convention': [
        'error',
        // 1. Clases, Interfaces y Types en PascalCase
        {
          selector: ['class', 'interface', 'typeAlias', 'typeParameter'],
          format: ['PascalCase'],
        },
        // 2. Ignorar variables que provengan de un import para evitar errores con dependencias externas
        {
          selector: 'variable',
          modifiers: ['imported'],
          format: null,
        },
        // 3. El resto de variables locales deben ir en camelCase
        {
          selector: 'variable',
          format: ['camelCase'],
        },
        // 4. Las funciones deben ir en camelCase
        {
          selector: 'function',
          format: ['camelCase'],
        },
      ],
    },
  },
])
