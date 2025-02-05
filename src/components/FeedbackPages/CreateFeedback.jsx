import { useState } from "react";
import { toast } from "react-toastify";
import {createRatingAndReviewApi} from "../../api/courseApi";

const FeedbackForm = ({courseId}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (rating === 0 || feedback.trim() === "") {
      toast.warn("Please provide both rating and feedback");
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
      if (error.response && error.response.data && error.response.data?.message) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("An error occurred while submitting feedback");
      }
    }
  };

  return (
    <>
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setShowModal(true)}
      >
        Give Feedback
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-1/3">
            <h2 className="text-lg font-semibold mb-4">Give Your Valuable Feedback for this Course</h2>
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

              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackForm;
