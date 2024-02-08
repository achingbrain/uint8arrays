/**
 * To guarantee Uint8Array semantics, convert nodejs Buffers
 * into vanilla Uint8Arrays
 */
export const asUint8Array = (() => {
  if (globalThis.Buffer != null) {
    return (buf: Uint8Array | globalThis.Buffer): Uint8Array => buf.constructor !== Uint8Array ? new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength) : buf
  }
  return (buf: Uint8Array) => buf
})()
