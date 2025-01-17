import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmittedAbstractPage = () => {
  const [submittedAbstract, setSubmittedAbstract] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the submitted abstract details (this is a placeholder for fetching data)
    // Example data:
    const fetchedAbstract = {
      title: 'Skin Cancer Diagnosis Using AI',
      abstract: "Skin cancer is common and early detection is critical for effective treatment. This presentation explores the use of Artificial Intelligence (AI) in diagnosing skin cancer by analyzing dermoscopic images. AI techniques, such as deep learning, can improve diagnostic accuracy and speed compared to traditional methods which depended on human experts. In this seminar we will explore methodology, objectives, advantages disadvantages of this technique. ",
      domain: 'Artificial Intelligence',
      keywords: 'Artificial Intelligence, Deep learning, Neural network', 
      status: 'Pending Review', // Can be 'Pending', 'Approved', 'Rejected'
      submissionDate: '2025-01-10',
    };
    setSubmittedAbstract(fetchedAbstract);
  }, []);

  // Function to handle the update action
  const handleUpdate = () => {
    navigate('/student/updateabstract'); // Navigate to a page for updating the abstract
  };

  // Function to handle withdraw action
  const handleWithdraw = () => {
    // Placeholder for the withdraw logic
    alert('Abstract withdrawn successfully!');
    navigate('/student/dashboard'); // Navigate back to the dashboard after withdrawal
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 mt-14">
      {/* Submitted Abstract Page */}
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">Submitted Abstract</h1>

        {/* Abstract Details */}
        {submittedAbstract ? (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Title:</h2>
              <p className="text-lg text-gray-600">{submittedAbstract.title}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Abstract:</h2>
              <p className="text-lg text-gray-600">{submittedAbstract.abstract}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Domain:</h2>
              <p className="text-lg text-gray-600">{submittedAbstract.domain}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Keywords:</h2>
              <p className="text-lg text-gray-600">{submittedAbstract.keywords}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Status:</h2>
              <p className={`text-lg font-semibold ${submittedAbstract.status === 'Approved' ? 'text-green-500' : submittedAbstract.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                {submittedAbstract.status}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Submission Date:</h2>
              <p className="text-lg text-gray-600">{submittedAbstract.submissionDate}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleUpdate}
                className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
              >
                Update Abstract
              </button>

              {/* <button
                onClick={handleWithdraw}
                className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200"
              >
                Withdraw Abstract
              </button> */}
            </div>
          </div>
        ) : (
          <p className="text-lg text-center text-gray-600">No submitted abstract found.</p>
        )}
      </div>
    </div>
  );
};

export default SubmittedAbstractPage;
