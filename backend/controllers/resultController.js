const Result = require('../models/Result');
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const Exam = require('../models/Exam'); 

class ResultController {
  static async submitExam(req, res) {
    try {
      const { userId, examId, answers } = req.body;
      const exam = await Exam.findById(examId);
      if (!exam) return res.status(404).json({ message: 'Exam not found' });

      const questions = await Question.find({ examId });
      if (questions.length === 0) return res.status(400).json({ message: 'No questions found for this exam' });

      let correct = 0;
      const detailedAnswersForResponse = []; 

      for (let ans of answers) {
        const question = questions.find(q => q._id.toString() === ans.questionId);

        if (!question) {
          console.warn(`Question with ID ${ans.questionId} not found for exam ${examId}`);
          continue; 
        }

        const isCorrect = question.correctOption === ans.selectedOption;
        if (isCorrect) correct++;

        
        const answerDetail = {
          questionId: question._id, 
          selectedOption: ans.selectedOption,
          correctOption: question.correctOption, 
          isCorrect
        };
        detailedAnswersForResponse.push({
            ...answerDetail,
            question: question 
        });
      }

      const totalQuestions = questions.length;
      const percentage = Math.round((correct / totalQuestions) * 100);

      const result = new Result({
        userId, examId, score: correct,
        totalQuestions: totalQuestions,
        percentage: percentage,
        completedAt: new Date()
      });

      await result.save();

      await Promise.all(detailedAnswersForResponse.map(ans => {
        return new Answer({
            resultId: result._id,
            questionId: ans.questionId,
            selectedOption: ans.selectedOption,
            correctOption: ans.correctOption,
            isCorrect: ans.isCorrect
        }).save();
      }));

      res.json({
        message: 'Exam submitted successfully',
        result: {
          _id: result._id,
          userId: result.userId,
          examId: result.examId, 
          score: result.score,
          totalQuestions: result.totalQuestions,
          percentage: result.percentage,
          completedAt: result.completedAt,
          exam: exam.toObject(), 
          answers: detailedAnswersForResponse 
        }
      });
    } catch (error) {
      console.error('Error submitting exam:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }


  static async getUserResults(req, res) {
    try {
      const results = await Result.find({ userId: req.params.userId }).populate('examId', 'title description').sort({ completedAt: -1 });
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async getResultDetails(req, res) {
    try {
      const result = await Result.findById(req.params.resultId).populate('examId', 'title description');
      const answers = await Answer.find({ resultId: req.params.resultId })
                                  .populate('questionId', 'questionText options correctOption'); 
      if (!result) return res.status(404).json({ message: 'Result not found' });

      const enrichedAnswers = answers.map(ans => ({
        questionId: ans.questionId._id,
        selectedOption: ans.selectedOption,
        correctOption: ans.correctOption,
        isCorrect: ans.isCorrect,
        question: ans.questionId.toObject() 
      }));

      res.json({
        result: {
            ...result.toObject(),
            exam: result.examId.toObject(), 
            answers: enrichedAnswers 
        },
        answers: enrichedAnswers 
      });
    } catch (error) {
      console.error('Error getting result details:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = ResultController;