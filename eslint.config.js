import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js, prettier: pluginPrettier },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.browser },
        rules: {
            ...configPrettier.rules,
            ...js.configs.recommended.rules,

            'prefer-const': 'error',
            'no-var': 'error',
            eqeqeq: ['error', 'always'],
            curly: ['error', 'multi-line', 'consistent'],
            'no-console': 'warn',
            'no-debugger': 'error',
            'no-alert': 'warn',

            complexity: ['warn', 10],
            'max-depth': ['warn', 4],
            'max-params': ['warn', 4],
            'no-duplicate-imports': 'error',
            'no-useless-return': 'error',
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

            camelcase: ['error', { properties: 'always' }],
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            'arrow-parens': ['error', 'always'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],

            'no-await-in-loop': 'warn',
            'require-await': 'warn',
            'no-promise-executor-return': 'error',

            'prettier/prettier': 'error',
        },
    },
    {
        ignores: ['node_modules', 'dist', 'webpack.config.js'],
    },
]);
