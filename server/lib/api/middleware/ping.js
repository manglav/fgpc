'use strict';


function ping(app) {
  app.use(pingMiddleware);
}

function* pingMiddleware(next) {

  if ((this.path || '').toLowerCase() === '/v1/ping') {
    this.status = 200;
    this.body = { now: new Date() };
    return;
  }

  yield next;
}

module.exports = ping;
