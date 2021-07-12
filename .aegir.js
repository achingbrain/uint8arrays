'use strict'

/** @type {import('aegir').PartialOptions} */
module.exports = {
  build: {
    bundlesizeMax: '4KB',
    config: {
      entryPoints: ['index.js']
    }
  },
  docs: {
    entryPoint: 'index.js'
  }
}
