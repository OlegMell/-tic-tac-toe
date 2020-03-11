const express = require('express');
const exit = express.Router();

exit.post('/exit', (req, res) => {
    req.session.destroy();
    return res.redirect('/sign-in');
});

module.exports = exit;