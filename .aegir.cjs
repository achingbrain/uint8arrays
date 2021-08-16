'use strict'

/** @type {import('aegir').PartialOptions} */
module.exports = {
  build: {
    bundlesizeMax: '7KB',
    config: {
      entryPoints: ['index.js']
    }
  },
  docs: {
    entryPoint: 'index.js'
  }
}
