const jwt = require('jsonwebtoken');
require('dotenv').config();
// const User = require('../models/User');

//auth
exports.auth = async (req, res, next) => {
    try {
        // Fetch token from Authorization header, cookies, or other sources
        // let token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "").trim();
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res.status(401).json({ message: "Unauthorized" });
        }
      
        const token = authHeader.split(" ")[1]; // Extract token

        // const token = req.session.Payload;
      console.log("tokem" ,token);
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Missing Token (auth)",
            });
        }

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