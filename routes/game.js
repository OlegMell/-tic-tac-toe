const express = require('express');
const game = express.Router();
// const { ticTacToe } = require('../services/tic-tac-toe');
const {http} = require('../server-obj');
const io = require('socket.io')(http);
const joinRoom = require('./join-room');

let rooms = [];

io.on('connection', socket => {
    socket.on('join room', data => {
        const { room } = data;
        let findRoom = rooms.find(r => r.name === room);
        if (findRoom && findRoom.players < 2) {
            rooms = rooms.map(r => {
                if (r.name === findRoom.name) {
                    r.players += 1;
                }
                return r;
            })
        } else {
            rooms.push({ name: room, players: 1 })
        }
        io.emit('update rooms', rooms);
    });
});

game.get('/game', (req, res) => {
    const user = req.session.username;
    if (!user) {
        return res.redirect('/sign-in');
    }
    const { room } = req.session;

    res.render('index', {
        layout: 'layouts/_default',
        username: req.session.username,
        rooms: rooms
    })
});

game.use('/game', joinRoom);

module.exports = game;