import { camelCase } from "./deps.ts";
/**
 * Return the text in camelCase + how many 🐪
 * 
 * @example "this is a example" -> "thisIsAnExample 🐪🐪🐪"
 * @param text
 * @returns {string}
 */
export function camelize(text: string): any {
    let opts = {}
    const camelCaseText = camelCase(text, opts)
    const matches = camelCaseText.match(/[A-Z]/g) || []
    const camels = Array.from({ length: matches.length })
        .map(() => '🐪')
        .join('')

    return `${camelCaseText} ${camels}`
}