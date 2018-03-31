const passport = require("passport");

module.exports = router => {
    // router.get("/", (req, res) => {});

    router.post("/", passport.authenticate("local"), (req, res) => {
        res.send(true);
    });
};
