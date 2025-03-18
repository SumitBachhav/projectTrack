import React from 'react'
import { useNavigate } from 'react-router-dom';

function AbstractComplete() {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/student/dashboard');
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Submitted</h2>
                <p className="mb-4">Your abstracts have been successfully submitted!</p>
                <p className="mb-4">Please wait while the faculty reviews them.</p>
                <button
                    onClick={handleLoginClick}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
                >
                    Dashboard
                </button>
            </div>
        </div>
    )
}

export default AbstractComplete

