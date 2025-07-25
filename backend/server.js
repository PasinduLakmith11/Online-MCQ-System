const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const initializeSampleData = require('./utils/sampleData');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/exams', require('./routes/examRoutes'));
app.use('/api/exams', require('./routes/questionRoutes'));
app.use('/api/results', require('./routes/resultRoutes'));

setTimeout(initializeSampleData, 2000);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
