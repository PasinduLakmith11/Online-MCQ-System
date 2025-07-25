const express = require('express');
const router = express.Router();
const ResultController = require('../controllers/resultController');

router.post('/submit', ResultController.submitExam);
router.get('/user/:userId', ResultController.getUserResults);
router.get('/:resultId/details', ResultController.getResultDetails);

module.exports = router;
