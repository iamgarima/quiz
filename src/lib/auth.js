const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/users");
const { hashPassword } = require("../helpers/hashPassword");

const strategy = new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password"
    },
    async (username, password, done) => {
        // can we give async function here
        try {
            const result = await User.getUserGivenEmail(username);
            if (result === undefined) {
                done("Please check if you are signed up!!!");
            } else if (hashPassword(password) === result.password) {
                done(null, result);
            } else {
                done("Incorrect password");
            }
        } catch (err) {
            done("Internal Server Error");
        }
    }
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const result = await User.getUserGivenId(id);
        done(null, result);
    } catch (err) {
        done(err, null); // passing same error to the frontend
    }
});

const ensureAuthenticated = (req, res, next) => {
    if (req.user && req.user.email) {
        next();
    } else {
        res.sendStatus(400);
    }
};

module.exports = { strategy, ensureAuthenticated };
