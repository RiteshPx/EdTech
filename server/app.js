const express = require('express');
const cors = require('cors');                                       //..for entertain frontend
const fileUpload = require('express-fileupload');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");

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

// Serve static files from the React app build directory
// The path is crucial here!  Go up one level from 'server' to the 'frontend' folder, then to 'build'
app.use(express.static(path.join(__dirname, '..', 'build'))); //  <--- Correct path


// The "catchall" handler to send index.html on any other request
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html')); // <--- Correct path
});


// Middleware
app.use(express.json());
app.set('trust proxy', 1);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 1 * 24 * 60 * 60, // Session expiry time (1 day)
  }),
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24 * 1, // 1 days
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true,
    sameSite: 'None',
  }  
}));

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(fileUpload({
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

