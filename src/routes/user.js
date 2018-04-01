const { ensureAuthenticated } = require("../lib/auth");

module.exports = router => {
    router.get("/", ensureAuthenticated, (req, res) => {
        res.send("true");
    });
};
