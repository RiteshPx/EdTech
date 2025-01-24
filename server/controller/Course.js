const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const uploadToCloudinary = require('../utils/cloudinaryUploader');
require('dotenv').config();
const mongoose = require('mongoose');

//CREATE COURSES HANDLER FUNCTION 
exports.createCourse = async (req, res) => {
    try {
        //fetch data
        const { courseName, courseDescription, categoryId, whatYouWillLearn, price, tag } = req.body;
        const thumbnails  = req.files.thumbnail   ;
        //validation
        if (!courseName || !courseDescription || !categoryId || !whatYouWillLearn || !price || !thumbnails) {
            return res.status(400).json({
                success: false,
                message: "all field are require",
            })
        }

        //ADD the Instructor IN DB
        const userId = req.user.id;  //fetch from req body middleware(auth or instructor) 
        const instructorDetail = await User.findOne({ _id: userId })
        console.log("instructor detail is ", instructorDetail);
        if (!instructorDetail) {
            return res.status(404).json({
                success: false,
                message: "INstructor detail is not found",
            })
        }

        //check category is valid or not 
        const cid = new mongoose.Types.ObjectId(categoryId);      //string to object id
        const categoryDetails = await Category.findById({ _id : cid });   //its take category as refrence and category come with its id 
        if (!categoryDetails) {
            res.status(400).json({
                success: false,
                message: 'category is invalid or not found',
            })
        }

        //upload image in cloudinary
        const thumbnailImage = await uploadToCloudinary(thumbnails,process.env.FOLDER_NAME );

        //create entry of course in db
        const newCourse = await Course.create({
            courseDescription,
            courseName,
            category: categoryId,                                              //actually it is category id 
            thumbnails: thumbnailImage.secure_url,
            whatYouWillLearn,
            price,
            instructor: instructorDetail._id,                 // instructor: userId,
            tag,
        })

        //UPDATE INSTRUCTOR with this course
        await User.findOneAndUpdate({ _id: userId },        // _id: instructorDetail._id
            {
                $push: {
                    courses: newCourse._id,
                }
            }, { new: true }
        )

        //update the category schema with this course
        await Category.findByIdAndUpdate({ _id:cid },           //its take category as refrence and category come with its id 
            {
                $push: {
                    courses: newCourse._id,
                }
            }
        );

        //return res
        res.status(200).json({
            success: true,
            message: "sucessfully upload",
            data: newCourse,
        })

    }
    catch (e) {
        console.error(e);
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}


//Get all courses handler function 
exports.showAllCourse = async (req, res) => {
    try {
        const allCourses = await Course.find({});
        // const allCourses = await Course.find({},
        //     {
        //         courseName:true,
        //         courseDescription: true,
        //         price:true,
        //         thumbnails :true,
        //         instructor:true,
        //         ratingAndReviews:true,
        //         students:true,
        //     }
        // ).populate("instructor")
        // .exec();

        //send res
        res.status(200).json({
            success: true,
            message: "Data for all courses are fetching successfully",
            data: allCourses
        })

    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

//get alldetails of a courese
exports.getCourseDetails = async (req, res) => {
    try {
        //fetch
        const { courseId } = req.body;

        //validate
        if (!courseId) {
            return res.status(400).json({ message: 'enable to fetch courseId from req body' })
        }

        const cid = new mongoose.Types.ObjectId(courseId);                  //string to object id

        const courseDetail = await Course.findById(
            {_id: cid })
            .populate(
                {
                    path: 'instructor',
                    populate: {
                        path: 'additionDetails'
                    }
                }
            )
            .populate(
                {
                    path: 'courseContent',
                    populate: {
                        path:"subSection",
                    }
                }
            ).populate('ratingAndReviews')
            .populate("category")
            .exec();

            //validation
            if(!courseDetail){
                return res.status(400).json({
                    message:'course does not found',
                    success:false,
                })
            }

        //send res
        res.status(200).json({
            success: true,
            message: "Detail of course are fetching successfully",
            data: courseDetail,
        })

    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message,
        })
    }
}