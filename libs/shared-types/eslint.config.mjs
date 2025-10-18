import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}'],
        },
      ],
      "@nx/enforce-module-boundaries": off
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
];
