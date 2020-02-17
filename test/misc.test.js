var test = require('tap').test;
var undefsafe = require('../lib/undefsafe');

test('cannot modify prototype chain', function(t) {
  const pre = {}.__proto__.toString;
  var payload = '__proto__.toString';
  undefsafe({ a: 'b' }, payload, 'JHU');
  t.notEqual({}.toString, 'JHU');
  ({}.__proto__.toString = pre); // restore
  t.end();
});
