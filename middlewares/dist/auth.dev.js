"use strict";

var User = require('../services/users');

module.exports = function auth(req, res, next) {
  var userId = req.session.userId;
  res.locals.currentUser = null;

  if (!userId) {
    return next();
  }

  var user = User.findUserById(userId);

  if (!user) {
    return next();
  }

  req.currentUser = user;
  res.locals.currentUser = user;
  next();
};