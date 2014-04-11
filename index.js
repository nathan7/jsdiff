'use strict';
module.exports = diff

var eq = require('is-equal')
  , has = {}.hasOwnProperty

function diff(value, other) {
  if (eq(value, other)) return false
  var obj = Object(value)
    , otherObj = Object(other)
  if (obj !== value && otherObj !== other) return true

  obj = value instanceof Object ? value : {}
  otherObj = other instanceof Object ? other : {}
  
  var ret = false
    , d

  if (value instanceof Array && other instanceof Array) {
    for (var i = 0, len = Math.max(value.length, other.length); i < len; i++) {
      d = diff(value[i], other[i])
      if (d) {
        if (!ret) ret = []
        ret[i] = d
      }
    }
  }
  else {
    var key
      , keys = {}
    for (key in obj) if (has.call(obj, key)) keys[key] = true
    for (key in otherObj) if (has.call(otherObj, key)) keys[key] = true

    for (key in keys) if (has.call(keys, key)) {
      d = diff(obj[key], otherObj[key])
      if (d) {
        if (!ret) ret = {}
        ret[key] = d
      }
    }
  }

  return ret
}

diff.patch = patch
function patch(diff, fresh, model) {
  p(diff, fresh, [])
  function p(diff, fresh, prefix) {
    for (var key in diff) if (has.call(diff, key)) {
      if (diff[key] === true) {
        if (has.call(fresh || {}, key))
          model.set(prefix.concat(key), fresh[key])
        else
          model.delete(prefix.concat(key))
      }
      else
        p(diff[key], fresh && fresh[key], prefix.concat(key))
    }
  }
}
