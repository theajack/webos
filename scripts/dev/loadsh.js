/**
 * Minified by jsDelivr using Terser v5.15.1.
 * Original file: /npm/is-typed-array@1.1.10/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
'use strict';
var forEach = require('for-each'),
  availableTypedArrays = require('available-typed-arrays'),
  callBound = require('call-bind/callBound'),
  $toString = callBound('Object.prototype.toString'),
  hasToStringTag = require('has-tostringtag/shams')(),
  gOPD = require('gopd'),
  g = 'undefined' == typeof globalThis ? global : globalThis,
  typedArrays = availableTypedArrays(),
  $indexOf =
    callBound('Array.prototype.indexOf', !0) ||
    function (r, t) {
      for (var e = 0; e < r.length; e += 1) if (r[e] === t) return e;
      return -1;
    },
  $slice = callBound('String.prototype.slice'),
  toStrTags = {},
  getPrototypeOf = Object.getPrototypeOf;
hasToStringTag &&
  gOPD &&
  getPrototypeOf &&
  forEach(typedArrays, function (r) {
    var t = new g[r]();
    if (Symbol.toStringTag in t) {
      var e = getPrototypeOf(t),
        a = gOPD(e, Symbol.toStringTag);
      if (!a) {
        var o = getPrototypeOf(e);
        a = gOPD(o, Symbol.toStringTag);
      }
      toStrTags[r] = a.get;
    }
  });
var tryTypedArrays = function (r) {
  var t = !1;
  return (
    forEach(toStrTags, function (e, a) {
      if (!t)
        try {
          t = e.call(r) === a;
        } catch (r) {}
    }),
    t
  );
};
module.exports = function (r) {
  if (!r || 'object' != typeof r) return !1;
  if (!hasToStringTag || !(Symbol.toStringTag in r)) {
    var t = $slice($toString(r), 8, -1);
    return $indexOf(typedArrays, t) > -1;
  }
  return !!gOPD && tryTypedArrays(r);
};
//# sourceMappingURL=/sm/0217e301a55bd9345b1f153934a5598df9123f8285c7515610c02b7ffdb6dffb.map
