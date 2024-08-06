const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const tinyCsrf = require('tiny-csrf');

const app = express();
const port = process.env.PORT || 8000;

// Middleware setup
app.use(cors({
  origin: 'http://localhost:5173', // React app URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET || 'your_secret_key')); // Add secret for cookie-parser
app.use(tinyCsrf(process.env.CSRF_SECRET || '7qe99xnBkV5BhnKJ7lA0Yo3M7L7Ku5Va', ['POST', 'PUT', 'DELETE'])); // Use middleware

// Middleware to send CSRF token in a cookie
// In the backend (server.js)
app.use((req, res, next) => {
    if (req.method === 'GET') {
      const csrfToken = req.csrfToken();
      console.log('Generated CSRF Token:', csrfToken);
      res.cookie('XSRF-TOKEN', csrfToken, { httpOnly: false });
    }
    next();
});
  

// Login route
app.post('/login', (req, res) => {
  // Your login logic here
  return res.send('Login successful');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
