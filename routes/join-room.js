const express = require('express');
const joinRoom = express.Router();
const { ticTacToe } = require('../services/tic-tac-toe');



joinRoom.post('/join-room', (req, res) => {
    const { room } = req.body;
    const findRoom = ticTacToe.rooms.find(r => r.name === room);
    req.session.currentRoom = findRoom;
    res.send(findRoom);
});

module.exports = joinRoom;