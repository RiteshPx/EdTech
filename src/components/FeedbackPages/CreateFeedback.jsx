import { useState } from "react";
import { toast } from "react-toastify";
import {createRatingAndReviewApi} from "../../api/courseApi";

const FeedbackForm = ({courseId}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (rating === 0 || feedback.trim() === "") {
      alert("Please provide both rating and feedback");
      return;
    }
    const payload = {
      rating,
       review:feedback,
       courseId ,
    };
    try {
      const response = await createRatingAndReviewApi(payload);
      console.log("Feedback submitted successfully:", response.data);
      toast.success("Feedback submitted successfully!");
    setRating(0);
    setFeedback("");
    } catch (error) { 
      console.error("Error submitting feedback:", error);
     toast.error("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="p-3 ml-4 border rounded-lg shadow-md w-1/3 bg-slate-100 ">
      <h2 className="text-lg font-semibold mb-">Give Your Valueable Feedback for this Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block mb-1">Rating:</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`px-2 text-5xl ${
                rating >= star ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>

        <div className="mb-3">
          <label className="block mb-1">Feedback:</label>
          <textarea
            className="w-full p-2 border rounded"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
