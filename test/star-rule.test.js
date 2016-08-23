// process.stdout.write('\033c'); // clear the screen
var test = require('tap-only');
var undefsafe = require('../lib/undefsafe');
var fixture = {
  "commits": [
    {
      "modified": [
        "one",
        "two"
      ]
    },
    {
      "modified": [
        "two",
        "four"
      ]
    }
  ]
};

test('get value on first * selector', function (t) {
  var res = undefsafe(fixture, 'commits.*.modified.*');
  t.equal(res, 'one');
  t.end();
});

test('walking multiple routes', function (t) {
  var res = undefsafe(fixture, 'commits.*.modified.*', 'four');
  t.equal(res, 'four');
  t.end();
});


test('get specific match * selector', function (t) {
  var res = undefsafe(fixture, 'commits.*.modified.*', 'two');
  t.equal(res, 'two');
  t.end();
});

test('match * selector returns undefined', function (t) {
  var res = undefsafe(fixture, 'commits.*.modified.*', 'three');
  t.equal(res, undefined);
  t.end();
});

test('match * selector works on objects', function (t) {
  var res = undefsafe(fixture, '*.*.modified.*');
  t.equal(res, 'one');
  t.end();
});
