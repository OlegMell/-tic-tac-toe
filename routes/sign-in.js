const express = require('express');
const signIn = express.Router();


signIn.get('/sign-in', (req, res) => {
    res.render('sign-in', {
        layout: 'layouts/_default'
    })
});

signIn.post('/sign-in', (req, res) => {
    const { username } = req.body;
    if(!username){
        return res.send('wrong username');
    }
    req.session.username = username;
    res.redirect('/game');
});

module.exports = signIn;
