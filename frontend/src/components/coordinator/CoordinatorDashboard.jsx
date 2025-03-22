import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CoordinatorDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/coordinator/dashboard`, {
  //         withCredentials: true
  // });
  //       const { success, data, message } = response.data;

  //       if (!success) {
  //         console.error('Error fetching dashboard data:', message);
  //         return;
  //       }

  //       setDashboardData(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching dashboard data:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchDashboardData();
  // }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 mt-12">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">Coordinator Dashboard</h1>

        {/* Approve Abstracts */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Approve Project Abstracts</h2>
          <p className="text-gray-600 mb-4">Review and approve abstracts submitted by students.</p>
          <button
            onClick={() => navigate('/coordinator/approveAbstracts')}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Review Abstracts
          </button>
        </div>

        {/* Manage Groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Manage Student Groups</h3>
            <p className="text-lg text-gray-500">View and manage project groups.</p>
            <button
              onClick={() => navigate('/coordinator/manageGroups')}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Manage Groups
            </button>
          </div>

          {/* Project Progress Tracking */}
          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Track Project Progress</h3>
            <p className="text-lg text-gray-500">Monitor project milestones and deadlines.</p>
            <button
              onClick={() => navigate('/coordinator/projectProgress')}
              className="mt-4 w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
            >
              View Progress
            </button>
          </div>

          {/* Upload Abstract */}
          <div className="bg-red-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Upload Abstract</h3>
            <p className="text-lg text-gray-500">Upload previous years abstracts in database</p>
            <button
              onClick={() => navigate('/coordinator/uploadAbstracts')}
              className="mt-4 w-full py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition duration-200"
            >
              Upload Abstract
            </button>
          </div>

          {/* Set Deadlines */}
          <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Set Deadlines</h3>
            <p className="text-lg text-gray-500">Define important project deadlines.</p>
            <button
              onClick={() => navigate('/coordinator/setDeadlines')}
              className="mt-4 w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
            >
              Set Deadlines
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
