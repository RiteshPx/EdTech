// Core dependencies
const express = require('express');
const cors = require('cors');                                       //..for entertain frontend
const fileUpload = require('express-fileupload');
const session = require("express-session");
const MongoStore = require("connect-mongo");


var courseRouter = require('./router/Course');
var profileRouter = require('./router/Profile')
var userRouter = require('./router/User')
var paymentRouter = require('./router/Payment')
  
// Config imports
const connectDB = require("./config/mongoose");
const connectCloudinary = require('./config/cloudinary');

// Load environment variables
require('dotenv').config();
const app = express();

// Middleware
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 1 * 24 * 60 * 60, // Session expiry time (1 day)
  }),
  cookie: { 
    secure:  process.env. === 'production', 
  }  // Set `true` in production with HTTPS
}));

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(fileUpload({NODE_ENV
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB
  useTempFiles: true,
  tempFileDir: "./temp",
   // Ensure temporary files are created for uploads
}));


// Database Connection
connectDB();
connectCloudinary();

// router mounting
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/course', courseRouter);


// Routes (example route setup)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Something went wrong' });
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;                        

