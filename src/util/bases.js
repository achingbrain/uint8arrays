import { bases } from 'multiformats/basics'

/**
 * @typedef {import('multiformats/bases/interface').MultibaseCodec<any>} MultibaseCodec
 */

/**
 * @param {string} name
 * @param {string} prefix
 * @param {(buf: Uint8Array) => string} encode
 * @param {(str: string) => Uint8Array} decode
 * @returns {MultibaseCodec}
 */
function createCodec (name, prefix, encode, decode) {
  return {
    name,
    prefix,
    encoder: {
      name,
      prefix,
      encode
    },
    decoder: {
      decode
    }
  }
}

const string = createCodec('utf8', 'u', (buf) => {
  if (globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return 'u' + globalThis.Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength).toString('utf8')
  }

  const decoder = new TextDecoder('utf8')
  return 'u' + decoder.decode(buf)
}, (str) => {
  str = str.substring(1)

  if (globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(str, 'utf8')
  }

  const encoder = new TextEncoder()
  return encoder.encode(str)
})

const ascii = createCodec('ascii', 'a', (buf) => {
  let string = 'a'

  for (let i = 0; i < buf.length; i++) {
    string += String.fromCharCode(buf[i])
  }
  return string
}, (str) => {
  str = str.substring(1)
  const buf = new Uint8Array(str.length)

  for (let i = 0; i < str.length; i++) {
    buf[i] = str.charCodeAt(i)
  }

  return buf
})

/**
 * @typedef {'utf8' | 'utf-8' | 'hex' | 'latin1' | 'ascii' | 'binary' | keyof bases } SupportedEncodings
 */

/**
 * @type {Record<SupportedEncodings, MultibaseCodec>}
 */
const BASES = {
  utf8: string,
  'utf-8': string,
  hex: bases.base16,
  latin1: ascii,
  ascii: ascii,
  binary: ascii,

  ...bases
}

export default BASES
