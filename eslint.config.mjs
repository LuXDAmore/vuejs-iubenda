import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import * as dependPlugin from 'eslint-plugin-depend';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import unicornPlugin from 'eslint-plugin-unicorn';
import compatPlugin from 'eslint-plugin-compat';
import globals from 'globals';

import jestPlugin from 'eslint-plugin-jest';
import vitestPlugin from '@vitest/eslint-plugin';
import playwrightPlugin from 'eslint-plugin-playwright';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import babelParser from '@babel/eslint-parser';

import promisePlugin from 'eslint-plugin-promise';
import sortKeysFixPlugin from 'eslint-plugin-sort-keys-fix';
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import prettierPlugin from 'eslint-plugin-prettier';
import stylisticTsPlugin from '@stylistic/eslint-plugin-ts';

import {
    sharedRules,
    typescriptRules,
    vueAndNuxtGlobals,
    vueAndNuxtRules,
} from './eslint.constants.mjs';

export default tsEslint.config(
    {

        // ?: intentionally uses computed syntax to make it easy to sort the keys
        plugins: {
            '@stylistic/ts': stylisticTsPlugin,
            'eslint-comments': eslintCommentsPlugin,
            jsdoc: jsdocPlugin,
            prettier: prettierPlugin,
            promise: promisePlugin,
            'sort-keys-fix': sortKeysFixPlugin,
        }
    },
    { files: [ '**/*.{ts,tsx,cts,mts,js,cjs,mjs,vue}' ], },
    {
        // ?: config with just ignores is the replacement for `.eslintignore`
        ignores: [
            '**/node_modules/**',
            '**/vendor/**',
            '**/bower_components/**',

            '**/__snapshots__/**',

            '**/build/**',
            '**/.nx/**',
            '**/.yarn/**',

            '**/coverage/**',

            '**/public/**',
            '**/docs/**',
            '**/.nuxt/**',

            '**/configurations/**',
            '**/dist/**',
            '**/.output/**',
            '**/.vscode/**',

            '**/*.min.*',

            '**/sw.js',

            'components.d.ts',
            '**/generated/**',
            '__typed-router.ts',

        ],
    },

    // ?: extends
    eslint.configs.recommended,
    dependPlugin.configs[ 'flat/recommended' ],
    jsdocPlugin.configs[ 'flat/recommended' ],
    unicornPlugin.configs.recommended,
    compatPlugin.configs[ 'flat/recommended' ],

    // ?: base config
    {
        languageOptions: {
            globals: {
                ... globals.browser,
                ... globals.es2022,
                ... globals.node,
                ... vueAndNuxtGlobals,
            },
            parserOptions: {
                ecmaVersion: 2022,
                parser: babelParser,
                sourceType: 'module',
            },
        },
        linterOptions: { reportUnusedDisableDirectives: 'warn' },
        rules: { ... sharedRules },
        settings: {
            polyfills: [
                'Promise',
                'fetch',
                'Array.from',
            ],
        },
    },

    // ?: Override the recommended config
    {
        // ?: Test files
        extends: [
            ... tsEslint.configs.recommended,
            jestPlugin.configs[ 'flat/style' ],
            jestPlugin.configs[ 'flat/recommended' ],
            vitestPlugin.configs.recommended.rules,
            playwrightPlugin.configs[ 'flat/recommended' ],
        ],
        files: [
            './apps/**/_{test,spec}_/*.{j,t}s?(x)',
            './apps/**/*.{test,spec}.{j,t}s?(x)',
            './packages/**/_{test,spec}_/*.{j,t}s?(x)',
            './packages/**/*.{test,spec}.{j,t}s?(x)',
            './tests/**/*.{test,spec}.{j,t}s?(x)',
        ],
        languageOptions: {
            globals: { ... jestPlugin.environments.globals.globals, },
            parser: tsEslint.parser,
        },
        plugins: {
            '@typescript-eslint': tsEslint.plugin,
            jestPlugin,
            playwrightPlugin,
            vitestPlugin
        },
        rules: {
            'playwright/no-skipped-test': 'off',
            'vitest/valid-describe-callback': 'warn'
        }
    },
    {
        // ?: Vue and TS files
        extends: [
            ... vuePlugin.configs[ 'flat/strongly-recommended' ],
            ... tsEslint.configs.recommended,
            ... tsEslint.configs.stylistic,
        ],
        files: [ '**/*.vue', '**/*.ts' ],
        languageOptions: {
            globals: { ... vueAndNuxtGlobals, },
            parser: vueParser,
            parserOptions: {
                ecmaVersion: 'latest',
                extraFileExtensions: [ '.vue' ],
                parser: tsEslint.parser,
                sourceType: 'module',
            },
        },
        plugins: { '@typescript-eslint': tsEslint.plugin, },
        rules: {
            ... sharedRules,
            ... typescriptRules,
            indent: 'off',
            'sort-keys': 'off',
            'sort-keys-fix/sort-keys-fix': 'off',
            ... vueAndNuxtRules,
        },
    },
    {
        // ?: TS files
        extends: [ ... tsEslint.configs.recommended, ... tsEslint.configs.stylistic, ],
        files: [ '**/*.ts' ],
        languageOptions: {
            globals: { ... vueAndNuxtGlobals, },
            parser: tsEslint.parser,
        },
        plugins: { '@typescript-eslint': tsEslint.plugin, },
        rules: {
            ... sharedRules,
            ... typescriptRules,
        },
    }
);
