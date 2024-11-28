// paymentRoutes.js
const express = require('express');
const router = express.Router();
const {auth,
    isAdmin,
    isInstructor,
    isStudent,
  }= require('../middlewares/auth');

const { capturePayment,
      verifySignature 
       } = require('../controller/Payments');


// Route to initiate a payment
// router.post('./capturePayment',auth,isStudent,capturePayment);
// Route to verify a payment
// router.post('/verifySignature',verifySignature);


module.exports = router;
