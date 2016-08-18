'use strict';

const
  Router = require('koa-router');

function routes(app) {

  let privateRouter = new Router();

  /* eslint global-require: 0 */

  // Parsehub
  privateRouter.post('/v1/parsehub/webhook', require('./parsehub/webhook'));

  app
    .use(privateRouter.routes())
    .use(privateRouter.allowedMethods());
}

module.exports = routes;
