'use strict';

function undefsafe(obj, path) {
  var parts = path.split('.'),
      key = null,
      type = typeof obj;

  // we're dealing with a primative
  if (type !== 'object' && type !== 'function') {
    return obj;
  } else if (path.trim() === '') {
    return obj;
  }

  while ((key = parts.shift())) {
    obj = obj[key];
    if (obj === undefined) {
      break;
    }
  }

  return obj;
}

module.exports = undefsafe;