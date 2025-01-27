import React, { useState } from "react";
import { createSubSectionApi } from "../../api/courseApi";

export const CreateSubSection = ({ setSubSectionModal,setSubSection ,sectionId}) => {

    const [formData, setFormData] = useState({
        sectionId: sectionId,
        title: "",
        timeDuration: "",
        description: "",
        videoFile: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, videoFile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create form data object
        const data = new FormData();
        data.append("sectionId", formData.sectionId);
        data.append("title", formData.title);
        data.append("timeDuration", formData.timeDuration);
        data.append("description", formData.description);
        data.append("videoFile", formData.videoFile);

        try {
            const response = await createSubSectionApi(data);
               
                setFormData({
                    sectionId: "",
                    title: "",
                    timeDuration: "",
                    description: "",
                    videoFile: null,
                });
                setSubSectionModal(false);
                console.log("res----",response)
                 setSubSection(response.data.updateSection.subSection);
              
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-3 p-7  bg-white shadow-lg rounded-lg">
            <h1 className="text-xl font-bold mb-6">Create Sub-Section</h1>
            <form onSubmit={handleSubmit} className="space-y-6">             

                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter Title"
                        required
                    />
                </div>

                {/* Time Duration */}
                <div>
                    <label htmlFor="timeDuration" className="block text-sm font-medium text-gray-700">
                        Time Duration
                    </label>
                    <input
                        type="text"
                        id="timeDuration"
                        name="timeDuration"
                        value={formData.timeDuration}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter Time Duration (e.g., 2:30)"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter Description"
                        required
                    ></textarea>
                </div>

                {/* Video File */}
                <div>
                    <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700">
                        Video File
                    </label>
                    <input
                        type="file"
                        id="videoFile"
                        name="videoFile"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm"
                    >
                        Submit
                    </button>
                </div>
            </form>
            
        </div>
    );
};



