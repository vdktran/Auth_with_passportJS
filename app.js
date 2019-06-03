var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');

mongoose.connect('mongodb://localhost/loginapp', {useNewUrlParser:true});
var db = mongoose.connection;
require('./passport')(passport);


// login & logout
var indexRouter = require('./routes/index');

// To verify if users is logged in
var usersRouter = require('./routes/users');

// Registration
var registerRouter = require('./routes/register');


var app = express();

// BodyParser Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);




app.listen();

module.exports = app;