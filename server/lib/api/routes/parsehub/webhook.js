'use strict';

const
  _ = require('lodash'),
  parse = require('../../util/parsehub'),
  models = require('../../models');

function* webhook() {
  let data = this.request.body || {};

  // Check if the run finished
  if (data.data_ready) {
    let runData = yield parse.getRunData(data.run_token);

    if (runData.products && _.isArray(runData.products)) {
      for (let item of runData.products) {
        let product = new models.Product(item);
        yield product.save();
      }
    }
  }

  this.status = 200;
  this.body = { ok: true };
}

module.exports = webhook;
