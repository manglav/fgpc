'use strict';

const
  thinky = require('../../db/thinky'),
  helper = require('./helper'),
  type = thinky.type,
  r = thinky.r;


const Product = thinky.createModel('Product', {
  id: type.string().default(r.uuid),
  vendorName: type.string().required(),
  productName: type.string().required(),
  productUrl: type.string().required(),
  productSku: type.string().required(),
  productAvailability: type.string(),
  productPrice: type.number(),
  productAddToCart: type.string(),
  productOverview: type.string(),
  productUPC: type.string(),
  productSpecs: type.string(),
  boxWeight: type.number(),
  boxUnit: type.string(),
  boxDimension: type.string(),
  inBox: type.string(),

  created_at: type.date().default(helper.now)
});

Product.ensureIndex('vendorName');
Product.ensureIndex('productName');
Product.ensureIndex('productSku');
Product.ensureIndex('created_at');


module.exports = Product;
