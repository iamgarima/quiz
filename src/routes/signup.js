const userController = require("../controllers/userController");

module.exports = router => {
    router.post("/", userController.addUser);
};
