import { FlatCompat } from '@eslint/eslintrc'
import { includeIgnoreFile } from '@eslint/compat'
import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import json from 'eslint-plugin-json'
import eslintPluginYml from 'eslint-plugin-yml'
import markdown from 'eslint-plugin-markdown'
import jest from 'eslint-plugin-jest'
import tsEslint from 'typescript-eslint'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import eslintNestJs from 'eslint-config-nestjs'
import solid from 'eslint-plugin-solid'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tailwind from 'eslint-plugin-tailwindcss'
import tsParser from '@typescript-eslint/parser'

import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const gitignorePath = resolve(__dirname, '.gitignore')
const backendDir = '**/apps/backend'
const webDir = '**/apps/web'

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const testFiles = ['js', 'ts', 'tsx'].flatMap((ext) =>
    ['test', 'spec'].map((suffix) => `**/*.${suffix}.${ext}`)
)
const typescriptFiles = ['ts', 'tsx'].map((ext) => `**/*.${ext}`)

/**  @type {import("eslint").Linter.Config} */
export default [
    includeIgnoreFile(gitignorePath),
    pluginJs.configs.recommended,
    ...tsEslint.configs.strictTypeChecked.map((config) => ({
        files: typescriptFiles,
        ...config,
    })),
    {
        files: typescriptFiles,
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: testFiles,
        ...jest.configs['flat/recommended'],
    },
    {
        files: ['**/*.json'],
        ...json.configs['recommended'],
    },
    {
        files: ['**/*.md'],
        plugins: {
            markdown,
        },
        processor: 'markdown/markdown',
    },
    ...eslintPluginYml.configs['flat/recommended'].map((config) => ({
        files: ['**/*.yml'],
        ...config,
    })),
    ...compat.config(eslintNestJs).map((config) => ({
        files: typescriptFiles.map((ext) => `${backendDir}/**/*.${ext}`),
        ...config,
    })),
    {
        files: typescriptFiles.map((ext) => `${webDir}/**/*.${ext}`),
        ...solid.configs['flat/typescript'],
        ...jsxA11y.flatConfigs.strict,
        languageOptions: {
            parserOptions: {
                parser: tsParser,
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    ...tailwind.configs['flat/recommended'],
    eslintConfigPrettier,
]
