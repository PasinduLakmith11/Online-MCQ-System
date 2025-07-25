const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  register: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return response.json();
  },

  getExams: async () => {
    const response = await fetch(`${API_BASE_URL}/exams`);
    return response.json();
  },

  getExamById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/exams/${id}`);
    return response.json();
  },

  getQuestions: async (examId) => {
    const response = await fetch(`${API_BASE_URL}/exams/${examId}/questions`);
    return response.json();
  },

  submitExam: async (userId, examId, answers) => {
    const response = await fetch(`${API_BASE_URL}/results/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, examId, answers })
    });
    return response.json();
  },

  getUserResults: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/results/user/${userId}`);
    return response.json();
  },

  getResultDetails: async (resultId) => {
    const response = await fetch(`${API_BASE_URL}/results/${resultId}/details`);
    return response.json();
  }
};

export default api;
