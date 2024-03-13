import { Buffer } from 'node:buffer'
import bases, { type SupportedEncodings } from './util/bases.js'
import { asUint8Array } from '#util/as-uint8array'

export type { SupportedEncodings }

/**
 * Create a `Uint8Array` from the passed string
 *
 * Supports `utf8`, `utf-8`, `hex`, and any encoding supported by the multiformats module.
 *
 * Also `ascii` which is similar to node's 'binary' encoding.
 */
export function fromString (string: string, encoding: SupportedEncodings = 'utf8'): Uint8Array {
  const base = bases[encoding]

  if (base == null) {
    throw new Error(`Unsupported encoding "${encoding}"`)
  }

  if (encoding === 'utf8' || encoding === 'utf-8') {
    return asUint8Array(Buffer.from(string, 'utf-8'))
  }

  // add multibase prefix
  return base.decoder.decode(`${base.prefix}${string}`) // eslint-disable-line @typescript-eslint/restrict-template-expressions
}
