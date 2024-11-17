// StaffForm.jsx
import React, { useState } from 'react';

const StaffForm = () => {
    const [formData, setFormData] = useState({
        domains: [],
        relatedSkills: '',
        experience: '',
        expertise: ''
    });

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            domains: checked
                ? [...prev.domains, value]
                : prev.domains.filter((domain) => domain !== value)
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Replace with a fetch request to send data to the backend
    };

    return (
        <div className="container pt-36 mx-auto py-12 px-6 bg-white shadow-md rounded-md max-w-xl">
            <h2 className="text-2xl font-bold text-center mb-6">Staff Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Domain</label>
                    <div className="grid grid-cols-2 gap-2">
                        {["Data Science", "Machine Learning", "Cyber Security", "Web Development"].map((domain, index) => (
                            <div key={index} className="flex items-center">
                                <input type="checkbox" value={domain} onChange={handleCheckboxChange} className="mr-2" />
                                <label className="text-gray-700">{domain}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Expertise</label>
                    <input type="text" name="expertise" value={formData.expertise} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Related Skills</label>
                    <input type="text" name="relatedSkills" value={formData.relatedSkills} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Experience</label>
                    <input type="text" name="experience" value={formData.experience} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default StaffForm;
