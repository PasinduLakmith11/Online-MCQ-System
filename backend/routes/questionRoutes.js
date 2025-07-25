const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/questionController');

router.get('/:examId/questions', QuestionController.getQuestionsByExamId);
router.get('/:examId/questions/all', QuestionController.getAllQuestionsByExamId);

module.exports = router;
