const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require('../models/Course');

//update Profile  -- because already create in user
exports.updateProfile = async (req, res) => {
    try {
        //get data
        const { dateOfBirth = "", gender, contactNumber, about = "" } = req.body;   //nahi mila to empty ("")

        //get userId
        const userId = req.user.id;


        //validate   //maybe not need
        if (!about) {
            return res.status(400).json({
                success: false,
                message: "All field are require, try again",
            })
        }

        //find profile with help of userid
        const userDetail = await User.findById({_id: userId });
       const profileId = userDetail.additionDetails;
       
console.log(profileId);
        const userProfile = await Profile.findById({_id:profileId });
        console.log(userProfile);

        //update profile
        userProfile.contactNumber = contactNumber;
        userProfile.gender = gender;
        userProfile.about = about;
        userProfile.dateOfBirth = dateOfBirth;

        await userProfile.save();

        //res send
        res.status(400).json({
            success: true,
            message: "successfully update profile",
            userProfile,
        })
    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: "failed to update profile, try again",
        })

    }
}


//delete account
exports.deleteAccount = async (req, res) => {
    try {
        //get id of user
        const id = req.user.id;
        const userDetail =await User.findById(id);
        console.log("here",userDetail)

        //validate
        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: "user not found, try again",
            })
        }

        //TODO : unenrolled the student from courses   **************** HW*********
        let allCouresesId = Array.from(userDetail.enrollCourses);  //copy array
        while (allCouresesId.length) {
            let count = allCouresesId.length;
            const enrollCourse = await Course.findById({ _id: userDetail.courses[count - 1] });
            //filter data (remove userid in it)
            enrollCourse.enrollStudents = enrollCourse.enrollStudents.filter(userID => id !== userID);
            allCouresesId.pop();                           //delete last courseId
            await enrollCourse.save();
        }

        //delete profile first
        await Profile.findByIdAndDelete({ _id: userDetail.additionDetails });

        //delete user
        await User.findByIdAndDelete(id);

        //res send
        res.status(400).json({
            success: true,
            message: "successfully delete account",
        })

    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: "failed to delete account, try again",
        })

    }
}
//
//TODO <------//
//schedule to delete
//cron job