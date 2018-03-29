const User = require("../models/users");

const addUser = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.send(400);
        return;
    }

    User.addUser(username, password)
        .then(result => res.send(result))
        .catch(() => {
            res.send(500);
        });
};

module.exports = {
    addUser
};
