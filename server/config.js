'use strict';

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ silent: true }); // eslint-disable-line global-require
}

const isDevelopment = process.env.NODE_ENV === 'development',
  isProduction = process.env.NODE_ENV === 'production';

if (isDevelopment) {
  process.env.RETHINK_DB = 'parsehub_shopify_development';
}

module.exports = {
  isDevelopment,
  isProduction,

  // Determines if the koa logger ("-->") should be enabled (this
  // clogs up the local test )
  logRequests: (process.env.API_LOGS === 'true') || (process.env.NODE_ENV === 'production'),

  /**
   * The secret key that is used to sign all JWT tokens.
   */
  secret: process.env.SECRET || 'DpKlmvARY649JcHrR5g9gRmt',

  /**
   * The API hosting configuration.
   */
  api: {
    /**
     * The port that the API should be hosted on.
     */
    port: process.env.PORT || 14320
  },

  rethinkdb: {
    host: process.env.RETHINK_HOST || 'localhost',
    port: process.env.RETHINK_PORT || 28015,
    authKey: process.env.RETHINK_AUTHKEY || '',
    db: process.env.RETHINK_DB || 'parsehub_shopfy_test',
    discovery: process.env.RETHINK_DISCOVERY || false
  },

  parsehub: {
    key: process.env.PARSEHUB_KEY || 'tx-g-Nhb1Dki2hQPOihKmgbO'
  }
};
