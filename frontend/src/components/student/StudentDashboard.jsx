import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [abstract, setAbstract] = useState('');
//   const [message, setMessage] = useState('');

  // Function to handle text input change
//   const handleInputChange = (event) => {
//     setAbstract(event.target.value);
//   };


    const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = () => {
    // if (abstract.trim()) {
    //   // Placeholder for submitting the abstract (e.g., API call or logic to handle submission)
    //   setMessage('Abstract submitted successfully!');
    //   setAbstract('');
    // } else {
    //   setMessage('Please enter a valid abstract.');
    // }
    navigate('/student/checkabstract')
  };

  return (
    <div className="max-w-2xl mx-auto p-6 pt-36 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Dashboard</h1>

      {/* Abstract Textarea */}
      {/* <textarea
        value={abstract}
        onChange={handleInputChange}
        placeholder="Enter your abstract here..."
        className="w-full h-40 p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-6 text-lg"
      /> */}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl m-2 hover:bg-blue-700 transition duration-200"
      >
        Submit Abstract
      </button>

      <button
        onClick={() => navigate('/student/checkIfApproved')}
        className="w-full py-3 bg-blue-600 text-white font-semibold m-2 rounded-xl hover:bg-blue-700 transition duration-200"
      >
        Check if abstract is approved
      </button>

      <button
        onClick={() => navigate('/student/invitesAndRequests')}
        className="w-full py-3 bg-blue-600 text-white font-semibold m-2 rounded-xl hover:bg-blue-700 transition duration-200"
      >
        Invites and Requests
      </button>

      {/* Message */}
      {/* {message && (
        <p className="mt-4 text-lg text-center text-gray-800">{message}</p>
      )} */}
    </div>
  );
};

export default StudentDashboard;
