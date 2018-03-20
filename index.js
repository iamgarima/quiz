const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const Router = require('./src/routes');
const userController = require('./src/controllers/userController');
const User = require('./src/models/users');

const app = express();

app.use(bodyParser.json());

const strategy = new LocalStrategy((username, password, done) => {
    User.getUser(username, (err, result) => {
        if(err) {
            done(err, null);
        } else {
            if(result.length === 0) {
                done('Please check if you are signed up!!!');
            } else {
                if(password === result[0].password) {
                    done(null, result[0]);
                } else {
                    done('Incorrect password');
                }
            }
            
        }
    })
})

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.checkUser(id, (err, result) => {
        if(err) {
            done(err, null);
        } else {
            done(null, result[0]);
        }
        return;
    })
});

app.use(session({
    secret: 'never guess',
    save: false,
    saveUninitialized: true
}))

// where to write these - the position with reason
app.use(passport.initialize());
app.use(passport.session());

app.use('/quiz', Router);
app.post('/signup', userController.addUser);
app.post('/login', passport.authenticate('local'), (req, res) => {
    let msg = `Hi, ${req.user.email}`;
    res.send(msg);
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}`))