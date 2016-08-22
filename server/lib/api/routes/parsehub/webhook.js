'use strict';

const
  _ = require('lodash'),
  parse = require('../../util/parsehub'),
  models = require('../../models'),
  r = models.r;

function* webhook() {
  let data = this.request.body || {};

  // Saves run data.
  let run = new models.Run(data);
  yield run.save();

  // Check if the run finished
  if (data.data_ready) {
    let runData = yield parse.getRunData(data.run_token);

    if (runData.products && _.isArray(runData.products)) {
      for (let item of runData.products) {
        let product = yield getProduct(item.productSku);
        if (product) {
          yield updateProduct(product, item);
        }
        else {
          yield createProduct(item);
        }
      }
    }
  }

  this.status = 200;
  this.body = { ok: true };
}

function* getProduct(productSku) {
  let products = yield r.table('Product')
    .getAll(productSku || '', { index: 'productSku' })
    .run();

  return products.length ? new models.Product(products[0]) : null;
}

function* createProduct(item) {
  let product = new models.Product(item);
  yield product.save();
}

function* updateProduct(product, item) {
  product.setSaved();

  _.assign(product, item);

  yield product.save();
}

module.exports = webhook;
