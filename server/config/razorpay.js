const Razorpay = require('razorpay');
require("dotenv").config();


exports.razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAR_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});