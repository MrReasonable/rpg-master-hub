import { FlatCompat } from '@eslint/eslintrc'
import { includeIgnoreFile } from '@eslint/compat'
import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import json from 'eslint-plugin-json'
import eslintPluginYml from 'eslint-plugin-yml'
import markdown from 'eslint-plugin-markdown'
import jest from 'eslint-plugin-jest'
import tsEslint from 'typescript-eslint'
import eslintNestJs from 'eslint-config-nestjs'
import solid from 'eslint-plugin-solid'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tailwind from 'eslint-plugin-tailwindcss'
import tsParser from '@typescript-eslint/parser'
import unicorn from 'eslint-plugin-unicorn'
import sonarjs from 'eslint-plugin-sonarjs'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')
const backendPath = '/apps/backend'
const webPath = '/apps/web'

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const javascriptFileExtensions = ['js', 'jsx', 'cjs', 'mjs']
const typescriptFileExtensions = ['ts', 'tsx']
const testFileSuffixes = ['test', 'spec']

const javascriptTestFileExtensions = javascriptFileExtensions.flatMap(
    (extension) => testFileSuffixes.map((suffix) => `${suffix}.${extension}`)
)

const typescriptTestFileExtensions = typescriptFileExtensions.flatMap(
    (extension) => testFileSuffixes.map((suffix) => `${suffix}.${extension}`)
)

const testFileExtensions = [
    ...javascriptTestFileExtensions,
    ...typescriptTestFileExtensions,
]
const allTypescriptExtensions = [
    ...typescriptFileExtensions,
    ...typescriptTestFileExtensions,
]

const flatRecommendedConfig = 'flat/recommended'

/**  @type {import("eslint").Linter.Config} */
export default [
    includeIgnoreFile(gitignorePath),
    pluginJs.configs.recommended,
    ...tsEslint.configs.strictTypeChecked.map((config) => ({
        files: typescriptFileExtensions.map((extension) => `**/*.${extension}`),
        ...config,
    })),
    {
        files: typescriptFileExtensions.map((extension) => `**/*.${extension}`),
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: testFileExtensions.map((extension) => `**/*.${extension}`),
        ...jest.configs[flatRecommendedConfig],
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
    ...eslintPluginYml.configs[flatRecommendedConfig].map((config) => ({
        files: ['**/*.yml'],
        ...config,
    })),
    ...compat.config(eslintNestJs).map((config) => ({
        files: allTypescriptExtensions.map(
            (extension) => `${backendPath}/**/*.${extension}`
        ),
        ...config,
    })),
    {
        files: typescriptFileExtensions.map(
            (extension) => `${webPath}/**/*.${extension}`
        ),
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
    {
        ...unicorn.configs[flatRecommendedConfig],
        rules: {
            'unicorn/prevent-abbreviations': [
                'error',
                {
                    ignore: ['.*e2e.*$', /^ignore/i],
                },
            ],
        },
    },
    sonarjs.configs['recommended'],
    ...tailwind.configs[flatRecommendedConfig],
    eslintConfigPrettier,
]
