import { asUint8Array } from './util/as-uint8array.js'

/**
 * Returns a `Uint8Array` of the requested size. Referenced memory will
 * be initialized to 0.
 */
export const alloc = (() => {
  if (globalThis.Buffer.alloc != null) {
    return (len: number = 0) => asUint8Array(globalThis.Buffer.alloc(len))
  }
  return (len: number = 0) => new Uint8Array(len)
})()

/**
 * Where possible returns a Uint8Array of the requested size that references
 * uninitialized memory. Only use if you are certain you will immediately
 * overwrite every value in the returned `Uint8Array`.
 */
export const allocUnsafe = (() => {
  if (globalThis.Buffer.allocUnsafe != null) {
    return (len: number = 0) => asUint8Array(globalThis.Buffer.allocUnsafe(len))
  }
  return (len: number = 0) => new Uint8Array(len)
})()
