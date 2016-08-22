'use strict';

const
  thinky = require('../../db/thinky'),
  helper = require('./helper'),
  type = thinky.type,
  r = thinky.r;


const Run = thinky.createModel('Run', {
  id: type.string().default(r.uuid),
  created_at: type.date().default(helper.now)
});

module.exports = Run;
