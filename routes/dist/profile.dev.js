"use strict";

var _require = require('express'),
    Router = _require.Router;

var upload = require('../middlewares/upload');

var router = new Router();
router.get('/', function profile(req, res) {
  if (req.currentUser) {
    res.render('profile');
  } else {
    res.redirect('/');
  }
});
router.post('/', upload.single('avatar'), function (req, res, next) {
  console.log(req.file);
  res.render('profile');
});
module.exports = router;