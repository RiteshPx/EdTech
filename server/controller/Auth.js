const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt");
const profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require('../utils/mailSender');


//send otp for singup
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "not get email",
                success: false,
            })
        }
        console.log("your email is ", email)

        const checkUserPresent = await User.findOne({ email });
        //if already exist
        if (checkUserPresent) {
            return (
                res.status(401).json({
                    success: false,
                    message: "user already exist"
                })
            )
        }
        //otp Generator
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })
        console.log("otp is ", otp);

        //checkk its unique otp or not 
        // const result = await OTP.findOne({ otp });

        //recreate otp if previous is not unique
        // while (result) {
        //     otp = otpGenerator.generate(6, {
        //         upperCaseAlphabets: false,
        //         lowerCaseAlphabets: false,
        //         specialChars: false
        //     })
        //     result = OTP.findOne({ otp });
        // }

        //    stored in db 
        const otpBody = await OTP.create({
            email,
            otp,
        });
        console.log("otp stored is :", otpBody);

        //success return
        res.status(200).json({
            success: true,
            message: "otp successfully send",
            otpBody

        })
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "not get otp",
        })
    }
}


//sign up
exports.signUp = async (req, res) => {
    try {
        //fetch all data from body
        const { email,
            firstName,
            lastName,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        console.log("enter in signup")
        // data validate
        if (!firstName || !lastName || !password || !confirmPassword || !otp) {
            return (
                res.status(403).json({
                    message: "All fields are required",
                    success: false,
                })
            )
        }

        //match password and confirm password
        if (password !== confirmPassword) {
            return (
                res.status(400).json({
                    message: "password and confirm password are not same, try again",
                    success: false,
                })
            )
        }

        // check user already register or not 
        const UserPresent = await User.findOne({ email });
        if (UserPresent) {
            return (
                res.status(400).json({
                    message: "User already exist ",
                    success: false,
                })
            )
        }

        // find most recent otp in db
        console.log("your otp is ", otp);
        const recentotp = await OTP.find({ email: email }).sort({ createdAt: -1 }).limit(1);

        console.log("recent otp is ", recentotp[0].otp);
        //validate otp
        if (recentotp[0].otp !== otp) {
            return (
                res.status(400).json({
                    message: "otp not match ",
                    success: false,
                })
            )
        }

        //additionDetails of user
        const profileDetails = await profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber,
        })

        //hash password and store in db
        await bcrypt.hash(password, 10, async function (err, hash) {
            // Store hash in your password DB.
            const userData = await User.create({
                firstName,
                lastName,
                email,
                accountType,
                password: hash,
                additionDetails: profileDetails._id,
                image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            })


            return res.status(200).json({
                message: "User register successfully",
                success: true,
                userData,
            })
        });
    }
    catch (e) {
        res.status(500).json({
            message: e.message,
            success: false
        })
    }

}

//Login
exports.login = async (req, res) => {
    try {
        //fetch data
        const { email, password } = req.body;

        //validate data
        if (!email || !password) {
            return res.status(403).json({
                message: "All fields are required",
                success: false,
            })
        }

        // check user already register or not 
        const user = await User.findOne({ email }).populate('additionDetails').exec();
        if (!user) {
            return (
                res.status(400).json({
                    message: "User not exist ",
                    success: false,
                })
            )
        }

        //password matching and  generate JWT
        await bcrypt.compare(password, user.password, async function (err, result) {
            if (result == true) {

                const Payload = {
                    email: user.email,
                    accountType: user.accountType,
                    id: user._id,
                }

                let token = jwt.sign(Payload, process.env.JWT_SECRET, {
                    expiresIn: "24h"
                })

                user.token = token;
                user.password = undefined;

                //set cookie
                const options = {
                    expiresIn: new Date(Date.now() + 24 * 3600 * 1000),
                    httpOnly: true,
                    secure: false,   // Set to true for production (HTTPS), false for development (HTTP)
                    sameSite: 'Strict', // Optional, but it prevents sending cookies with cross-site requests
                }
                res.cookie("token", token, options).status(200).json({
                    success: true,
                    message: 'Logged in successfully',
                    user,
                })
            }
            else {
                res.status(401).json({
                    success: false,
                    message: 'Password is incorrect',
                })
            }
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Login Failure,try again",
            success: true,
        })
    }
}


//ChangePassword
exports.changePassword = async (req, res) => {
    try {
        //fetch data
        const { password, newPassword, confirmNewPassword } = req.body;

        //validate data 
        if (!password || !newPassword || !confirmNewPassword) {
            return res.status(500).json({
                success: false,
                message: "All field is required",
            })
        }
        if (newPassword != confirmNewPassword) {
            return res.status(500).json({
                success: false,
                message: "password and confirm password doesn't match , try again",
            })
        }

        //extract the user from token
        const token = req.cookies.token          // also fetch from "req.user" by middleware logic

        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Decode the token using JWT_SECRET

        const userCheckPass = await User.findOne({ email: decoded.email })
        console.log("current",userCheckPass);

        const isPasswordMatch = await bcrypt.compare(password, userCheckPass.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message : "Current Password Incorrect",
            })
        }

        //password hashed
        const newhashedPassword = await bcrypt.hash(newPassword, 10);

        //update password in db
        const user =await User.findOneAndUpdate({ email: decoded.email },
            { password: newhashedPassword },
            { new: true }
        );

        //send mail -- update password
        mailSender(decoded.email, "from EdTech", "password changed successfully");

        //send res
        res.status(200).json({
            success: true,
            message: "your password changed successfully",
        })
    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: "password not changed"
        })

    }
}

//get user by cookie
exports.isLogin = async (req, res) => {
    const token = req.cookies.token;
    
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Decode the token using JWT_SECRET
        console.log("Decoded token:", decoded);
        const email = decoded.email;
        const user = await User.findOne({ email }).populate("additionDetails").exec();
        if (!user) {
            return (
                res.status(400).json({
                    message: "User not exist ",
                    success: false,
                })
            )
        }

        res.json({ 'user': user });
    } else {
        res.status(401).json({ message: 'Unauthorized/No token exits' });
    }
}

// logout 
exports.logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true, // Ensures the cookie is only accessible by the server
            secure: true,   // Use 'true' if you're using HTTPS
            sameSite: 'strict',
        });

        res.status(200).json({ message: 'Logged out successfully.' });
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

