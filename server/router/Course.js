const express = require('express');
const router = express();

const {createCourse,
    getCourseDetails,
    showAllCourse,
} =require('../controller/Course');


const { createRatingAndReview,
    getAllRatingAndReview,
    averageRatingAndReview
 } = require('../controller/RatingAndReview');

const {auth,
   isAdmin,
   isInstructor,
   isStudent
 }= require('../middlewares/auth');


const { createCategory,
      getCategoryPageDetail,
      showAllCategorys,
}= require('../controller/Category');

const {createSection,
      updateSection,
      deleteSection
}=require("../controller/Section")

const {createSubSection,
    updateSubSection,
    deleteSubSection,
}=require("../controller/SubSection")

// --------------------course -------------

router.post('/createCourse',auth, isInstructor,createCourse);

router.post('/createSection',auth,isInstructor,createSection);
router.put('/updateSection',auth,isInstructor,updateSection);
router.delete('/deleteSection',auth,isInstructor,deleteSection);

router.post('/createSubSection',auth,isInstructor,createSubSection);
router.put('/updateSubSection',auth,isInstructor,updateSubSection);
router.delete('/deleteSubSection',auth,isInstructor,deleteSubSection);


router.get('/showAllCourse',showAllCourse); 
router.post('/getCourseDetails',getCourseDetails);



//  --------------------------category first--------------

router.post('/createCategory',auth,isAdmin,createCategory);
router.post('/getCategoryPageDetail',getCategoryPageDetail)
router.get('/showAllCategory',showAllCategorys)


//--------------------Rating and Review -----------

router.post('/createRating',auth,isStudent,createRatingAndReview);
router.get('/getAllRatingAndReview',getAllRatingAndReview);
router.get('/averageRatingAndReview',averageRatingAndReview)


module.exports = router;