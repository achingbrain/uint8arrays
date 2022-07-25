
/**
 * Create a Uint8Array of the specified length - uses
 * the more performant `Buffer.allocUnsafe` if it is
 * available or `new Uint8Array` if it is not.
 *
 * @param {number} length
 * @returns {Uint8Array}
 */
export function allocUnsafe (length) {
  if (globalThis.Buffer != null) {
    return globalThis.Buffer.allocUnsafe(length)
  }

  return new Uint8Array(length)
}
