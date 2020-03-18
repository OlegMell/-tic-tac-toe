const express = require('express');
const game = express.Router();
const { ticTacToe } = require('../services/tic-tac-toe');
const joinRoom = require('./join-room');

console.log(ticTacToe);
ticTacToe.startConnection();

game.get('/game', (req, res) => {
    const user = req.session.username;
    if (!user) {
        return res.redirect('/sign-in');
    }

    let { currentRoom } = req.session;
    let state;
    let field;
    if(!currentRoom) {
        state = 'not set';
        field = [];
    } else if(currentRoom.players < 2) {
        state = 'wait';
        field = currentRoom.field;
    } else {
        state = 'started';
        field = currentRoom.field;
    }

    console.log(state);
    res.render('index', {
        layout: 'layouts/_default',
        username: req.session.username,
        rooms: ticTacToe.rooms,
        field,
        state
    })
});

game.use('/game', joinRoom);

module.exports = game;