const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const tinyCsrf = require('tiny-csrf');
const csrfMiddleware = require('./csrfMiddleware');

const app = express();
const port = process.env.PORT || 8000;

// Middleware setup
app.use(cors({
  origin: 'http://localhost:5173', // React app URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET || 'your_secret_key')); // Add secret for cookie-parser
app.use(tinyCsrf(process.env.CSRF_SECRET || '7qe98xnBkV5UhnKJ7lA0Yo3M7Q7Ku5Va', ['POST', 'PUT', 'DELETE']));


app.get('/', csrfMiddleware)
// Login route
app.post('/login', csrfMiddleware, (req, res) => {
  return res.send('Login successful');
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
