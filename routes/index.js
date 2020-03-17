const router = require('express').Router();
const signIn = require('./sign-in');
const exit = require('./exit');
const game = require('./game');

router.get('/', (req, res) => {
    const user = req.session.username;
    if(!user){
        return res.redirect('/sign-in');
    }

    res.redirect('/game');
});

router.use('/', signIn);
router.use('/', game);
router.use('/', exit);


module.exports = router;