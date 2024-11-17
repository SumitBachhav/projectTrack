// StudentForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentForm = () => {
    const [formData, setFormData] = useState({
        division: '',
        skills: '',
        certifications: '',
        github: '',
        linkedin: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Replace with a fetch request to send data to the backend
        navigate('/login');
    };

    return (
        <div className="container pt-36 mx-auto py-12 px-6 bg-white shadow-md rounded-md max-w-xl">
            <h2 className="text-2xl font-bold text-center mb-6">Student Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Division</label>
                    <select name="division" value={formData.division} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400">
                        <option value="">Select Division</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="No Division">No Division</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Skills</label>
                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Certifications</label>
                    <input type="text" name="certifications" value={formData.certifications} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">GitHub Profile Link</label>
                    <input type="url" name="github" value={formData.github} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">LinkedIn Profile Link</label>
                    <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default StudentForm;
