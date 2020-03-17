const express = require('express');
const game = express.Router();
const { http } = require('../server-obj');
const io = require('socket.io')(http);



game.get('/game', (req, res) => {
    const user = req.session.username;
    if (!user) {
        return res.redirect('/sign-in');
    }

    io.on('connection', socket => {
        socket.emit('message', 'hello!');
    });

    res.render('index', {
        layout: 'layouts/_default',
        username: req.session.username
    })
});


module.exports = game;