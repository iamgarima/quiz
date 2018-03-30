const User = require("../models/users");

const addUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.sendStatus(400);
        return;
    }

    try {
        const result = await User.addUser(username, password);
        res.send(result);
    } catch (err) {
        res.sendStatus(500);
    }
};

module.exports = {
    addUser
};
