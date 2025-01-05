import React from 'react'
import { useNavigate } from 'react-router-dom';

function RegisterComplete() {

    const navigate = useNavigate(); // Initialize the navigate function

    const handleLoginClick = () => {
      // Navigate to the login page when the button is clicked
      navigate('/login');
    };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Registration Complete</h2>
        <p className="mb-4">Your registration is successful! Please log in to continue.</p>
        <button
          onClick={handleLoginClick}
          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default RegisterComplete