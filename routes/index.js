const router = require('express').Router();
const signIn = require('./sign-in');
const exit = require('./exit');
const game = require('./game');

router.get('/', (req, res) => {
    console.log('index');
    const user = req.session.username;
    console.log(user);
    if(!user){
        return res.redirect('/sign-in');
    }

    res.redirect('/game');
});

router.use('/', signIn);
router.use('/', game);
router.use('/', exit);


module.exports = router;