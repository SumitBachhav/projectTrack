import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Make sure to install axios if you haven't

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);  // To show a loading state while fetching data

  useEffect(() => {
    const checkSkillSubmission = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/student/studentDashboard`,
          {
          withCredentials: true,
        });
        
        const { success, data, message } = await response.data;

        if (!success) {
          console.error('Error checking skill submission:', message);
          // Handle error accordingly, maybe show an error message
          return;
        }

        // console.log(data)
        const userData = data.data;

        if (!userData.skillSubmitted) {
          navigate('/student/submitSkills');
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
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">Student Dashboard</h1>

        {/* Abstract Submission Section */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Submit Your Abstract</h2>
          <p className="text-gray-600 mb-4">Once you submit your abstract, it will be reviewed by the panel. You can check the status of your abstract below.</p>

          {/* Submit Button */}
          <button
            onClick={() => navigate('/student/checkabstract')}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit Abstract
          </button>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Submitted Abstracts */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Submitted Abstracts</h3>
            <p className="text-lg text-gray-500">Your abstract has been submitted successfully and is waiting for approval.</p>
            <button
              onClick={() => navigate('/student/submittedAbstracts')}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              View Submitted Abstracts
            </button>
          </div>

          {/* Approved Abstracts */}
          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Approved Abstracts</h3>
            <p className="text-lg text-gray-500">Your abstract has been approved by the panel and is ready for the next step.</p>
            <button
              onClick={() => navigate('/student/checkIfApproved')}
              className="mt-4 w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
            >
              View Approved Abstracts
            </button>
          </div>

          {/* Invites and Requests */}
          <div className="bg-red-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Invites and Requests</h3>
            <p className="text-lg text-gray-500">Check your invites and requests.<br/> 1 pending request!</p>
            <button
              onClick={() => navigate('/student/inviteRequests')}
              className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            >
              View Invites and Requests
            </button>
          </div>

          {/* Invite students */}
          <div className="bg-red-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Invite students</h3>
            <p className="text-lg text-gray-500">Invite students to join your project.</p>
            <button
              onClick={() => navigate('/student/inviteStudents')}
              className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            >
              Invite
            </button>
          </div>

          {/* Deadlines */}
          <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Deadlines</h3>
            <p className="text-lg text-gray-500">Keep track of important deadlines for abstract submission, project progress, and evaluations.</p>
            <ul className="space-y-2 mt-4 text-lg text-gray-600">
              <li>Abstract Submission Deadline: 15th March</li>
              <li>Project Milestone 1: 30th March</li>
              <li>Final Submission Deadline: 30th April</li>
            </ul>
          </div>

          {/* Schedules */}
          <div className="bg-purple-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Schedule</h3>
            <p className="text-lg text-gray-500">Check your project schedule and stay updated on meetings and feedback sessions.</p>
            <ul className="space-y-2 mt-4 text-lg text-gray-600">
              <li>Week 1: Project Kickoff Meeting</li>
              <li>Week 2-4: Research & Planning</li>
              <li>Week 5: Progress Review Meeting</li>
              <li>Week 6-8: Development Phase</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
