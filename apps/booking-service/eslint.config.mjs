import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    ignores: [
      '**/generated/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/*.generated.*',
      '**/prisma/migrations/**',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
  },
];
