const User = require("../models/users");

exports.addUser = (req, res) => {
    User.addUser(req.body.username, req.body.password, (err, result) => {
        // eslint-disable-line no-unused-vars

        if (err) {
            res.send(err);
        }
        res.send("You are signed up!!!");
    });
};

exports.checkUser = (req, res) => {
    User.getUser(req.body.username, (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result.length === 0) {
            res.send("Please check if you are signed up!!!");
        } else if (result[0].password === req.body.password) {
            res.send("You are logged in!!!");
        } else {
            res.send("Incorrect password!!!");
        }
    });
};
