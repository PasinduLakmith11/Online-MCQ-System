import React, { useEffect, useState } from 'react';
import api from '../../api/apiService';
import ExamInterface from '../Exam/ExamInterface';
import ResultView from '../Exam/ResultView';
import '../../App.css';

const Dashboard = ({ user, onLogout, onBackToHome }) => {
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState(null);
  const [examResult, setExamResult] = useState(null);
  const [activeTab, setActiveTab] = useState('exams');
  const [detailedExamAnswers, setDetailedExamAnswers] = useState([]); 

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const [examsData, resultsData] = await Promise.all([
        api.getExams(),
        api.getUserResults(user.id)
      ]);
      setExams(examsData);
      setResults(resultsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartExam = (exam) => {
    setSelectedExam(exam);
    setExamResult(null);
    setDetailedExamAnswers([]); 
  };

  const handleExamComplete = (resultFromServer) => {
    console.log("Exam completed! Result from server (now enriched):", resultFromServer);
    setExamResult(resultFromServer); 
    setSelectedExam(null);
    loadData(); 
  };

  const handleBackToDashboard = () => {
    setSelectedExam(null);
    setExamResult(null);
    setDetailedExamAnswers([]); 
  };

  const handleHome = () => {
    setSelectedExam(null);
    setExamResult(null);
    setDetailedExamAnswers([]);
    setActiveTab('exams');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (selectedExam) {
    return <ExamInterface exam={selectedExam} user={user} onComplete={handleExamComplete} onBack={handleBackToDashboard} />;
  }

  if (examResult) {
    return <ResultView result={examResult} answers={examResult.answers} onBack={handleBackToDashboard} />;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>MCQ Exam System</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button className="home-button" onClick={onBackToHome}>
            Home
          </button>          
          <button onClick={onLogout} className="btn-secondary">Logout</button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button className={`nav-button ${activeTab === 'exams' ? 'active' : ''}`} onClick={() => setActiveTab('exams')}>Available Exams</button>
        <button className={`nav-button ${activeTab === 'results' ? 'active' : ''}`} onClick={() => setActiveTab('results')}>My Results</button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'exams' && (
          <div className="exams-grid">
            <h2>Available Exams</h2>
            {exams.map(exam => (
              <div key={exam._id} className="exam-card">
                <h3>{exam.title}</h3>
                <p>{exam.description}</p>
                <div className="exam-meta">
                  <span>Duration: {exam.duration} minutes</span>
                  <span>Questions: 5</span> 
                </div>
                <button onClick={() => handleStartExam(exam)} className="btn-primary">Start Exam</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'results' && (
          <div className="results-section">
            <h2>My Results</h2>
            {results.length === 0 ? (
              <p className="no-results">No exam results found. Take an exam to see your results here.</p>
            ) : (
              <div className="results-grid">
                {results.map(result => (
                  <div key={result._id} className="result-card">
                    <h3>{result.examId?.title || 'Exam Title Not Available'}</h3>
                    <div className="result-score">
                      <span className="score">{result.score}/{result.totalQuestions}</span>
                      <span className="percentage">{result.percentage}%</span>
                    </div>
                    <p className="result-date">Completed: {new Date(result.completedAt).toLocaleDateString()}</p>
                    <div className={`result-status ${result.percentage >= 70 ? 'passed' : 'failed'}`}>{result.percentage >= 70 ? 'Passed' : 'Failed'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;