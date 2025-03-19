import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Make sure to install axios if you haven't

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);  // To show a loading state while fetching data

  useEffect(() => {
    const checkSkillSubmission = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/staff/staffDashboard`);
        
        const { success, data, message } = await response.data;

        if (!success) {
          console.error('Error checking skill submission:', message);
          // Handle error accordingly, maybe show an error message
          return;
        }

        // console.log(data)
        const userData = data.data;

        if (!userData.skillSubmitted) {
          navigate('/staff/submitSkills');
        } else {
          setLoading(false);  // Only stop loading if skill is submitted
        }

      } catch (error) {
        console.error('Error checking skill submission:', error);
        // Handle error accordingly, maybe show an error message
      }
    };

    checkSkillSubmission();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 mt-12">
      {/* Dashboard Container */}
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">Staff Dashboard</h1>

        {/* Status Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Submitted Abstracts */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Submitted Abstracts</h3>
            <p className="text-lg text-gray-500">View student submitted abstracts waiting for approval.</p>
            <button
              onClick={() => navigate('/staff/topicReviewOverview')}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              View Submitted Abstracts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
