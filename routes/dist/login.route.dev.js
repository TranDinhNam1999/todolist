"use strict";

var _require = require('express'),
    Router = _require.Router;

var router = new Router();

var User = require('../services/users');

router.get('/', function getLogin(req, res) {
  res.render('login');
});
router.post('/', function postLogin(req, res) {
  var user = User.findUserByEmail(req.body.email);
  var checkPassword = User.verifyPassword(req.body.password, user.password);
  if (!user || !checkPassword) return res.render('login');
  req.session.userId = user.id;
  res.redirect('/');
});
module.exports = router;