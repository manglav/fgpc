'use strict';

// This file provides global hooks that are run once for all
// mocha test files

let co = require('co');
require('co-mocha');

const db = require('./db');

after(function* () {
  yield co(db.drop());
});
