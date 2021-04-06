'use strict'

/** @type {import('aegir').PartialOptions} */
module.exports = {
  build: {
    bundlesizeMax: '11KB',
    config: {
      entryPoints: ['index.js']
    }
  },
  docs: {
    entryPoint: 'index.js'
  }
}
