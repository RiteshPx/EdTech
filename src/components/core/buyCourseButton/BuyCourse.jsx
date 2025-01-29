import React, { useContext } from "react";
import AuthContext from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { capturePayment, verifyPaymentApi } from "../../../api/paymentApi";

export const BuyCourse = ({ courseID }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const buyHandle = async () => {
        try {
            // Check if the user is authenticated
            if (!isAuthenticated) {
                toast.warn("Sign up first!");
                navigate("/login");
                return;
            }

            // Prepare the payload
            const payload = {
                courseID,
            };

            console.log("Payload being sent:", payload); // Debugging

            // Step 1: Call the backend to create an order
            const { data } = await capturePayment(payload);
            console.log("Response from server:", data); // Debugging

            if (!data.success) {
                alert("Failed to create payment order");
                return;
            }
            toast.success("Payment order created successfully!");

            // Step 2: Load Razorpay and initiate payment
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID, // The API key to access Razorpay
                amount: data.amount, // Amount in smallest unit (e.g., paise for INR)
                currency: data.currency,
                name: "Course Payment", // Change this to your project name
                description: "Complete your course purchase",
                order_id: data.orderId, // Razorpay order ID from backend
                handler: async function (response) {
                    // Step 3: Verify payment signature on the backend
                    const verifyResponse = await verifyPaymentApi(response);
                     console.log(response);
                    if (verifyResponse.data.success) {
                        alert("Payment successful and course enrolled!");
                    } else {
                        alert("Payment verification failed!");
                    }
                },
                prefill: {
                    name: "Your Name", // Replace with user's name
                    email: "email@example.com", // Replace with user's email
                    contact: "1234567890", // Replace with user's phone number
                },
                theme: {
                    color: "#3399cc", // Customize Razorpay theme color
                },
                callback_url: "https://edtech-h1p6.onrender.com/EnrollmentSuccess", // Redirect to this URL
            };

            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();

        } catch (error) {
            console.error("Error initiating Razorpay payment:", error);
            // Handle server errors or validation issues
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred. Please try again.";
            toast.error(errorMessage);
        }

    }
    return (
        <button
            onClick={buyHandle}
            id="rzp-button1"
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
            Buy Now
        </button>
    );
};
