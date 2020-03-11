const router = require('express').Router();
const signIn = require('./sign-in');
const game = require('./game');

router.get('/', (req, res) => {
    const user = req.session.user;
    if(!user){
        return res.redirect('/sign-in');
    }
    res.redirect('/game');
});

router.use('/', signIn);
router.use('/', game);


module.exports = router;