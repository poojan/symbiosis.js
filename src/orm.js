;(function (name, definition) {
  if (typeof module !== 'undefined') {
    module.exports = definition();
  } else if (typeof define === 'function' && typeof define.amd === 'object') {
    define(definition);
  } else {
    this[name] = definition();
  }
})('ORM', function () {
  'use strict';

  var ORM = {};

  return ORM;
});