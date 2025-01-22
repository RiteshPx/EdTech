const express = require('express');
const router = express();

const {updateProfile,
       deleteAccount
}=require('../controller/Profile');

const {auth   
  }= require('../middlewares/auth');


router.put('/updateProfile',auth,updateProfile);  //add profile photo change
router.delete('/deleteAccount',auth,deleteAccount)


module.exports = router;