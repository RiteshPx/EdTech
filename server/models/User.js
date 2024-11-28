const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: ["Student", "Admin", "Instructor"],
        required: true,
    },
    additionDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    enrollCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
    }],
    image: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    courseProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress",
    }],
    status: {
        type: String,
        enum: ["Draft", "Published"]
    }

});

module.exports = mongoose.model("User", userSchema);