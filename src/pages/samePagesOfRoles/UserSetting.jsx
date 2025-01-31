import React, { useContext, useState } from 'react';
import { PasswordChange } from '../../components/core/samRoleComponents/PasswordChange';
import AuthContext from '../../Context/AuthContext';
import DeleteAccountBtn from "../../components/core/deleteAccountButton/DeleteAccountBtn";


export const UserSetting = ({ user, handleSelection }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    //change password logic
    const [showChangePassword, setShowChangePassword] = useState(false);
    const { logout } = useContext(AuthContext);

    return (
        <div className="h-5/6  bg-gray-100 flex flex-col items-center p-6">
            <div className="w-full max-w-md bg-white rounded shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>

                {/* Profile Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700">Profile</h2>
                    <p className="text-gray-600 mt-2">Name: <strong>{user.firstName} {user.lastName}</strong> </p>
                    <p className="text-gray-600">Email: <strong> {user.email} </strong></p>
                    <button onClick={() => handleSelection('Profile')} // Handle item selection
                        className='text-blue-600 text-sm mt-1 font-semibold'>More details</button>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                    {!showChangePassword &&
                        <>
                            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                onClick={() => setShowChangePassword(true)}>
                                Change Password
                            </button>
                            <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
                                onClick={() => logout()}>
                                Logout
                            </button>
                            <button onClick={() => setShowDeleteModal(true)} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
                                Delete Account
                            </button>
                        </>
                    }
                    {showChangePassword &&
                        <PasswordChange showChangePassword={showChangePassword} setShowChangePassword={setShowChangePassword} />
                    }
                    {
                        showDeleteModal &&
                        <DeleteAccountBtn showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
                    }
                </div>




            </div>
        </div>
    );
}
