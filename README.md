# 🎓 Online MCQ System - Full Stack Project

A comprehensive web-based Multiple Choice Question (MCQ) examination system built with modern web technologies.

## 🚀 Tech Stack

### Backend (Node.js + Express + MongoDB)
- **MVC Architecture** with separate Controllers for User, Exam, Question, and Result management
- **MongoDB Models** using Mongoose with proper relationships
- **bcrypt Authentication** for secure password hashing
- **RESTful API endpoints** for all operations
- **Sample Data Initialization** with 3 exams and demo user account

### Frontend (React.js)
- **Complete User Interface** with authentication, dashboard, exam interface, and results
- **Responsive Design** that works on all devices
- **Interactive Features** like timer, question navigation, and real-time feedback
- **Viewing Modes** - single question at once

## ✨ Key Features Implemented

✅ **User Registration/Login** with bcrypt password security  
✅ **3 Sample Exams** (JavaScript, React, Web Development) with 5 questions each  
✅ **Interactive Exam Interface** with timer and navigation  
✅ **Real-time Results** with score calculation and answer review  
✅ **Result History** tracking for each user  
✅ **Responsive Design** for mobile and desktop  

## 🔑 Demo Credentials

```
Email: student@gmail.com
Password: password123
```

## 📦 Installation & Setup

### ⚙️ Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PasinduLakmith11/Online-MCQ-System.git
   cd backend
   npm install
   ```

2. **Create environment file:**
   Create a `.env` file in the root folder with:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ```

3. **Start the server:**
   ```bash
   npm run dev
   ```
   *This will auto-initialize sample data if collections are empty.*

### 🎨 Frontend Setup

1. **Set up React application:**
   ```bash
   npx create-react-app frontend
   cd frontend
   npm start
   ```

### 📋 Prerequisites

- Node.js installed
- MongoDB running on `localhost:27017`
- Both servers running (Backend: `5000`, Frontend: `3000`)

## 📊 Database Schema

The system uses **5 MongoDB collections:**

| Collection | Description |
|------------|-------------|
| **Users** | Authentication and user data |
| **Exams** | Exam information |
| **Questions** | MCQ questions with options |
| **Results** | Exam scores and completion data |
| **Answers** | Individual answer tracking |

## 🎨 UI/UX Features

- 🎯 **Modern, clean design** with gradient backgrounds
- 📱 **Card-based layout** for exams and results
- ⏰ **Interactive timer** with warnings
- 📊 **Progress indicators** and visual feedback
- 📱 **Mobile-responsive design**

```
```
## 🚦 Getting Started

1. **Clone the repository**
2. **Set up MongoDB** connection
3. **Install dependencies** for both backend and frontend
4. **Configure environment variables**
5. **Start both servers**
6. **Access the application** at `http://localhost:3000`

## 🎯 Usage

1. **Register/Login** using the demo credentials or create a new account
2. **Browse available exams** from the dashboard
3. **Take exams** with interactive timer and navigation
4. **View results** with detailed answer review
5. **Track progress** through result history

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Pasindu Lakmith**
- GitHub: [@PasinduLakmith11](https://github.com/PasinduLakmith11)
