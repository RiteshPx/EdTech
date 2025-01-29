const express = require('express');
const router = express();

const { sendOTP,
    signUp,
    login,
    changePassword,
    isLogin,
    logout
} = require('../controller/Auth');


const { resetPasswordToken,
    resetPassword
} = require('../controller/ResetPassword');


const { auth,isStudent} = require('../middlewares/auth');


// -----------------authenticate router -----------------

//router of isLogin
router.get('/isLogin',auth,isLogin); 

//router for login user
router.post('/login', login);

//router for signup user 
router.post('/signup', signUp);

router.post('/logout',auth,logout);
//router for resetpassword
router.post('/changePassword', auth, changePassword);

//router for sendotp to user email
router.post('/sendOTP', sendOTP);


// -----------------------reset pasword---------------
//first send token , take care of it
router.post('/resetPasswordToken',resetPasswordToken);
router.post('/resetPassword',resetPassword);


module.exports = router;