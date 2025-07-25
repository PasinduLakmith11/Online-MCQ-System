const Exam = require('../models/Exam');

class ExamController {
  static async getAllExams(req, res) {
    try {
      const exams = await Exam.find().sort({ createdAt: -1 });
      res.json(exams);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async getExamById(req, res) {
    try {
      const exam = await Exam.findById(req.params.id);
      if (!exam) return res.status(404).json({ message: 'Exam not found' });
      res.json(exam);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = ExamController;
