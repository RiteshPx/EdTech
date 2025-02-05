import React, { useState } from "react";
import { updateProfile } from "../../api/profileApi";
import { toast } from "react-toastify";

export const UserProfile = ({ user}) => {
    // State for student details
    const additionDetails = user.additionDetails;

    const [student, setStudent] = useState({
        dateOfBirth: additionDetails.dateOfBirth,
        contactNumber: additionDetails.contactNumber,
        about: additionDetails.about,
        gender: additionDetails.gender
    });

    // State for edit mode
    const [isEditing, setIsEditing] = useState(false);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    // Save updated details
    const handleSave = async () => {
        setStudent({ ...student });
        setIsEditing(false);
        const { data } = await updateProfile(student);
        toast.success("update profile");
        // setUser(data.userDetail)
        console.log(data);
    };

    return (
        <div className="h-5/6 bg-gray-700 flex justify-center items-center p-6">
            <div className="bg-white shadow-lg rounded-lg max-w-md w-full ">
                <div className="p-6 flex flex-col items-center">
                    <img
                        className="w-24 h-24 rounded-full border-2 border-blue-500"
                        src={user.image}
                        alt="Profile"
                    />
                    {!isEditing ? (
                        <>
                            <h2 className="text-2xl font-semibold mt-4">{user.firstName} {user.lastName}</h2>
                            <p className="text-gray-600 text-sm">{additionDetails.about}</p>
                            <div className="mt-4 w-full text-left space-y-2">
                                <p>
                                    <strong>Email:</strong> {user.email}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {student.contactNumber}
                                </p>
                                <p>
                                    <strong>DOB:</strong> {student.dateOfBirth}
                                </p>
                                <p>
                                    <strong>Gender:</strong> {student.gender}
                                </p>
                            </div>
                      
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-500 text-whitepx-4 px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Edit Details
                                </button>
                               
                         
                           
                        </>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold mt-4">Edit Profile</h2>
                            <div className="w-full mt-4  space-y-4">
                                <input
                                    type="number"
                                    name="contactNumber"
                                    value={student.contactNumber}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    className="w-full p-2 border rounded"
                                />
                                <div>
                                    <div className="flex space-x-4 mt-2">
                                        <label className="block flex text-sm font-medium text-gray-700">Gender:</label>

                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Male"
                                                checked={student.gender === "Male"}
                                                onChange={handleInputChange}
                                                className="form-radio h-4 w-4 text-blue-500"
                                            />
                                            <span className="ml-2 text-gray-700">Male</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Female"
                                                checked={student.gender === "Female"}
                                                onChange={handleInputChange}
                                                className="form-radio h-4 w-4 text-blue-500"
                                            />
                                            <span className="ml-2 text-gray-700">Female</span>
                                        </label>
                                    </div>
                                </div>

                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={student.dateOfBirth}
                                    onChange={handleInputChange}
                                    placeholder="dateofbirth"
                                    className="w-full p-2 border rounded"
                                />
                                <textarea
                                    name="about"
                                    value={student.about}
                                    onChange={handleInputChange}
                                    placeholder="About"
                                    className="w-full p-2 border rounded"
                                    rows="3"
                                />
                            </div>
                            <div className="flex space-x-4 mt-4">
                                <button
                                    onClick={handleSave}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


