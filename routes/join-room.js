const express = require('express');
const joinRoom = express.Router();

joinRoom.post('/join-room', (req, res) => {
    req.session.room = req.body.room;
    res.send();
});

module.exports = joinRoom;