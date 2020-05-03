const User = require('../services/users');

module.exports = function todo(req, res) {
    req.session.views = (req.session.views || 0) + 1;
    res.render('todo', { views: req.session.views, user: req.currentUser });
}