import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckIfApproved = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ approvedList: [], comments: '' });
    const [wait, setWait] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchApprovedAbstracts = async () => {
            try {
                const response = await axios.get('/api/v1/student/getApprovedAbstract');
                setData({
                    approvedList: response.data.data.abstracts,
                    comments: response.data.data.comments || ''
                });
            } catch (error) {
                console.error("Error fetching approved abstracts", error);
            }
        };

        fetchApprovedAbstracts();
    }, []);

    const handleItemClick = (item) => {
        if (selectedItem !== item._id) {
            setSelectedItem(item._id);
        }
    };

    const handleSubmitDetailsClick = () => {
        if (selectedItem) {
            setError('');
            navigate('/student/projectSpecification');
        } else {
            setError('Please select a title');
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleComment = (comment) => {
        return (
            <p className="mb-4"><strong>Comments:</strong> {comment.length > 0 ? comment : 'None'}</p>
        );
    };

    const waitDisplay = () => (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4">Please wait while the faculty reviews your abstract</p>
            <button
                onClick={() => navigate('/student/dashboard')}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            >
                Dashboard
            </button>
        </div>
    );

    const noneApproved = () => (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-2xl font-bold mb-4">Err!</p>
            <p className="mb-4">Your abstract has not been approved.</p>
            {handleComment(data.comments)}
            <button
                onClick={() => navigate('/student/availableProjects')}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            >
                Check for available projects
            </button>
        </div>
    );

    const oneApproved = () => (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-2xl font-bold mb-4">Success!</p>
            <p className="mb-4">Your abstract titled "{data.approvedList[0].title}" has been approved.</p>
            {handleComment(data.comments)}
            <button
                onClick={() => navigate('/student/projectSpecification')}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            >
                Submit Project Specification
            </button>
        </div>
    );

    const moreThanOneApproved = () => (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col">
            <p className="text-2xl font-bold mb-4 text-green-600">Success!</p>
            <p className="mb-4">Your multiple abstracts have been approved.</p>
            {handleComment(data.comments)}
            <p className="mb-4 mt-4">Select which one you want to use:</p>
            <div className="max-w-md mx-auto p-4">
                <ul className="list-none space-y-2">
                    {data.approvedList.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleItemClick(item)}
                            className={`cursor-pointer p-3 rounded-xl transition-all ${selectedItem === item._id
                                ? 'bg-gray-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
            <label className="mb-4">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                {` Let other students use your remaining abstract`}
            </label>
            <button
                onClick={handleSubmitDetailsClick}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            >
                Submit Project Specification
            </button>
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {wait ? waitDisplay() : data.approvedList.length === 0 ? noneApproved() : data.approvedList.length === 1 ? oneApproved() : moreThanOneApproved()}
        </div>
    );
};

export default CheckIfApproved;
