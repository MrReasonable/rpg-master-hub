import config from '../../.prettierrc.js'

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
    ...config,
    plugins: ['prettier-plugin-tailwindcss'],
}
