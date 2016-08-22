'use strict';

const
  request = require('co-request'),
  config = require('../../../config');

let API_URL = 'https://www.parsehub.com/api/v2',
  baseRequest = request.defaults({
    baseUrl: API_URL,
    gzip: true,
    headers: {
      'Content-Type': 'application/json'
    },
    qs: {
      api_key: config.parsehub.key,
      format: 'json'
    }
  });

function* getRunData(runToken) {
  let res = yield baseRequest({ url: `/runs/${runToken}/data`, method: 'GET' });

  // In case of error
  if (res.statusCode !== 200) {
    console.log('ALERT :: Failed to retrieve parsehub:');
    console.log(console.log(res.body));

    return {};
  }

  let data = JSON.parse(res.body);
  return data;
}

module.exports = {
  getRunData
};
