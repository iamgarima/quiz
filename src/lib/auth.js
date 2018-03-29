const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/users");

const strategy = new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password"
    },
    (username, password, done) => {
        User.getUserGivenEmail(username).then(result => {
            if (result.length === 0) {
                done("Please check if you are signed up!!!");
            } else if (password === result[0].password) {
                done(null, result[0]);
            } else {
                done("Incorrect password");
            }
        });
    }
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.getUserGivenId(id)
        .then(result => done(null, result[0]))
        .catch(err => done(err, null));
});

module.exports = { strategy };
