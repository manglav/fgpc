'use strict';

const
  expect = require('chai').expect,
  harness = require('../helpers/harness'),
  models = require('../../lib/api/models'),
  product = require('./product');

describe('POST Parsehub WebHook', () => {
  harness.suite();

  it('when no products, returns 200', function* () {
    let res = yield this.harness.api()
      .post('/v1/parsehub/webhook')
      .send()
      .end();

    expect(res.status).to.equal(200);
  });

  it('when products, returns 200 and save to db', function* () {
    let res = yield this.harness.api()
      .post('/v1/parsehub/webhook')
      .send({ products: [product] })
      .end();

    expect(res.status).to.equal(200);

    let products = yield models.Product.run();
    expect(products.length).to.equal(1);

    expect(products[0].vendorName).to.equal(product.vendorName);
    expect(products[0].productName).to.equal(product.productName);
  });
});
