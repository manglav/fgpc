/* eslint global-require: 0 */
'use strict';

const
  thinky             = require('../../db/thinky');

module.exports = {
  thinky,
  r: thinky.r,
  Product: require('./product'),
  Run: require('./run')
};
