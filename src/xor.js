import { allocUnsafe } from './alloc.js'

/**
 * Returns the xor distance between two arrays
 *
 * @param {Uint8Array} a
 * @param {Uint8Array} b
 */
export function xor (a, b) {
  if (a.length !== b.length) {
    throw new Error('Inputs should have the same length')
  }

  const result = allocUnsafe(a.length)

  for (let i = 0; i < a.length; i++) {
    result[i] = a[i] ^ b[i]
  }

  return result
}
