const mongoose= require("mongoose"); 
const Category = require("./Category");

const courseSchema =new mongoose.Schema({
   courseID:{
        type:String,
        require: true,
    },
    courseName:{
        type:String,
        trim:true,
        require: true,
    },
    courseDescription:{
        type:String,
        trim:true,
        require:true,
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require: true,
    },
    whatYouWillLearn:{
        type:String,
        require: true,
    },
    courseContent:[
        {
         type: mongoose.Schema.Types.ObjectId,
         ref:"Section",
        }
     ],
    ratingAndReviews:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview",
        }
    ],
    price:{
        type:Number,
        require:true,
    },
    thumbnails:{
        type:String,
        require:true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    tag:{
        type:[String],
    },
    enrollStudents:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User", 
            // require:true,
        }
    ]

});

module.exports = mongoose.model("Course",courseSchema);