const express = require('express');
const router = express.Router();
const qnaController = require('../controllers/qnaControllerP');
const userController = require('../controllers/userControllerP');

router.post('/questions', qnaController.getQuestions);
router.post('/solutions', qnaController.getAnswers);

module.exports = router;