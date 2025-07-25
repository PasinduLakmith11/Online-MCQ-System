const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  questionText: { type: String, required: true },
  options: [{
    optionText: String,
    optionKey: String
  }],
  correctOption: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);
