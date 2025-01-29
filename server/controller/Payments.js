const { default: mongoose } = require('mongoose');
const {razorpayInstance}= require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
require('dotenv').config();
const crypto = require('crypto');

//capture the payment and initiate the razorpay order
exports.capturePayment = async (req, res) => {
    try {
        //fetch 
        const { courseID } = req.body;
        console.log("Received courseID:", courseID);

        // Validate courseID
        if (!courseID) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID format",
            });
        }
        const userID = req.user.id;
        //valid course id
        let course;
        try {
            course = await Course.findById(courseID);;
            if (!course) {
                return res.status(400).json({
                    success: false,
                    message: 'could not find any course detail',
                })
            }
            //user already pay ?
            const uid = new mongoose.Types.ObjectId(userID);                  //string to object id
            if (course.enrollStudents.includes(uid)) {
                return res.status(400).json({
                    success: false,
                    message: 'Student is already enrolled course',
                })
            }
        }
        catch (e) {
            res.status(400).json({
                success: false,
                message: e.message,
            })
        }

        //create order
        const amount = course.price;
        const currency = 'INR';

        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: courseID,
                userId: userID,
            }
        }
        try {
            //initiate the payment using razorpay
            const paymentResponse =await razorpayInstance.orders.create(options);
            console.log("payment response",paymentResponse);

            //return res
            res.status(200).json({
                success: true,
                message: "Data for all courses are fetching successfully",
                courseName: course.courseName,
                courseID,
                thumbnail: course.thumbnails,
                courseDescription: course.courseDescription,
                orderId: paymentResponse.id,            //order id of payment
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            })
        }
        catch (e) {
            console.error(e)
            return res.status(500).json({
                success: false,
                message: 'cound not initiate order '
            })

        }

    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

// verify signature of razorpay and server 
exports.verifySignature = async (req, res) => {
    try {
  console.log("Verift:--",req.body)
  console.log("Received signature--:", req.headers['x-razorpay-signature']);

        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        const shasum = crypto.createHmac("sha256", secret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

console.log("Generated digest:--", digest);

        if (digest === req.headers["x-razorpay-signature"]) {
            console.log('payment is sucessfully');
        }
        else {
            return res.status(400).json({
                status: "failure",
                message: "signature does not match ",
            });
        }
        //fetch data 
        const { courseId, userId } = req.body.payload.payment.entity.notes;   //beacuse this send from razorpay ,not any user so we can't eject from user(cookie)

        console.log("data:-",courseId,userId);
        //update courseDetail with enroll student
        const enrollCourse = await Course.findByIdAndUpdate({ courseId },
            {
                $push: {
                    enrollStudents: userId,
                }
            }, { new: true },
        );
        if (!enrollStudent) {
            return res.status(400).json({ message: 'course not found' })
        }
        //update userDetail with inject courseId
        const enrollStudent = await User.findByIdAndUpdate({ userId },
            {
                $push: {
                    enrollCourses: courseId,
                }
            }, { new: true },
        )
        if (!enrollCourse) {
            return res.status(400).json({ message: 'User not found' })
        }

        //send mail to congrulation of onboard
        mailSender(
            enrollStudent.email,
            'congrulation',
            "congratulation !your are onboard (enrolled) in course"
        );
        return res.status(200).json({
            success: true,
            message: "successfully enrolled "
        })
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: "enable to  enrolled "
        })
    }
};
