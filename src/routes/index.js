const express = require('express');
const router = express.Router();
const qnaController = require('../controllers/qnaController');
const userController = require('../controllers/userController');

router.get('/questions', qnaController.getQuestions);
router.get('/solutions', qnaController.getAnswers);

module.exports = router;