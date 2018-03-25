const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const path = require("path");

const Router = require("./src/routes")(express.Router());
const userController = require("./src/controllers/userControllerP");
const User = require("./src/models/usersP");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "dist")));

const strategy = new LocalStrategy((username, password, done) => {
    User.getUserGivenEmail(username).then(result => {
        if (result.length === 0) {
            done("Please check if you are signed up!!!");
        } else if (password === result[0].password) {
                done(null, result[0]);
            } else {
                done("Incorrect password");
            }
    });
});

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.getUserGivenId(id)
        .then(result => done(null, result[0]))
        .catch(err => done(err, null));
});

app.use(
    session({
        secret: "never guess",
        save: false,
        saveUninitialized: true
    })
);

// where to write these - the position with reason
app.use(passport.initialize());
app.use(passport.session());

app.use("/quiz", Router);
app.post("/signup", userController.addUser);
app.post("/login", passport.authenticate("local"), (req, res) => {
    res.send(true);
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}`));
