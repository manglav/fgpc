'use strict';

const
  config = require('../../config'),
  rethink = require('../../lib/db'),
  models = require('../../lib/api/models');


// database name
const name = config.rethinkdb.db;

/**
 * Drops the database
 */
function* drop() {

  // If database does not exist, a simple token generate call
  // will instantiate the models and create db and structure.
  // Otherwise we dont need to drop and create, since reset will
  // clean tables. Drop Everytime is dangerous and causes tests
  // to fail most of the time on the first run.

  let conn = rethink.create();

  let exists = yield conn.dbList().contains(name).run();

  if (exists) {
    yield conn.dbDrop(name).run();
  }
}

/**
 * Resets the database between test runs.
 */
function* reset() {

  let conn = rethink.create();

  let exists = yield conn.dbList().contains(name).run();
  if (!exists) {
    yield conn.dbCreate(name);
  }

  // Wait for db before deleting
  yield conn.db(name).wait({ waitFor: 'ready_for_reads' }).run();

  let tableDeletions = [];
  let tables = yield conn.db(name).tableList().run();
  for (let i = 0; i < tables.length; i++) {
    let table = tables[i];
    // yield conn.db(name).table(table).delete().run();
    tableDeletions.push(conn.db(name).table(table).delete({ returnChanges: false }));
  }
  yield tableDeletions;

  // Force database rebuild
  yield models.Product.limit(1).run();

  // Wait for tables / indexes
  yield conn.db(name).wait({ waitFor: 'ready_for_reads' }).run();
}

module.exports = {
  drop,
  reset
};
