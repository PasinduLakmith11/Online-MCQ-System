const express = require('express');
const router = express.Router();
const ExamController = require('../controllers/examController');

router.get('/', ExamController.getAllExams);
router.get('/:id', ExamController.getExamById);

module.exports = router;
