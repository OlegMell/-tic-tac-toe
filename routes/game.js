const express = require('express');
const game = express.Router();
const { ticTacToe } = require('../services/tic-tac-toe');
// const {http} = require('../server-obj');
// const io = require('socket.io')(http);
const joinRoom = require('./join-room');

console.log(ticTacToe);
ticTacToe.startConnection();

game.get('/game', (req, res) => {
    const user = req.session.username;
    if (!user) {
        return res.redirect('/sign-in');
    }

    let { currentRoom } = req.session;
    if(!currentRoom) currentRoom = {};

    res.render('index', {
        layout: 'layouts/_default',
        username: req.session.username,
        rooms: ticTacToe.rooms,
        field: currentRoom.field,
        state: ''
    })
});

game.use('/game', joinRoom);

module.exports = game;