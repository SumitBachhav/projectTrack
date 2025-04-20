// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const RegisterStudent = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { user } = state || {};

    if (!user) return null;

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
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/register-student`, formData, {
                withCredentials: true
            });
            alert('Registration successful. Please submit your skill sets.');
            navigate('/student/submitSkills');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    };

    const inputClass = "mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500";

    return (
        <div className="container pt-36 mx-auto py-12 px-6 bg-white shadow-md rounded-md max-w-xl">
            <h1 className="text-2xl font-semibold text-dodgerblue-600 mb-6 text-center">Register Student</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {[{ label: 'Name', value: user.name }, { label: 'Role', value: user.role }].map(({ label, value }) => (
                    <div key={label}>
                        <label className="block text-sm font-medium text-gray-700">{label}</label>
                        <input type="text" value={value} readOnly className={inputClass} />
                    </div>
                ))}

                <div>
                    <label className="block text-sm font-medium text-gray-700">User ID</label>
                    <input
                        type="text"
                        name="userID"
                        value={formData.userID}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Enter your User ID (e.g., N987654321)"
                        required
                    />
                </div>

                {[
                    { name: 'year', options: ['1', '2', '3', '4'] },
                    { name: 'division', options: ['A', 'B', 'None'] },
                    { name: 'department', options: ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Computer Engineering', 'Information Technology', 'Electronics and Telecommunication Engineering', 'Artificial Intelligence and Data Science'] }
                ].map(({ name, options }) => (
                    <div key={name}>
                        <label className="block text-sm font-medium text-gray-700">{name.charAt(0).toUpperCase() + name.slice(1)}</label>
                        <select
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        >
                            <option value="">Select {name}</option>
                            {options.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}

                {[{ name: 'certificates', placeholder: 'Enter your certificates URL' },
                  { name: 'github', placeholder: 'Enter your GitHub profile URL', type: 'url' }].map(({ name, placeholder, type = 'text' }) => (
                    <div key={name}>
                        <label className="block text-sm font-medium text-gray-700">{name.charAt(0).toUpperCase() + name.slice(1)}</label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder={placeholder}
                            required
                        />
                    </div>
                ))}

                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-medium shadow hover:bg-dodgerblue-500 focus:outline-none">
                    Register Student
                </button>
            </form>
        </div>
    );
};

export default RegisterStudent;
