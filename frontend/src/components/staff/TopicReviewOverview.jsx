import React from 'react'
import { useNavigate } from 'react-router-dom';

function TopicReviewOverview() {

    const navigate = useNavigate();

    // const studentId = 11122;

    const handleClick = (studentId) => {
        navigate(`/staff/topicReview/${studentId}`);
    };

    const data = [
        { studentId: 1, status: 'Pending' },
        { studentId: 2, status: 'Pending' },
        { studentId: 3, status: 'Pending' },
        { studentId: 4, status: 'Pending' },
        { studentId: 5, status: 'Pending' },
        { studentId: 6, status: 'Pending' },
        { studentId: 7, status: 'Pending' },
        { studentId: 8, status: 'Pending' },
        { studentId: 9, status: 'Pending' },
        { studentId: 10, status: 'Verified' },

    ];


    return (
        <div className="flex flex-col items-center mt-10 justify-center bg-gray-100 min-h-screen p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-3xl">
        <p className="font-bold text-3xl mb-6 text-gray-700">Submitted Abstracts</p>
        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.studentId}
              onClick={() => handleClick(item.studentId)}
              className="flex items-center justify-between cursor-pointer p-4 bg-slate-100 hover:bg-slate-200 rounded-lg shadow transition-all"
            >
              <p className="text-lg font-medium text-gray-700">{`Student ID: ${item.studentId}`}</p>
              <div
                className={`px-3 py-1 text-sm font-bold rounded-full ${
                  item.status === "Pending"
                    ? "bg-yellow-500 text-black"
                    : "bg-green-800 text-white"
                }`}
              >
                {item.status}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/student/dashboard")}
          className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none"
        >
          Dashboard
        </button>
      </div>
    </div>)
}

export default TopicReviewOverview



 