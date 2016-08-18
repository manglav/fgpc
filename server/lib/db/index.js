'use strict';

const
  r      = require('rethinkdbdash'),
  config = require('../../config');

let driver;

function create(dbName) {

  if (dbName) {
    config.rethinkdb.db = dbName;
  }

  // Reuse the driver (important for tests)
  if (!driver) {

    // We use the default driver options for connections (min: 50; max: 1000)
    driver = r(config.rethinkdb);
  }

  return driver;
}

module.exports = {
  create
};
