'use strict';

const
  koa           = require('koa'),
  cors          = require('kcors'),
  logger        = require('koa-logger'),
  compress      = require('koa-compress'),
  config        = require('../../config'),
  ping          = require('./middleware/ping'),
  timeout       = require('./middleware/timeout'),
  errors        = require('./middleware/errors'),
  parser        = require('./middleware/parser'),
  routes        = require('./routes'),
  zlib          = require('zlib');

const app = koa();

// Logging
if (config.logRequests) {
  app.use(logger());
}

// Gzip all the time
app.use(compress({
  threshold: 2048,
  flush: zlib.Z_SYNC_FLUSH
}));

// Handle health checks
ping(app);

// Reject slow requests
app.use(timeout());

// Cors
app.use(cors());

// Error messages
errors(app);

// Body parsing
parser(app);

// Routers
routes(app);

module.exports = app;
