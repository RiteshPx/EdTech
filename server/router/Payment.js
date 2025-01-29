// paymentRoutes.js
const express = require('express');
const router = express.Router();
const {auth,
    isAdmin,
    isInstructor,
    isStudent,
  }= require('../middlewares/auth');

const { capturePayment,
      verifySignature ,
      verifyPayment ,

       } = require('../controller/Payments');


// Route to initiate a payment
router.post('/capturePayment',auth,isStudent,capturePayment);
// Route to verify a payment and signature(webHook)
router.post('/verifySignature',verifySignature);
router.post('/verifyPayment',verifyPayment);

module.exports = router;
