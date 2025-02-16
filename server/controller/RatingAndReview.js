const Course = require('../models/Course');
const RatingAndReview = require('../models/RatingAndReview');
const mongoose = require('mongoose');
//Create rating and review
exports.createRatingAndReview = async (req, res) => {
    try {
        //fetch
        const { rating, review, courseId } = req.body;

        // get user
        const userId = req.user.id;

        //check user enrolled
        const courseDetail = await Course.findOne({
            _id: courseId,
            enrollStudents: userId
        });
        if (!courseDetail) {
            return res.status(400).json({ message: 'user not enrolled in this course' });
        }

        //check if already review course
        const alreadyReview = await RatingAndReview.findOne({ course: courseId, user: userId });
        if (alreadyReview) {
            return res.status(400).json({ message: "You already give the Feedback" });
        }

        //create rating
        const createdRating = await RatingAndReview.create({
            review,
            rating,
            user: userId,
            course: courseId
        })

        //review attached with the course
        const course = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingAndReviews: createdRating._id,
                }
            }, { new: true },
        );

        //res send
        res.status(200).json({
            success: true,
            message: "create rating review successflly",
            createdRating,
        })
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: e.message,
        })
    }
}



//get average rating
exports.averageRatingAndReview = async (req, res) => {
    try {
        //fetch
        const { courseId } = req.body;
        if(!courseId){
            return res.status(400).json({   
                success:false,
                message:"courseId is required"
            })  
        }
        //calculate rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating :{$avg : "$rating"},
                }
            }
        ])
        console.log(result);
         if(result.length>0){
           return res.status(200).json({
                success:true,
                AverageRating :result[0].averageRating,
            })
         }
        
        return res.status(200).json({
            success: true,
            AverageRating :0,
        })

    }
    catch (e) {
        console.error("Error in averageRatingAndReview:", e);
        res.status(500).json({
            success: false,
            message: "something went wrong to provide rating",
        })
    }
}





// get All rating and reviews (marketing pointview)
exports.getAllRatingAndReview = async (req, res) => {
    try {
const allRating = await RatingAndReview.find({})
                                       .sort({rating :"desc"})
                                       .populate(
                                        {
                                            path:"user",
                                            select:"firstname,lastName,image,email"
                                        }
                                       )
                                       .populate(
                                        {
                                        path:"Course",
                                        select:"courseName"
                                       }
                                    ).exec();

        res.status(400).json({
            success: true,
            message: "successfully geting All rating and review",
        })

    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: "failed to get all rating, try again",
        })
    }
}