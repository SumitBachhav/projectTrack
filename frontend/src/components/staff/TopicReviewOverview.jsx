import React from 'react'
import { useNavigate } from 'react-router-dom';

function TopicReviewOverview() {

    const navigate = useNavigate();

    // const studentId = 11122;

    const handleClick = (studentId) => {
        navigate(`/staff/topicReview/${studentId}`);
    };

    const data = [
        { studentId: 1012401, status: 'Verified' },
        { studentId: 1012402, status: 'Pending' },
        { studentId: 1012403, status: 'Pending' },
        { studentId: 1012404, status: 'Pending' },
        { studentId: 1012405, status: 'Pending' },
        { studentId: 1012406, status: 'Pending' },
        { studentId: 1012407, status: 'Pending' },
        { studentId: 1012408, status: 'Pending' },
        { studentId: 1012409, status: 'Pending' },
        { studentId: 10124010, status: 'Verified' },

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



 