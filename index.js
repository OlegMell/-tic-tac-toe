const express = require('express');
const path = require('path');
const router = require('./routes/index');
const session = require('express-session');
const { port, host, sessionSecret } = require('./config');
const { app, http } = require('./server-obj');
const roomList = require('./views/helpers/room-list');
const fieldItem = require('./views/helpers/field-item');
const alert = require('./views/helpers/alert');

app.set('view engine', 'hbs');
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true
}));

app.use('/', router);


http.listen(process.env.PORT || port);