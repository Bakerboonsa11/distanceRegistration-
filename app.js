
require('dotenv').config(); // Load environment variables

const cors = require('cors');
const axios=require('axios')
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const userRoute=require('./routes/useRoutes');
const errorController = require('./controllers/errorController');
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
App.use('/api/v1/user',userRoute)
// App.post('/', async (req, res) => {
//     try {
//         const { message } = req.body;
//         console.log(message); // To check what message is being sent

//        const response = await axios.post(
//     'https://api.openai.com/v1/chat/completions',
//     {
//         model: "gpt-3.5-turbo", // Change to GPT-3.5
//         messages: [{ role: "user", content: message }],
//     },
//     {
//         headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
//     }
// );

        
//         // Fix the response access here
//         const reply = response.data.choices[0].message.content || response.data.choices[0].text;
//         console.log(reply);  // Log the reply to check if it's being processed correctly

//         res.json({ reply });
//     } catch (error) {
//         console.error(error.response?.data || error.message);  // Log more details from the error
//         res.status(500).json({ error: error.message });
//     }
// });


App.use(errorController)

module.exports=App;
// 
// app.post('/generate-image', );
