const jwt = require('jsonwebtoken');
require('dotenv').config();
// const User = require('../models/User');

//auth
exports.auth = async (req, res, next) => {
    try {
        //fetch token

        const token = req.header("Authorization").replace("Bearer ", "").trim() ||  user.token || req.cookies.token  ;
        
        //validate token
        if (!token) {
           return res.status(400).json({
                success: false,
                message: "missing Token",
            })
        }
        console.log(token)

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
            next(); //call next middleware

        }
        catch (e) {
            res.status(401).json({
                success: false,
                message: "Token is invalid",
            })
        }
    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: "something went wrong while verify the token "
        })
    }
}


//ISstudent
exports.isStudent = (req, res, next) => {
    try {
        if (req.user.accountType != "Student") {
            res.status(401).json({
                success: false,
                message: "This is protected route for students only ",
            })
        }
        next();
    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: "Role of user can*t define "
        })
    }
}


//isInstructor
exports.isInstructor = (req, res, next) => {
    try {
        if (req.user.accountType != "Instructor") {
            res.status(401).json({
                success: false,
                message: "This is protected route for Instructor only ",
            })
        }
        next();
    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: "user role is not defined , try again "
        })
    }
}


//isAdmin
exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.accountType != "Admin") {
            res.status(401).json({
                success: false,
                message: "This is protected route for Admin only ",
            })
        }
        next();
    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: "Role of user can*t define "
        })
    }
}