import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

const HomePage = ({ onGetStarted }) => {
  return (
    <div className="homepage">
      <div className="homepage-container">
        <header className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Online MCQ Exam System
            </h1>
            <p className="hero-subtitle">
              Test your knowledge with our comprehensive multiple-choice question system
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">📚</span>
                <span>Multiple Exam Categories</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⏱️</span>
                <span>Timed Assessments</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Instant Results</span>
              </div>
            </div>
            <button onClick={onGetStarted} className="get-started-btn">
              Get Started
            </button>
          </div>
        </header>

        <section className="features-section">
          <div className="features-container">
            <h2>Why Choose Our MCQ System?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-large">🎯</div>
                <h3>Accurate Assessment</h3>
                <p>Comprehensive questions designed to test your knowledge effectively</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-large">🚀</div>
                <h3>Easy to Use</h3>
                <p>Intuitive interface that makes taking exams simple and straightforward</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-large">📈</div>
                <h3>Track Progress</h3>
                <p>Monitor your performance and improvement over time</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-large">🏆</div>
                <h3>Instant Results</h3>
                <p>Get immediate feedback with detailed answer explanations</p>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">3+</div>
              <div className="stat-label">Exam Categories</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Practice Questions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Free to Use</div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Test Your Skills?</h2>
            <p>Join thousands of students who have improved their knowledge with our platform</p>
            <button onClick={onGetStarted} className="cta-button">
              Start Your First Exam
            </button>
          </div>
        </section>

        <footer className="homepage-footer">
          <div className="footer-content">
            <p>&copy; 2025 Online MCQ Exam System. Built for learning excellence.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};
  const handleGetStarted = () => {
    setShowAuth(true);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setShowRegister(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowAuth(false);
    setShowRegister(false);
  };

  const handleBackToHome = () => {
    setShowAuth(false);
    setShowRegister(false);
  };

  if (!showAuth && !user) {
    return <HomePage onGetStarted={handleGetStarted} />;
  }

  if (!user) {
    return showRegister ? (
      <Register
        onRegister={handleRegister}
        onSwitchToLogin={() => setShowRegister(false)}
        onBackToHome={handleBackToHome}
      />
    ) : (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setShowRegister(true)}
        onBackToHome={handleBackToHome}
      />
    );
  }

  return <Dashboard 
  user={user} onLogout={handleLogout}
  onBackToHome={handleBackToHome} />;
}

export default App;
