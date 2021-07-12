  'use strict'

const b16 = require('multiformats/bases/base16')
const b32 = require('multiformats/bases/base32')
const b36 = require('multiformats/bases/base36')
const b58 = require('multiformats/bases/base58')
const b64 = require('multiformats/bases/base64')

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
  const decoder = new TextDecoder('utf8')
  return 'u' + decoder.decode(buf)
}, (str) => {
  const encoder = new TextEncoder()
  return encoder.encode(str.substring(1))
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
 * @typedef {'utf8' | 'utf-8' | 'hex' | 'latin1' | 'ascii' | 'binary'} NodeEncodings
 * @typedef {'base16' | 'base16upper'} Base16Encodings
 * @typedef {'base32' | 'base32upper' | 'base32pad' | 'base32padupper' | 'base32hex' | 'base32hexupper' | 'base32hexpad' | 'base32hexpadupper' | 'base32z'} Base32Encodings
 * @typedef {'base36' | 'base36upper'} Base36Encodings
 * @typedef {'base58btc' | 'base58flickr'} Base58Encodings
 * @typedef {'base64' | 'base64pad' | 'base64url' | 'base64urlpad'} Base64Encodings
 *
 * @typedef {NodeEncodings | Base16Encodings | Base32Encodings | Base36Encodings | Base58Encodings | Base64Encodings } SupportedEncodings
 */

/**
 * @type {Record<string, MultibaseCodec>}
 */
const BASES = {
  'utf8': string,
  'utf-8': string,
  'hex': b16.base16,
  'latin1': ascii,
  'ascii': ascii,
  'binary': ascii
}

/**
 * @type {Record<string, any>}
 */
 const bases = {
  ...b16,
  ...b32,
  ...b36,
  ...b58,
  ...b64
}

Object.keys(bases).forEach(key => {
  const base = bases[key]

  if (typeof base !== 'boolean') {
    BASES[base.name] = base
  }
})

module.exports = BASES
