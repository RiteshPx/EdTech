import React, { useEffect, useState } from 'react';
import { createCourseApi, showAllCategoryApi } from '../../api/courseApi';
import { AddCategoryModal } from '../../components/categotyComponent/AddCategoryModal';
import { toast } from 'react-toastify';
import { AdditionDetails } from '../../components/createCourseComponent/AdditionDetails';

const CreateCoursePage = () => {
    
    const [sectionModal, setSectionModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [course, setCourse] = useState('');
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
            const response = await createCourseApi(data);
            console.log('Course created successfully:', response.data.data._id);
            setCourse(response.data.data)
            toast.success('Course created successfully!');
            // show create createSection modal
            setSectionModal(true);

        } catch (error) {
            console.error('Error creating course:', error);
            alert('Failed to create the course. Please try again.');
        }
    };

    // fetch category from backend
    const [Category, setCategory] = useState([])
    useEffect(() => {
        try{
        const fetchCategories = async () => {
            const { data } = await showAllCategoryApi();
            setCategory(data.allCategorys)
        }
        fetchCategories();
    }catch(error){

    }
    }, [showModal])

    // for Add new Category
    const handleCategoryChange = (e) => {
        if (e.target.value === "new") {
            setShowModal(true); // Show modal for new category
        } else {
            handleChange(e); // Update formData for existing categories
        }
    };

    return (
        <div className="flex justify-center   items-center h-11/12 bg-white">
            {!sectionModal &&
                <div className="w-full max-w-4xl bg-gray-400 p-6 m-2 text rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center">Create a New Course</h2>
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div>
                            <label className="block text-sm font-medium text-white-700">Course Name</label>
                            <input
                                type="text"
                                name="courseName"
                                value={formData.courseName}
                                onChange={handleChange}
                                placeholder="Enter course name"
                                className="mt-1 block w-full px-2 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white-700">Course Description</label>
                            <input
                            type="text"
                                name="courseDescription"
                                value={formData.courseDescription}
                                onChange={handleChange}
                                placeholder="Enter course description"
                                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            ></input>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white-700">Category</label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleCategoryChange}
                                className="mt-1 block w-full px-4 py-2 text-black border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="" disabled>--Select a Category--</option>
                                {
                                    Category.map((data, index) => (
                                        <option value={data._id} key={index}>
                                            {data.name}
                                        </option>
                                    ))
                                }
                                <option value="new">++ Add New Category</option>
                            </select>
                        </div>

                        {/* Modal for Adding New Category */}
                        {showModal && (
                            <AddCategoryModal setShowModal={setShowModal} setFormData={setFormData} />
                        )}

                        <div>
                            <label className="block text-sm font-medium text-white-700">What You Will Learn</label>
                            <textarea
                                name="whatYouWillLearn"
                                value={formData.whatYouWillLearn}
                                onChange={handleChange}
                                placeholder="List the key takeaways"
                                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            ></textarea>
                        </div>

                        <div className='flex justify-between w-full'>
                        <div>

                            <label className="block text-sm font-medium text-white-700">Price</label>
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
                            <label className="block text-sm font-medium text-white-700">Tag</label>
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
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-white-700">Thumbnail</label>
                            <input
                                type="file"
                                name="thumbnail"
                                onChange={handleFileChange}
                                className="mt-1 block w-full text-white-600"
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
            }
            {
                sectionModal &&                 
                    <AdditionDetails course={course} />
            }
        </div>
    );
};

export default CreateCoursePage;
