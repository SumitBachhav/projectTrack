// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const RegisterStudent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = location.state || {};
    console.log("in register page", user);
    if (!user) {
        return null;
    }
    const [formData, setFormData] = useState({
        userID: '',
        year: '',
        division: '',
        department: '',
        certificates: '',
        github: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/v1/user/register-student', formData);
            alert('Registration successful. Please submit your skill sets.');
            navigate('/student/submitSkills');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container pt-36 mx-auto py-12 px-6 bg-white shadow-md rounded-md max-w-xl">
            <h1 className="text-2xl font-semibold text-dodgerblue-600 mb-6 text-center">Register Student</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                        type="text" 
                        name="userID" 
                        value={user.name} 
                        disabled={true}
                        readOnly
                        className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500" 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <input 
                        type="text" 
                        name="userID" 
                        value={user.role}
                        readOnly
                        className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500" 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">User ID</label>
                    <input 
                        type="text" 
                        name="userID" 
                        value={formData.userID} 
                        onChange={handleChange} 
                        className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500" 
                        placeholder="Enter your User ID (e.g., N987654321)" 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <select 
                        name="year" 
                        value={formData.year} 
                        onChange={handleChange} 
                        className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500" 
                        required
                    >
                        <option value="">Select Year</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Division</label>
                    <select 
                        name="division" 
                        value={formData.division} 
                        onChange={handleChange} 
                        className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500" 
                        required
                    >
                        <option value="">Select Division</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="None">None</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select 
                        name="department" 
                        value={formData.department} 
                        onChange={handleChange} 
                        className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500" 
                        required
                    >
                        <option value="">Select Department</option>
                        <option value="Computer">Computer</option>
                        <option value="IT">IT</option>
                        <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
                        <option value="ENTC">ENTC</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Certificates</label>
                    <input 
                        type="text" 
                        name="certificates" 
                        value={formData.certificates} 
                        onChange={handleChange} 
                        className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500" 
                        placeholder="Enter your certificates URL" 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">GitHub</label>
                    <input 
                        type="url" 
                        name="github" 
                        value={formData.github} 
                        onChange={handleChange} 
                        className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500" 
                        placeholder="Enter your GitHub profile URL" 
                        required 
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-medium shadow hover:bg-dodgerblue-500 focus:outline-none">
                    Register Student
                </button>
            </form>
        </div>
    );
};

export default RegisterStudent;
