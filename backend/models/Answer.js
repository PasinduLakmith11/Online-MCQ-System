const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  resultId: { type: mongoose.Schema.Types.ObjectId, ref: 'Result', required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  selectedOption: { type: String, required: true },
  correctOption: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

module.exports = mongoose.model('Answer', AnswerSchema);
