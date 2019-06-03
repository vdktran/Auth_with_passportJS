var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Endpoint to login
router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        req.session.user = req.user;
        res.send(req.user);
    }
);

// Endpoint to get current user
router.get('/user', function(req, res) {
    console.log("hello");
    res.send(req.session);
})


// Endpoint to logout
router.get('/logout', function(req, res) {
    req.logout();
    res.send(null)
});

router.get('/auth/facebook',
    passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

module.exports = router;
