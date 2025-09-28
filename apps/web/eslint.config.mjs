import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import { fixupConfigRules } from '@eslint/compat';
import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';
const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});
/* eslint-disable import/no-anonymous-default-export */
export default [
  {
    ignores: [
      '**/.next/**/*',
      '**/dist/**/*',
      '**/node_modules/**/*',
      '**/coverage/**/*',
      '**/apps/web/public/**/*',
      '**/apps/web/tailwind.config.{js,ts}',
      '**/apps/web/postcss.config.{js,ts}',
      '**/apps/web/vite.config.{js,ts}',
      '**/apps/web/.swcrc',

    ],
  },
  ...fixupConfigRules(compat.extends('next')),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  ...baseConfig,
  ...nx.configs['flat/react-typescript'],
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      // Override or add rules here
      "@nx/enforce-module-boundaries": "off"
    },
  },

];
