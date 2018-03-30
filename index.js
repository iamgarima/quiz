const path = require("path");
const express = require("express");
const session = require("express-session");
const enrouten = require("express-enrouten");
const bodyParser = require("body-parser");
const passport = require("passport");

const { strategy } = require("./src/lib/auth");

passport.use(strategy);

const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(enrouten({ directory: path.join(__dirname, "src/routes") }));
app.use(
    session({
        secret: "never guess",
        resave: true,
        saveUninitialized: true
    })
);
app.use(passport.session());
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
