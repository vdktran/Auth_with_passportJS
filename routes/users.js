var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/isconnected', loggedIn, function(req, res, next) {
  console.log(req.session.user.username);
  res.send('user is connected');
});

function loggedIn(req, res, next) {
  if (req.session.user !==undefined) {
      next();
  } else {
      res.send('user is not connected');
      res.redirect('/login');
  }
}

module.exports = router;
