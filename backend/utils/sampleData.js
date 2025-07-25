const bcrypt = require('bcrypt');
const User = require('../models/User');
const Exam = require('../models/Exam');
const Question = require('../models/Question');

async function initializeSampleData() {
  try {
    const userCount = await User.countDocuments();
    const examCount = await Exam.countDocuments();
    const questionCount = await Question.countDocuments();

    // If all collections already contain data, skip initialization
    if (userCount > 0 || examCount > 0 || questionCount > 0) {
      console.log('Sample data already exists. Skipping initialization.');
      return;
    }

    console.log('Initializing sample data...');

    const hashedPassword = await bcrypt.hash('password123', 10);
    const sampleUser = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: hashedPassword
    });
    await sampleUser.save();

    const exam1 = new Exam({ title: 'JavaScript Fundamentals', description: 'Test your knowledge of JavaScript basics' });
    const exam2 = new Exam({ title: 'React Concepts', description: 'Evaluate your understanding of React framework' });
    const exam3 = new Exam({ title: 'Web Development', description: 'General web development knowledge test' });

    await Promise.all([exam1.save(), exam2.save(), exam3.save()]);

    const jsQuestions = [
      {
        examId: exam1._id,
        questionText: 'What is the correct way to declare a variable in JavaScript?',
        options: [
          { optionText: 'var myVar = 5;', optionKey: 'A' },
          { optionText: 'variable myVar = 5;', optionKey: 'B' },
          { optionText: 'v myVar = 5;', optionKey: 'C' },
          { optionText: 'declare myVar = 5;', optionKey: 'D' }
        ],
        correctOption: 'A'
      },
      {
        examId: exam1._id,
        questionText: 'Which method is used to add an element to the end of an array?',
        options: [
          { optionText: 'append()', optionKey: 'A' },
          { optionText: 'push()', optionKey: 'B' },
          { optionText: 'add()', optionKey: 'C' },
          { optionText: 'insert()', optionKey: 'D' }
        ],
        correctOption: 'B'
      },
      {
        examId: exam1._id,
        questionText: 'What does "typeof null" return in JavaScript?',
        options: [
          { optionText: 'null', optionKey: 'A' },
          { optionText: 'undefined', optionKey: 'B' },
          { optionText: 'object', optionKey: 'C' },
          { optionText: 'string', optionKey: 'D' }
        ],
        correctOption: 'C'
      },
      {
        examId: exam1._id,
        questionText: 'Which keyword is used to define a constant in JavaScript?',
        options: [
          { optionText: 'const', optionKey: 'A' },
          { optionText: 'var', optionKey: 'B' },
          { optionText: 'let', optionKey: 'C' },
          { optionText: 'define', optionKey: 'D' }
        ],
        correctOption: 'A'
      },
      {
        examId: exam1._id,
        questionText: 'Which of the following is a JavaScript data type?',
        options: [
          { optionText: 'Number', optionKey: 'A' },
          { optionText: 'Decimal', optionKey: 'B' },
          { optionText: 'Float', optionKey: 'C' },
          { optionText: 'Character', optionKey: 'D' }
        ],
        correctOption: 'A'
      }
    ];

    const reactQuestions = [
      {
        examId: exam2._id,
        questionText: 'What is JSX in React?',
        options: [
          { optionText: 'A JavaScript library', optionKey: 'A' },
          { optionText: 'A syntax extension for JavaScript', optionKey: 'B' },
          { optionText: 'A CSS framework', optionKey: 'C' },
          { optionText: 'A database', optionKey: 'D' }
        ],
        correctOption: 'B'
      },
      {
        examId: exam2._id,
        questionText: 'Which hook is used to manage state in functional components?',
        options: [
          { optionText: 'useEffect', optionKey: 'A' },
          { optionText: 'useState', optionKey: 'B' },
          { optionText: 'useContext', optionKey: 'C' },
          { optionText: 'useReducer', optionKey: 'D' }
        ],
        correctOption: 'B'
      },
      {
        examId: exam2._id,
        questionText: 'What does the useEffect hook do?',
        options: [
          { optionText: 'Fetches data only', optionKey: 'A' },
          { optionText: 'Performs side effects in function components', optionKey: 'B' },
          { optionText: 'Renders components', optionKey: 'C' },
          { optionText: 'Handles routing', optionKey: 'D' }
        ],
        correctOption: 'B'
      },
      {
        examId: exam2._id,
        questionText: 'How do you pass data from parent to child component?',
        options: [
          { optionText: 'Using hooks', optionKey: 'A' },
          { optionText: 'Using props', optionKey: 'B' },
          { optionText: 'Using useState', optionKey: 'C' },
          { optionText: 'Using context', optionKey: 'D' }
        ],
        correctOption: 'B'
      },
      {
        examId: exam2._id,
        questionText: 'What is a controlled component in React?',
        options: [
          { optionText: 'A component that uses internal state only', optionKey: 'A' },
          { optionText: 'A component managed by Redux', optionKey: 'B' },
          { optionText: 'A form element controlled by React state', optionKey: 'C' },
          { optionText: 'A component with CSS styling', optionKey: 'D' }
        ],
        correctOption: 'C'
      }
    ];

    const webQuestions = [
      {
        examId: exam3._id,
        questionText: 'What does HTML stand for?',
        options: [
          { optionText: 'Hyper Text Markup Language', optionKey: 'A' },
          { optionText: 'High Tech Modern Language', optionKey: 'B' },
          { optionText: 'Hyper Transfer Markup Language', optionKey: 'C' },
          { optionText: 'Home Tool Markup Language', optionKey: 'D' }
        ],
        correctOption: 'A'
      },
      {
        examId: exam3._id,
        questionText: 'Which CSS property is used to change text color?',
        options: [
          { optionText: 'text-color', optionKey: 'A' },
          { optionText: 'font-color', optionKey: 'B' },
          { optionText: 'color', optionKey: 'C' },
          { optionText: 'text-style', optionKey: 'D' }
        ],
        correctOption: 'C'
      },
      {
        examId: exam3._id,
        questionText: 'Which HTML tag is used to create a hyperlink?',
        options: [
          { optionText: '<link>', optionKey: 'A' },
          { optionText: '<a>', optionKey: 'B' },
          { optionText: '<href>', optionKey: 'C' },
          { optionText: '<url>', optionKey: 'D' }
        ],
        correctOption: 'B'
      },
      {
        examId: exam3._id,
        questionText: 'Which HTTP method is used to fetch data?',
        options: [
          { optionText: 'POST', optionKey: 'A' },
          { optionText: 'GET', optionKey: 'B' },
          { optionText: 'PUT', optionKey: 'C' },
          { optionText: 'DELETE', optionKey: 'D' }
        ],
        correctOption: 'B'
      },
      {
        examId: exam3._id,
        questionText: 'Which of the following is used to make a website responsive?',
        options: [
          { optionText: 'HTML', optionKey: 'A' },
          { optionText: 'Viewport meta tag', optionKey: 'B' },
          { optionText: 'Flexbox only', optionKey: 'C' },
          { optionText: 'JavaScript only', optionKey: 'D' }
        ],
        correctOption: 'B'
      }
    ];

    const allQuestions = [...jsQuestions, ...reactQuestions, ...webQuestions];
    await Question.insertMany(allQuestions);

    console.log('Sample data initialized successfully');
  } catch (error) {
    console.error('Error initializing sample data:', error.message);
  }
}

module.exports = initializeSampleData;
