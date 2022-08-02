/* eslint-env mocha */

import { expect } from 'aegir/utils/chai.js'
import { alloc, allocUnsafe } from '../src/alloc.js'

describe('Uint8Array alloc', () => {
  it('can alloc memory', () => {
    const size = 10

    expect(alloc(size)).to.have.property('byteLength', size)
  })

  it('can alloc memory', () => {
    const size = 10
    const buf = alloc(size)

    expect(buf.every(value => value === 0)).to.be.true()
  })

  it('can alloc memory unsafely', () => {
    const size = 10

    expect(allocUnsafe(size)).to.have.property('byteLength', size)
  })
})
