const express = require('express');
const router = express();

const { sendOTP,
    signUp,
    login,
    changePassword
} = require('../controller/Auth');


const { resetPasswordToken,
    resetPassword
} = require('../controller/ResetPassword');


const { auth} = require('../middlewares/auth');


// -----------------authenticate router -----------------

//router for login user
router.post('/login', login);

//router for signup user 
router.post('/signup', signUp);

//router for resetpassword
router.post('/changePassword', auth, changePassword);

//router for sendotp to user email
router.post('/sendOTP', sendOTP);


// -----------------------reset pasword---------------
//first send token , take care of it
router.post('/resetPasswordToken',auth,resetPasswordToken);
router.post('/resetPassword',auth,resetPassword);


module.exports = router;