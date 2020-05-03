const { Router} = require('express');

const router = new Router();

const User = require('../services/users');

router.get('/',function getLogin(req, res){
    res.render('login');
});

router.post('/',function postLogin(req, res) {
    const user = User.findUserByEmail(req.body.email);
    const checkPassword = User.verifyPassword(req.body.password, user.password);
    if(!user || !checkPassword) return res.render('login');
    
    req.session.userId = user.id;
    res.redirect('/');
});

module.exports = router;