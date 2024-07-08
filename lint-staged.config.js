/** @type {import("lint-staged").Config}*/
export default {
    '**/*.{mjs,cjs,js,jsx,ts,tsx,md,json,yaml,yml}': ['eslint', 'prettier -l'],
}
