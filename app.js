const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');


const app = express();
const port = process.env.PORT || 3000;

app.use(cookieSession({
    name: 'session',
    keys: ['123'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded());

app.use(require('./middlewares/auth'));

app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/login', require('./routes/login.route'));
app.get('/logout', require('./routes/logout'));
app.use('/profile', require('./routes/profile'));
app.get('/todo', require('./routes/todo'));

app.get('/testlogin', function(req, res) {
    res.render('testlogin');
})

app.use(express.static('public'));

app.get('/', require('./routes/index'));



app.listen(port, function(req, res) {
    console.log("server action on port: " + port);
});