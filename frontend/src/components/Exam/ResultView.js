import React from 'react';
import '../../App.css';

const ResultView = ({ result, answers, onBack }) => {
  if (!result) {
    return <div className="loading">Loading result...</div>;
  }

  console.log('ResultView received result:', result); 
  console.log('ResultView received answers:', answers); 

  const exam = result.exam || {}; 
  console.log('ResultView extracted exam:', exam);

  const answerList = Array.isArray(result.answers) ? result.answers : [];
  console.log('ResultView final answerList:', answerList);


  return (
    <div className="result-view">
      <header className="result-header">
        <h2>Exam Result</h2>
        <button onClick={onBack} className="btn-secondary">Back to Dashboard</button>
      </header>

      <div className="result-summary">
        <h3>{exam.title || 'Exam Title Not Available (Still Debugging)'}</h3>
        <p className="result-description">{exam.description || 'No description available (Still Debugging).'}</p>
        <div className="result-details">
          <div className="result-score">
            <strong>Score:</strong> {result.score ?? 'N/A'} / {result.totalQuestions ?? 'N/A'}
          </div>
          <div className="result-percentage">
            <strong>Percentage:</strong> {result.percentage ?? 'N/A'}%
          </div>
          <div className={`result-status ${(result.percentage ?? 0) >= 70 ? 'passed' : 'failed'}`}>
            {(result.percentage ?? 0) >= 70 ? 'Passed' : 'Failed'}
          </div>
          <div className="result-date">
            <strong>Completed on:</strong>{' '}
            {result.completedAt ? new Date(result.completedAt).toLocaleString() : 'Date not available'}
          </div>
        </div>
      </div>

      <div className="result-answers">
        <h4>Question Review</h4>
        {answerList.length === 0 && (
          <div>
            <p>No answers to display.</p>
            <p><em>Debug: The 'answerList' is empty. Ensure backend returns answers.</em></p>
          </div>
        )}
        {answerList.map((answer, index) => {
          const question = answer.question || {};
          console.log(`ResultView - Processing Q${index + 1}:`, { answer, question });

          const options = Array.isArray(question.options) ? question.options : [];

          if (!question.questionText && !question._id) {
            return (
              <div key={answer.questionId || index} className="question-review missing-data">
                <h5>Q{index + 1}: Missing Question Data (Check Backend Response)</h5>
                <p>Selected: {answer.selectedOption || 'None'}</p>
                <p>Correct: {answer.correctOption || 'Unknown'}</p>
                <p className={answer.isCorrect ? 'correct' : 'wrong'}>
                  {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </p>
              </div>
            );
          }

          return (
            <div key={question._id || index} className="question-review">
              <h5>Q{index + 1}: {question.questionText}</h5> 

              {options.length === 0 ? (
                <div className="simple-answer">
                  <p><strong>Your answer:</strong> {answer.selectedOption || 'None'}</p>
                  <p><strong>Correct answer:</strong> {answer.correctOption || 'Unknown'}</p>
                  <p className={answer.isCorrect ? 'correct' : 'wrong'}>
                    {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </p>
                </div>
              ) : (
                <div className="answer-options">
                  {options.map((option) => {
                    const isSelected = answer.selectedOption === option.optionKey;
                    const isCorrect = answer.correctOption === option.optionKey; 
                    const isWrong = isSelected && !isCorrect;

                    return (
                      <div
                        key={option.optionKey}
                        className={`option-result ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''} ${isSelected ? 'selected' : ''}`}
                      >
                        <span className="option-key">{option.optionKey}.</span>
                        <span className="option-text">{option.optionText}</span>
                        {isSelected && <span className="selection-indicator">← Your answer</span>}
                        {isCorrect && <span className="correct-indicator">✓</span>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultView;