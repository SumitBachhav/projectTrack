import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckIfApproved = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ approvedList: [], comments: '' });
    const [wait, setWait] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');
    const [hasFinalized, setHasFinalized] = useState(false);

    // Fetch approved abstracts
    const fetchApprovedAbstracts = useCallback(async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/student/getApprovedAbstract`, {
                withCredentials: true
            });
            const { abstracts, hasFinalized } = response.data.data;
            setData({ approvedList: abstracts });
            console.log(hasFinalized)
            setHasFinalized(hasFinalized);
        } catch (error) {
            console.error('Error fetching approved abstracts', error);
        }
    }, []);

    useEffect(() => {
        fetchApprovedAbstracts();
    }, [fetchApprovedAbstracts]);

    // Handle item click
    const handleItemClick = useCallback((item) => {
        if (selectedItem !== item._id) {
            setSelectedItem(item._id);
        }
    }, [selectedItem]);

    // Handle submit button click
    const handleSubmitDetailsClick = useCallback(async () => {
        if (selectedItem) {
            let donatedIds = null;
            if (isChecked) {
                donatedIds = data.approvedList.filter(item => item._id !== selectedItem).map(item => item._id);
                console.log(donatedIds);
                // Uncomment for actual donation logic:
                // try {
                //     const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/student/donateAbstracts`, { donatedIds }, { withCredentials: true });
                // } catch (error) {
                //     console.error('Error donating abstract', error);
                // }
            }
            const selectedData = data.approvedList.find(item => item._id === selectedItem);
            setError('');
            navigate('/student/projectSpecification', { state: { abstract: selectedData, donatedIds } });
        } else {
            setError('Please select a title');
        }
    }, [selectedItem, isChecked, data.approvedList, navigate]);

    // Handle checkbox change
    const handleCheckboxChange = useCallback(() => {
        setIsChecked(prev => !prev);
    }, []);

    // Render comment section
    const renderComments = useCallback((comment) => (
        <div className="mb-4">
            <strong>Comments:</strong>
            {comment.length > 0
                ? comment.map((item, index) => <div key={index}>{item}</div>)
                : 'None'}
        </div>
    ), []);

    // UI components
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
            <p className="mb-4">Please check Submitted Abstracts for comments of your abstract</p>
            <p className="mb-4">Please check for available projects or join a team</p>
            <button
                onClick={() => navigate('/student/availableProjects')}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            >
                Check for available projects
            </button>
            <button
                onClick={() => navigate('/student/availableGroups')}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            >
                Check for available Groups
            </button>
        </div>
    );

    const oneApproved = () => (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-2xl font-bold mb-4">Success!</p>
            <p className="mb-4">Your abstract titled "{data.approvedList[0].title}" has been approved.</p>
            {renderComments(data.approvedList[0].comments)}
            <button
                onClick={() => navigate('/student/projectSpecification', { state: { abstract: data.approvedList[0] } })}
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
            {data.approvedList.map((item, index) => (
                <div key={index}>
                    <p className="mb-2"><strong>Title: </strong>{item.title}</p>
                    {renderComments(item.comments)}
                </div>
            ))}
            { !hasFinalized && <div className='flex flex-col'>
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
                    {' Let other students use your remaining abstract'}
                </label>
                <button
                    onClick={handleSubmitDetailsClick}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
                >
                    Submit Project Specification
                </button>
            </div>}
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );

    // Main render logic
    const renderContent = () => {
        if (wait) return waitDisplay();
        if (data.approvedList.length === 0) return noneApproved();
        if (data.approvedList.length === 1) return oneApproved();
        return moreThanOneApproved();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-16">
            {renderContent()}
        </div>
    );
};

export default CheckIfApproved;
