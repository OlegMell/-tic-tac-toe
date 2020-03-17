const express = require('express');
const game = express.Router();
// const { ticTacToe } = require('../services/tic-tac-toe');
const {http} = require('../server-obj');
const io = require('socket.io')(http);

let rooms = [], sockets = [];

game.get('/game', (req, res) => {
    const user = req.session.username;
    if (!user) {
        return res.redirect('/sign-in');
    }

    // ticTacToe.startConnection();

    io.on('connection', socket => {
        sockets.push(socket);
        sockets.forEach(sock => {
            console.log('ID:', sock.id);
        });
        console.log('\n');
        socket.on('join room', data => {
            const {room} = data;
            console.log(socket.id);
            // console.log('before', this.rooms);
            let findRoom = rooms.find(r => r.name === room);
            if (findRoom && findRoom.players < 2) {
                rooms = rooms.map(r => {
                    if (r.name === findRoom.name) {
                        r.players += 1;
                    }
                    return r;
                })
            } else {
                rooms.push({name: room, players: 1})
            }

            socket.broadcast.emit('update rooms', rooms);
        });
    });

    res.render('index', {
        layout: 'layouts/_default',
        username: req.session.username,
        rooms: rooms
    })
});


module.exports = game;