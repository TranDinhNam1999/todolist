"use strict";

var multer = require('multer');

var path = require('path');

var upload = multer({
  dest: path.join(__dirname, '..', 'uploads')
});
module.exports = upload;