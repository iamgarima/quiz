const qnaController = require("../controllers/qnaController");

module.exports = router => {
    router.post("/questions", qnaController.getQuestions);
    router.post("/solutions", qnaController.getAnswers);
};
