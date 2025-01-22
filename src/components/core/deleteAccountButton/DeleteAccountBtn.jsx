import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteAccount } from '../../../api/profileApi';
import { useNavigate } from 'react-router-dom';

const DeleteAccountBtn = ({setShowDeleteModal}) => {
  const navigate=useNavigate();

  const handleDelete =async () => {
    // Call your delete API here
    const response = await deleteAccount();
    console.log('Account deleted successfully',response.data);
    setShowDeleteModal(false);
    navigate('/');
    toast.success('Your account has been deleted.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
     
      {/* Confirmation Modal */}      
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Account</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to permanently delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              {/* Cancel Button */}
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              {/* Confirm Button */}
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
    
    </div>
  );
};

export default DeleteAccountBtn;
