const User = require('../models/User');
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//resetPassToken
exports.resetPasswordToken = async (req, res) => {
    try {
        //fetch email
        const email = req.body.email;
console.log("email",email);
        //check user exist
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Your Email is not Registered with us ",
            })
        }

        //generator token
        let token = crypto.randomUUID();

        //update user to add token and expire time
         await User.findOneAndUpdate({ email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true });

        //URL generator
        const URL = `http://localhost:3000/resetPassword/${token}`;

        //send mail containing URL
        await mailSender(email,
            'reset password mail',
            `reset your password on :${URL}`
        );

        //send res
        res.status(200).json({
            success: true,
            message: 'mail send successfully , check your mail to reset your password',
        })


    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "something went wrong while reset your password"
        })
    }
}

//resetPassword
exports.resetPassword = async (req, res) => {
    try {
        //fetch data
        const { token, password, confirmPassword } = req.body;
console.log(password,"and",confirmPassword);
        //validation
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "password does not match",
                success: false,
            })
        }
        //get user detail by token
        const userDetails = await User.findOne({token});

        //if no entry - invalid token
        if(!userDetails){
            return res.status(400).json({
                message: "Token is invalid",
                success: false,
            }) 
        }

        //expire the time of token
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                message: "token is expire ,please regenerate your token",
                success: false,
            })
        }

        //hash password 
        const hashedPassword = await bcrypt.hash(password,10);

        // update in db
        await User.findOneAndUpdate({token},
            {password:hashedPassword},
            {new:true}
        )

        //res return
        res.status(200).json({
            success:true,
            message:"Password reset successfully"
        })

    }
    catch (e) {
        res.status(400).json({
            success:false,
            message:"Something went wrong ,password doesn't change ,try again"
        })

    }
}