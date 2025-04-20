// CoordinatorForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CoordinatorForm = () => {
    const [formData, setFormData] = useState({
        department: '',
        expertise: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Replace with a fetch request to send data to the backend
        navigate('/register/successful');
    };

    return (
        <div className="container pt-36 mx-auto py-12 px-6 bg-white shadow-md rounded-md max-w-xl">
            <h2 className="text-2xl font-bold text-center mb-6">Coordinator Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Department</label>
                    <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Expertise</label>
                    <input type="text" name="expertise" value={formData.expertise} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CoordinatorForm;
