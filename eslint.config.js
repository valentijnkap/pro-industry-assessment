import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { FlatCompat } from '@eslint/eslintrc';
import vuePlugin from 'eslint-plugin-vue';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import nuxtPlugin from 'eslint-plugin-nuxt';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default [
  {
    ignores: ['node_modules', '.nuxt', 'dist'],
  },
  {
    files: ['**/*.ts', '**/*.js', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': typescriptPlugin,
      nuxt: nuxtPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Add your custom rules here
    },
  },
  ...compat.config({
    extends: [
      '@nuxtjs/eslint-config-typescript',
      'plugin:nuxt/recommended',
      'plugin:vue/vue3-recommended',
      'plugin:prettier/recommended',
    ],
  }),
  {
    files: ['**/*.ts', '**/*.js', '**/*.vue'],
    rules: {
      ...prettierConfig.rules,
    },
  },
];
