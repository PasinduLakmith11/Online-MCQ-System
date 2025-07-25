import React, { useEffect, useState } from 'react';
import api from '../../api/apiService';
import '../../App.css';

const ExamInterface = ({ exam, user, onComplete, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);

  useEffect(() => {
    loadQuestions();
  }, [exam._id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmit(); 
    }
  }, [timeLeft]);

  const loadQuestions = async () => {
    try {
      const questionsData = await api.getQuestions(exam._id);
      setQuestions(questionsData);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOption
      }));
      const result = await api.submitExam(user.id, exam._id, formattedAnswers);
      onComplete(result.result);
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Error submitting exam. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getAnsweredCount = () => Object.keys(answers).length;

  if (loading) return <div className="loading">Loading exam questions...</div>;

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return <div className="loading">Question not available.</div>;

  return (
    <div className="exam-interface">
      <header className="exam-header">
        <div className="exam-info">
          <h2>{exam.title}</h2>
          <p>{exam.description}</p>
        </div>
        <div className="exam-controls">
          <div className="timer">
            <span className={timeLeft < 300 ? 'timer-warning' : ''}>
              Time Left: {formatTime(timeLeft)}
            </span>
          </div>
          <div className="progress">{getAnsweredCount()}/{questions.length} answered</div>
          <button onClick={onBack} className="btn-secondary">Back</button>
        </div>
      </header>

      <div className="exam-content">
        <div className="single-question-view">
          <div className="question-navigation">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <div className="nav-buttons">
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                disabled={currentQuestionIndex === 0}
                className="btn-secondary"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                disabled={currentQuestionIndex === questions.length - 1}
                className="btn-secondary"
              >
                Next
              </button>
            </div>
          </div>

          <div className="question-card">
            <h3>{currentQuestion.questionText}</h3>
            <div className="options">
              {(currentQuestion.options || []).map(option => (
                <label key={option.optionKey} className="option-label">
                  <input
                    type="radio"
                    name={`question-${currentQuestion._id}`}
                    value={option.optionKey}
                    checked={answers[currentQuestion._id] === option.optionKey}
                    onChange={() => handleAnswerSelect(currentQuestion._id, option.optionKey)}
                  />
                  <span className="option-text">{option.optionKey}. {option.optionText}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="question-grid">
            {questions.map((_, index) => (
              <button
                key={index}
                className={`question-number ${index === currentQuestionIndex ? 'current' : ''} ${answers[questions[index]._id] ? 'answered' : ''}`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="submit-section">
          <div className="submit-info">
            <p>Make sure you have answered all questions before submitting.</p>
            <p>Answered: {getAnsweredCount()} out of {questions.length} questions</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting || getAnsweredCount() === 0}
            className="btn-primary submit-btn"
          >
            {submitting ? 'Submitting...' : 'Submit Exam'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamInterface;
