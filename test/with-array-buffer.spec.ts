import { expect } from 'aegir/chai'
import { withArrayBuffer } from '../src/with-array-buffer.ts'

describe('Uint8Array withArrayBuffer', () => {
  it('should return the original array', () => {
    const arr = new Uint8Array(10)

    const transformed = withArrayBuffer(arr)
    expect(transformed).to.equal(arr)
  })

  it('should return a copy of original array', function () {
    if (global.SharedArrayBuffer == null) {
      return this.skip()
    }

    const buf = new SharedArrayBuffer(10)
    const arr = new Uint8Array(buf, 0, buf.byteLength)
    expect(arr.buffer).to.be.an.instanceOf(SharedArrayBuffer)

    const transformed = withArrayBuffer(arr)
    expect(transformed).to.not.equal(arr)
    expect(transformed).to.deep.equal(arr)
    expect(transformed).to.be.an.instanceOf(Uint8Array)
    expect(transformed.buffer).to.be.an.instanceOf(ArrayBuffer)
    expect(transformed).to.equalBytes(arr)
  })
})
