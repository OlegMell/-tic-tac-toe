const express = require('express');
const game = express.Router();


game.get('/game', (req, res) => {
    const user = req.session.username;
    if (!user) {
        return res.redirect('/sign-in');
    }
    res.render('index', {
        layout: 'layouts/_default',
        username: req.session.username
    })
});


module.exports = game;