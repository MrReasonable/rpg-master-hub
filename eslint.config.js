import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import json from 'eslint-plugin-json'
import eslintPluginYml from 'eslint-plugin-yml'
import markdown from 'eslint-plugin-markdown'

/**  @type {import("eslint").Linter.Config} */
export default [
    {
        files: ['**/*.{js,mjs,cjs}'],
        ...pluginJs.configs.recommended,
    },
    {
        files: ['**/*.json'],
        ...json.configs['recommended'],
    },
    {
        plugins: {
            markdown,
        },
    },
    {
        files: ['**/*.md'],
        processor: 'markdown/markdown',
    },
    ...eslintPluginYml.configs['flat/recommended'],
    eslintConfigPrettier,
]
