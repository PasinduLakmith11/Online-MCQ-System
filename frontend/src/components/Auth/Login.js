import React, { useState } from 'react';
import api from '../../api/apiService';
import '../../App.css';

const Login = ({ onLogin, onSwitchToRegister, onBackToHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await api.login(email, password);
      if (result.user) {
        onLogin(result.user);
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="navbar-logo">MCQ System</h1>
        </div>
        <div className="navbar-right">
          <button className="home-button" onClick={onBackToHome}>
            Home
          </button>
        </div>
      </nav>

      {/* Login Form */}
      <div className="auth-container">
        <div className="auth-form">
          <h2>Login to MCQ System</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="auth-switch">
            Don't have an account?{' '}
            <button type="button" onClick={onSwitchToRegister} className="link-button">
              Register here
            </button>
          </p>
          <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: studentone@gmail.com</p>
            <p>Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
