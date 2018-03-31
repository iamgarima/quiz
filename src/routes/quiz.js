const qnaController = require("../controllers/qnaController");
const { ensureAuthenticated } = require("../lib/auth");

module.exports = router => {
    router.get("/", (req, res) => {
        res.redirect("/");
    });
    router.post("/questions", ensureAuthenticated, qnaController.getQuestions);
    router.post("/solutions", ensureAuthenticated, qnaController.getAnswers);
};
