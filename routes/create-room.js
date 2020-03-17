const express = require('express');
const createRoom = express.Router();

createRoom.post('/create-room', (req, res) => {
    const { title } = req.body;

    return res.send('ok');
});

module.exports = createRoom;