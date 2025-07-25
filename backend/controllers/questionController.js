const Question = require('../models/Question');

class QuestionController {
  static async getQuestionsByExamId(req, res) {
    try {
      
      const questions = await Question.find({ examId: req.params.examId }).select('-correctOption');
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async getAllQuestionsByExamId(req, res) {
    try {
      
      const questions = await Question.find({ examId: req.params.examId });
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = QuestionController;