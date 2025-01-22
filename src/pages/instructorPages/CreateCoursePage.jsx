import React, { useState } from 'react';
import axios from 'axios';

const CreateCoursePage = () => {
    const [formData, setFormData] = useState({
        courseName: '',
        courseDescription: '',
        categoryId: '',
        whatYouWillLearn: '',
        price: '',
        tag: '',
    });
    const [thumbnail, setThumbnail] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setThumbnail(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create form data for file upload
        const data = new FormData();
        data.append('thumbnail', thumbnail);
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            const response = await axios.post('/api/courses', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Course created successfully:', response.data);
            alert('Course created successfully!');
        } catch (error) {
            console.error('Error creating course:', error);
            alert('Failed to create the course. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Create a New Course</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course Name</label>
                        <input
                            type="text"
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleChange}
                            placeholder="Enter course name"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course Description</label>
                        <textarea
                            name="courseDescription"
                            value={formData.courseDescription}
                            onChange={handleChange}
                            placeholder="Enter course description"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category ID</label>
                        <input
                            type="text"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            placeholder="Enter category ID"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">What You Will Learn</label>
                        <textarea
                            name="whatYouWillLearn"
                            value={formData.whatYouWillLearn}
                            onChange={handleChange}
                            placeholder="List the key takeaways"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter course price"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tag</label>
                        <input
                            type="text"
                            name="tag"
                            value={formData.tag}
                            onChange={handleChange}
                            placeholder="Enter course tag"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                        <input
                            type="file"
                            name="thumbnail"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-gray-600"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition"
                    >
                        Create Course
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCoursePage;
