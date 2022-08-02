import bases from './util/bases.js'

/**
 * @typedef {import('./util/bases').SupportedEncodings} SupportedEncodings
 */

/**
 * Turns a `Uint8Array` into a string.
 *
 * Supports `utf8`, `utf-8` and any encoding supported by the multibase module.
 *
 * Also `ascii` which is similar to node's 'binary' encoding.
 *
 * @param {Uint8Array} array - The array to turn into a string
 * @param {SupportedEncodings} [encoding=utf8] - The encoding to use
 * @returns {string}
 */
export function toString (array, encoding = 'utf8') {
  const base = bases[encoding]

  if (!base) {
    throw new Error(`Unsupported encoding "${encoding}"`)
  }

  if ((encoding === 'utf8' || encoding === 'utf-8') && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString('utf8')
  }

  // strip multibase prefix
  return base.encoder.encode(array).substring(1)
}
