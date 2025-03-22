import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UploadAbstracts() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        abstract: '',
        title: '',
        keyword: '',
        domain: '',
    });


    const [error, setError] = useState('');

    const [abstractList, setAbstractList] = useState([]);
    const [sendButtonDisabled, setSendButtonDisabled] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const clear = () => {
        setFormData({
            abstract: '',
            title: '',
            keyword: '',
            domain: '',
        });


        setError('');
    };

    // sending data to backend ----------------------------------------------------------
    const send = async () => {
        // try {
        //     let x = await axios.post('/api/v1/coordinator/submitAbstracts', abstractList);
        //     console.log(x);
        //     // navigate('/student/abstractSubmissionComplete');
        //     alert('Abstracts submitted successfully!');
        //     setAbstractList([]);
        //     setSendButtonDisabled(true);
        // } catch (error) {
        //     console.error('Abstract Submission error:', error);
        // }

        console.log(abstractList)

        try {
            const response = await axios.post(
                'http://localhost:8000/api/insert2',
                abstractList,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );


            alert('Abstracts submitted successfully!');
            setAbstractList([]);
            setSendButtonDisabled(true);
        } catch (error) {
            console.log("error", error);
        }


    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const listObject = {
            abstract: formData.abstract,
            title: formData.title,
            domain: formData.domain,
            keywords: formData.keyword,
        };
        setAbstractList([...abstractList, listObject]);
        setSendButtonDisabled(false);
        clear();
    };

    const handleDelete = (index) => {
        const updatedAbstractList = [...abstractList];
        updatedAbstractList.splice(index, 1);
        setAbstractList(updatedAbstractList);

        if (updatedAbstractList.length === 0) {
            setSendButtonDisabled(true);
        }
    };

    return (
        <div className="flex flex-col md:flex-row pt-20 justify-evenly gap-8 bg-gray-100 min-h-screen">
            <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 m-1 mb-3 w-1/3">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Submit Abstract</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Enter Project Title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Abstract</label>
                        <textarea
                            name="abstract"
                            value={formData.abstract}
                            onChange={handleChange}
                            rows="5"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Type your abstract here..."
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Domain</label>
                        <input
                            type="text"
                            name="domain"
                            value={formData.domain}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Enter Project Domain"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Keywords</label>
                        <input
                            type="text"
                            name="keyword"
                            value={formData.keyword}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Enter Project Keywords"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add
                    </button>
                </form>

                {error && <div className="mt-4 text-red-500 text-center">{error}</div>}


                <div className="flex gap-4 mt-4">
                    <button
                        onClick={clear}
                        className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                    >
                        Clear
                    </button>
                </div>
            </div>

            <div className="w-full md:w-1/3 p-6 bg-white shadow-md rounded-lg m-1 mb-3">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Abstracts</h2>
                <div className="bg-gray-100 p-4 rounded-md shadow-md h-80 overflow-y-auto border">
                    {abstractList.map((localAbstract, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-gray-200 rounded-md p-2 mb-2 border"
                        >
                            <h3 className="text-lg font-medium text-gray-800">{localAbstract.title}</h3>
                            <button
                                onClick={() => handleDelete(index)}
                                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    onClick={send}
                    className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                    disabled={sendButtonDisabled}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default UploadAbstracts;


/*

recieving data from backend -------------------------------------------------------




sending data to backend -----------------------------------------------------------

    [{
    const listObject = {
        abstract: formData.abstract,
        title: formData.title,
        keyword: formData.keyword,
        domain: formData.domain,
        score1: score1,
        score2: score2,
        score3: score3,
        matchedId1: matchedId1,
        matchedId2: matchedId2,
        matchedId3: matchedId3,
    }]
        



*/