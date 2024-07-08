import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import baseConfig from '../../eslint.config.mjs'
import solid from 'eslint-plugin-solid'
import * as tsParser from '@typescript-eslint/parser'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tailwind from 'eslint-plugin-tailwindcss'

/**  @type {import("eslint").Linter.Config} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...tseslint.configs.strict,
    {
        files: ['**/*.{ts,tsx}'],
        ...solid.configs.strict,
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: 'tsconfig.json',
            },
        },
    },
    ...tailwind.configs['flat/recommended'],
    jsxA11y.flatConfigs.strict,
    ...baseConfig,
]
