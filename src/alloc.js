/**
 * Returns a `Uint8Array` of the requested size. Referenced memory will
 * be initialized to 0.
 *
 * @param {number} [size]
 * @returns {Uint8Array}
 */
export function alloc (size = 0) {
  if (globalThis.Buffer?.alloc != null) {
    return globalThis.Buffer.alloc(size)
  }

  return new Uint8Array(size)
}

/**
 * Where possible returns a Uint8Array of the requested size that references
 * uninitialized memory. Only use if you are certain you will immediately
 * overwrite every value in the returned `Uint8Array`.
 *
 * @param {number} [size]
 * @returns {Uint8Array}
 */
export function allocUnsafe (size = 0) {
  if (globalThis.Buffer?.allocUnsafe != null) {
    return globalThis.Buffer.allocUnsafe(size)
  }

  return new Uint8Array(size)
}
