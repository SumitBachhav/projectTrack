// Register.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const RegisterStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};
  
  // Early exit if no user is found
  if (!user) {
    return null;
  }

  const [formData, setFormData] = useState({
    userID: '', // This will store the input for User ID
    department: '', 
    googleScholar: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/user/register-staff', formData);
      console.log(formData);
      alert('Registration successful. Please submit your skill sets.');
      navigate('/staff/submitSkills');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container pt-36 mx-auto py-12 px-6 bg-white shadow-md rounded-md max-w-xl">
      <h1 className="text-2xl font-semibold text-dodgerblue-600 mb-6 text-center">Staff Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={user.name}
            disabled
            readOnly
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500"
            required
          />
        </div>
        
        {/* Role Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            value={user.role}
            disabled
            readOnly
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500"
            required
          />
        </div>
        
        {/* User ID Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">User ID</label>
          <input
            type="text"
            name="userID"
            value={formData.userID}
            onChange={handleChange}
            placeholder="Enter your User ID (e.g., N987654321)"
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500"
            required
          />
        </div>
        
        {/* Department Field */}
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
        
        {/* Google Scholar Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Google Scholar</label>
          <input
            type="text"
            name="googleScholar"
            value={formData.googleScholar}
            onChange={handleChange}
            placeholder="Enter your Google Scholar ID"
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500"
            required
          />
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-medium shadow hover:bg-dodgerblue-500 focus:outline-none"
        >
          Register Staff
        </button>
      </form>
    </div>
  );
};

export default RegisterStaff;
