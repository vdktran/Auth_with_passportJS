var User = require('./models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use( new LocalStrategy(
        function (username, password, done) {
            console.log('passé 1');
            User.getUserByUsername(username, function (err, user) {
                if (err) throw err;
                if (!user) {
                    return done(null, false, { message: 'Unknown User' });
                }
                User.comparePassword(password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Invalid password' });
                    }
                });
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.getUserById(id, function (err, user) {
            done(err, user);
        });
    });


    var FacebookStrategy = require('passport-facebook').Strategy;

    passport.use('facebook', new FacebookStrategy({
        clientID: "xxxxxxxxxxxx",
        clientSecret: "xxxxxxxxxxxxx",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                if (err) return done(err);
                if (user) return done(null, user);
                else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.name = profile.displayName;
                    if (typeof profile.emails != 'undefined' && profile.emails.length > 0)
                        newUser.facebook.email = profile.emails[0].value;

                    // save our user to the database
                    newUser.save(function (err) {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        }));
}