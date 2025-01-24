import React, { useState } from 'react'
import { createCategoryApi } from '../../api/courseApi';


export const AddCategoryModal = ({ setShowModal, setFormData }) => {
    const [newCategory, setNewCategory] = useState({
        name: "",
        description: ""
    });
    const handleChange = (e) => {
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value })

    }
    const handleAddCategory = async () => {
        const { data } = await createCategoryApi(newCategory);
        setShowModal(false)
        // Function to update categoryId with a specific condition
        setFormData((prevState) => ({
            ...prevState,
            categoryId: data.categoryDetails._id, // Set categoryId with the new value
        }));
    };
    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Category</h3>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                    type="text"
                    name="name"
                    value={newCategory.name}
                    onChange={handleChange}
                    placeholder="Enter category name"
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    value={newCategory.description}
                    onChange={handleChange}
                    placeholder="Enter category description"
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            
            <div className="flex justify-end space-x-3">
                <button
                    onClick={handleAddCategory}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                >
                    Add
                </button>
                <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
    )    
}
