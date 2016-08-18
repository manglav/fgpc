'use strict';

const
  http   = require('http'),
  api    = require('./lib/api'),
  config = require('./config');


// Server
let server = http.createServer(api.callback());

// Listen
server.listen(config.api.port, '0.0.0.0');
console.info(`Port           : ${config.api.port}`);
console.info(`Rethink        : ${config.rethinkdb.host}:${config.rethinkdb.port}`);