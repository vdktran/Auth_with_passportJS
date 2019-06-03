var express = require('express');
var User = require('../models/user');
var router = express.Router();


router.post('/', function(req, res) {
    console.log('post console.log');
    var password = req.body.password;
    var password2 = req.body.password2;

    // password confirmation
    if (password == password2) {
        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        User.createUser(newUser, function(err, user) {
            if (err) throw err;
            res.send(user).end()
        });
    } else {
        res.status(500).send("{errors: \"Passwords don't match\"}").end()
    }
});

module.exports = router;