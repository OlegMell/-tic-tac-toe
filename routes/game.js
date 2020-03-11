const express = require('express');
const game = express.Router();


game.get('/game', (req, res) =>{
   res.render('index', {
       layout: 'layouts/_default',
       username: req.session.username
   })
});

module.exports = game;