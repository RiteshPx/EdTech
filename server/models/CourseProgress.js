const mongoose= require("mongoose"); 

const courseProgressSchema =new mongoose.Schema({
   courseID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
   },
   completedVideos:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SubSection,"
   }],
   totalSubSections:{
    type:Number,
   },


});

module.exports = mongoose.model("CourseProgress",courseProgressSchema);