'use strict';

require('dotenv').config();

const { resolve } = require('path');
const express = require('express');
const morgan = require('morgan');
const exphds = require('express-handlebars');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('env', process.env.ENV || 'development');

app.engine('hbs', exphds({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use(morgan());
app.use(express.static(resolve(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.get('/', (req, res) => {
    res.type('text/html');
    res.render('home');
});

app.get('/about', (req, res) => {
    const fortune = [
        'Conquer your fears or they will conquer you',
        'Rivers need springs',
        'Do not fear what you don\'t know',
        'You will have a pleasant surprise',
        'Whenever possible, keep it simple'
    ];

    res.type('text/html');
    res.render('about', {
        fortune: fortune[Math.floor(Math.random() * 10 % fortune.length)],
        pageTestScript: '/qa/tests.about.js'
    });
});

app.get('/tours/hood-river', (req, res) => {
    res.type('text/html');
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', (req, res) => {
    res.type('text/html');
    res.render('tours/request-group-rate');
});

app.use((req, res) => {
    res.type('text/html');
    res.status(404);
    res.render('404');
});

app.use((err, req, res) => {
    console.log(error.stack);

    res.type('text/html');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log(`the application is running at ${app.get('port')}`);
});
