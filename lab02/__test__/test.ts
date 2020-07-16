import { assertStrictEquals } from 'https://deno.land/std/testing/asserts.ts'
import { camelize } from '../camelize.ts'

Deno.test('camelize works', async () => {
    let expected: string = "thisIsAnExample 🐪🐪🐪"
    let actual: string = camelize('this is an example')

    assertStrictEquals(actual, expected)
})