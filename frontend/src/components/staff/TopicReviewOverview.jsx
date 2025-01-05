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
        <div className="flex flex-col items-center justify-center bg-gray-100 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className='font-bold text-3xl'>Submitted Abstract</p>
                <div className="max-w-md mx-auto p-4">
                    <ul className="list-none space-y-2">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleClick(item.studentId)}
                                className='flex flex-row justify-between cursor-pointer p-2 rounded-lg transition-all bg-slate-400'
                            >
                                <li

                                    className={``}
                                >
                                    {item.studentId}
                                </li>
                                <div 
                                    className={`rounded-xl ${item.status === 'Pending'
                                        ? 'bg-yellow-500 text-black'
                                        : 'bg-green-800 text-white'
                                        }`}
                                >{item.status}</div>
                            </div>
                        ))}
                    </ul>
                </div>


                <button
                    onClick={handleClick}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
                >
                    Dashboard
                </button>
            </div>
        </div>
    )
}

export default TopicReviewOverview

