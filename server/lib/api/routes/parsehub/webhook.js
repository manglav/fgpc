'use strict';

const
  _ = require('lodash'),
  models = require('../../models');

function* webhook() {
  let data = this.request.body;

  if (data.products && _.isArray(data.products)) {
    for (let item of data.products) {
      let product = new models.Product(item);
      yield product.save();
    }
  }

  this.status = 200;
  this.body = { ok: true };
}

module.exports = webhook;
