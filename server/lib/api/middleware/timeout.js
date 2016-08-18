'use strict';

const co = require('co');

const DEFAULT_TIMEOUT = 120 * 1000;

/**
 * An enhanced version of koa-timeout that allows for
 * routes to add additional time (e.g. for uploads).
 */
function timeout() {
  return function* (next) {

    // Check if we should skip the timeout for debugging purposes. The
    // timeouts should never be disabled for CI tests / builds

    if ((process.env.DISABLE_TIMEOUT || '') === 'true') {
      yield next;
      return;
    }

    let ctx = this;
    let tmr = null;
    yield Promise.race([

      new Promise((resolve, reject) => {
        tmr = setTimeout(() => {

          // Check for extension on route
          if (ctx.timeout) {
            console.log('EXTENDED TIMEOUT', ctx.timeout);
            tmr = setTimeout(() => {
              raiseTimeout(reject, DEFAULT_TIMEOUT + ctx.timeout);
            }, ctx.timeout);
          }
          else {
            raiseTimeout(reject, DEFAULT_TIMEOUT);
          }

        }, DEFAULT_TIMEOUT);
      }),

      new Promise((resolve, reject) => {
        co.wrap(function* () {
          yield* next;
        })
          .call(ctx)
          .then(() => {
            clearTimeout(tmr);
            resolve();
          })
          .catch((err) => {
            clearTimeout(tmr);
            if (err) reject(err);
          });
      })

    ]);
  };
}

/**
 * Raises a rejection if not resovled within the given time.
 */
function raiseTimeout(reject, duration) {
  let e = new Error('Request timeout');
  e.status = 408;
  e.message = 'Timed out after ' + duration.toLocaleString() + 'ms';
  reject(e);
}

module.exports = timeout;
