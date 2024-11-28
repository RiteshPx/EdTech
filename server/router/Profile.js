const express = require('express');
const router = express();

const {updateProfile,
       deleteAccount
}=require('../controller/Profile');

const {auth,
    isAdmin,
    isInstructor,
    isStudent
  }= require('../middlewares/auth');


router.put('/updateProfile',auth,updateProfile);  //add profile photo change
router.delete('/deleteAccount',auth,deleteAccount)


module.exports = router;