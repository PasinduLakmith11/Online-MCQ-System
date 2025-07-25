# 📝 MCQ Exam System (React + Node.js + MongoDB)

A full-featured, production-ready Multiple Choice Questions (MCQ) Exam System built with the MERN stack (MongoDB, Express, React, Node.js). This system supports user registration, exam attempts, results review, and history tracking — all wrapped in a responsive and modern UI.

---

## 🚀 Features

### ✅ Backend (Node.js + Express + MongoDB)
- MVC Architecture with controllers for `User`, `Exam`, `Question`, and `Result`
- MongoDB models using Mongoose with proper relationships
- Secure user authentication using `bcrypt`
- RESTful API for CRUD operations
- Sample Data Initialization (3 exams + demo user)

### ✅ Frontend (React.js)
- User Interface with login, registration, dashboard, exam interface, and result views
- Responsive design suitable for desktop and mobile
- Timer, question navigation, and real-time result feedback
- View mode: Single-question at once

---

## 🗝️ Key Highlights

- 🔐 Secure login and registration
- 📝 3 Sample Exams (JavaScript, React, Web Development)
- ⏱️ Countdown timer and progress indicators
- 📊 Instant result generation with score and answer review
- 📁 Result history tracking for each user
- 💻 Mobile-first, responsive UI

---

## 🧪 Demo Credentials

Use the following credentials to test the application:
Email: student@gmail.com
Password: password123


---

## 📂 Database Schema

The application uses five main MongoDB collections:

| Collection | Description |
|-----------|-------------|
| **Users** | Stores user credentials and authentication info |
| **Exams** | Metadata about each exam (title, subject) |
| **Questions** | Each exam's questions with options and correct answer |
| **Results** | Exam scores and result summaries |
| **Answers** | Tracks user-selected answers for review |

---

## 📦 Installation & Setup

### 🔧 Backend Setup

```bash
mkdir mcq-backend && cd mcq-backend
npm init -y
npm install express mongoose cors bcrypt
npm install --save-dev nodemon
npm run dev
