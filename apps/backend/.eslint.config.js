import base from '../../eslint.config.js'
import eslintConfigNestJs from 'eslint-config-nestjs'

/**  @type {import("eslint").Linter.Config} */
export default {
    ...base,
    ...eslintConfigNestJs,
}
