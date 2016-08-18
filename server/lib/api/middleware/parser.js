'use strict';

const
  path    = require('path'),
  koaBody = require('koa-body');

/**
 * Adds body parsing support for JSON & multipart/form-data.
 */
function init(app) {

  // The "uploads" folder maps to the root of the
  // project and is excluded by .gitignore

  let uploadsFolder = path.join(__dirname, '../../../uploads');

  // Enable koa-body parser
  app.use(koaBody({
    multipart: true,
    formidable: {
      uploadDir: uploadsFolder,
      keepExtensions: true
    }
  }));
}

module.exports = init;
