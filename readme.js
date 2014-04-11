'use strict'; //jshint evil:true
var inspect = require('util').inspect
  , fs = require('fs')
  , diff = require('./')
fs.writeFileSync('README.md', fs.readFileSync('README.md', 'utf8')
  .replace(/`([^`]+)` ->.*$/mg, function(m, x) {
    var arrow = '`' + x + '` -> '
    try {
      return arrow + '`' + inspect(new Function('diff', 'return (' + x + ')')(diff)) + '`'
    }
    catch (e) {
      console.error(arrow + '<fail>')
      throw e
    }
  }))
