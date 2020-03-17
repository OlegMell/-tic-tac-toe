const express = require('express');
const game = express.Router();
const createRoom = require('./create-room');
const { ticTacToe } = require('../services/tic-tac-toe');

game.get('/game', (req, res) => {
    const user = req.session.username;
    if (!user) {
        return res.redirect('/sign-in');
    }

    ticTacToe.startConnection();

    res.render('index', {
        layout: 'layouts/_default',
        username: req.session.username
    })
});

game.use('/game', createRoom);

module.exports = game;