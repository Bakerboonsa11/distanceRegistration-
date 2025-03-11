
require('dotenv').config(); // Load environment variables
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const App = express();

App.use(
   cors(
    {
    origin: ['http://localhost:5173'], // Allow requests from your frontend
    credentials: true, // Allow cookies to be sent
  }
  )
);

// Log requests for debugging
App.use(morgan('dev'));

// Middleware to parse JSON and cookies
App.use(express.json());
App.use(cookieParser());
App.use(express.static(`${__dirname}/public`));

App.get('/', (req, res) => {
    res.send('Hello, Node.js with dotenv!');
});


module.exports=App;
// 
