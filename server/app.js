const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
require('dotenv').config();

const app = express();

// Import routes
var courseRouter = require('./router/Course');
var profileRouter = require('./router/Profile');
var userRouter = require('./router/User');
var paymentRouter = require('./router/Payment');

// Config imports
const connectDB = require("./config/mongoose");
const connectCloudinary = require('./config/cloudinary');

// Middleware
app.use(express.json());
app.set('trust proxy', 1);

// CORS Setup
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// Session Setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 1 * 24 * 60 * 60, // Session expiry time (1 day)
  }),
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true,
    sameSite: 'None',
  }  
}));

// File Upload
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  useTempFiles: true,
  tempFileDir: "./temp",
}));

// Database Connection
connectDB();
connectCloudinary();

// 🚀 API Routes
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/course', courseRouter);

// ✅ **Now, Move Static Serving & Catch-All Route to the End**
const buildPath = path.join(__dirname,  'build');
console.log("Build Path:", buildPath);

app.use(express.static(buildPath)); // Serve React files

// 🔥 Catch-All Route (Must Be Below All Other Routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Something went wrong' });
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
