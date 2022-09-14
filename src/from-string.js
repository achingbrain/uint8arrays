import bases from './util/bases.js'
import { asUint8Array } from './util/as-uint8array.js'

/**
 * @typedef {import('./util/bases').SupportedEncodings} SupportedEncodings
 */

/**
 * Create a `Uint8Array` from the passed string
 *
 * Supports `utf8`, `utf-8`, `hex`, and any encoding supported by the multiformats module.
 *
 * Also `ascii` which is similar to node's 'binary' encoding.
 *
 * @param {string} string
 * @param {SupportedEncodings} [encoding=utf8] - utf8, base16, base64, base64urlpad, etc
 * @returns {Uint8Array}
 */
export function fromString (string, encoding = 'utf8') {
  const base = bases[encoding]

  if (!base) {
    throw new Error(`Unsupported encoding "${encoding}"`)
  }

  if ((encoding === 'utf8' || encoding === 'utf-8') && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return asUint8Array(globalThis.Buffer.from(string, 'utf-8'))
  }

  // add multibase prefix
  return base.decoder.decode(`${base.prefix}${string}`)
}
