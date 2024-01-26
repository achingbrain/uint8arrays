import { allocUnsafe } from './alloc.js'
import { asUint8Array } from './util/as-uint8array.js'

/**
 * Returns a new Uint8Array created by concatenating the passed Uint8Arrays
 */
export const concat = (():((arrays: Uint8Array[], length?: number) => Uint8Array) => globalThis.Buffer != null
  ? (arrays, length?) => asUint8Array(globalThis.Buffer.concat(arrays, length))
  : (arrays, length?) => {
      if (length == null) {
        length = 0
        for (const array of arrays) {
          length += array.length
        }
      }

      const output = allocUnsafe(length)
      let offset = 0

      for (const arr of arrays) {
        output.set(arr, offset)
        offset += arr.length
      }

      return output
    }
)()
