const passport = require("passport");

module.exports = router => {
    router.post("/", passport.authenticate("local"), (req, res) => {
        res.send(true);
    });
};
