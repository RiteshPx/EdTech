const jwt = require('jsonwebtoken');
require('dotenv').config();
// const User = require('../models/User');

//auth
exports.auth = async (req, res, next) => {
    try {
        // Fetch token from Authorization header, cookies, or other sources
        let token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "").trim();

        // If token is not found in Authorization header, try from cookies
        if (!token) {
            token = req.cookies.token;
        }
        console.log("token is ", token)
        // If no token is present, send an error response
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Missing Token (auth)",
            });
        }

        console.log("Token fetched:", token);

        // Validate token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Decode the token using JWT_SECRET
            console.log("Decoded token:", decoded);
            req.user = decoded;  // Attach user data to request
            next();  // Proceed to the next middleware or route handler
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while verifying the token",
        });
    }
};


//ISstudent
exports.isStudent = (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
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
        if (req.user.accountType !== "Instructor") {
           return res.status(401).json({
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
           return res.status(401).json({
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