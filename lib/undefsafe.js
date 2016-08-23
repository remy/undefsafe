'use strict';

function undefsafe(obj, path, value) {
  var parts = path.split('.');
  var key = null;
  var type = typeof obj;
  var root = obj;
  var parent = obj;

  var star = parts.filter(function (_) { return _ === '*' }).length > 0;

  // we're dealing with a primative
  if (type !== 'object' && type !== 'function') {
    return obj;
  } else if (path.trim() === '') {
    return obj;
  }

  key = parts[0];
  var i = 0;
  for (; i < parts.length; i++) {
    key = parts[i];
    parent = obj;

    if (key === '*') {
      // loop through each property
      var prop = '';

      for (prop in parent) {
        var shallowObj = undefsafe(obj[prop], parts.slice(i + 1).join('.'), value);
        if (shallowObj) {
          if ((value && shallowObj === value) || (!value)) {
            return shallowObj;
          }
        }
      }
      return undefined;
      key = prop;
    }

    obj = obj[key];
    if (obj === undefined || obj === null) {
      break;
    }
  }

  // if we have a null object, make sure it's the one the user was after,
  // if it's not (i.e. parts has a length) then give undefined back.
  if (obj === null && i !== parts.length - 1) {
    obj = undefined;
  } else if (!star && value) {
    key = path.split('.').pop();
    parent[key] = value;
  }
  return obj;
}

if (typeof module !== 'undefined') {
  module.exports = undefsafe;
}
