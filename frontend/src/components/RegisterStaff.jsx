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
    employedInInstitution: true, // Default to true, can be changed
    availability: true, // Default to true, can be changed
    department: '', 
    googleScholar: '' // Optional field
  });

  const [errors, setErrors] = useState({});

  const departmentOptions = [
    'Civil Engineering',
    'Mechanical Engineering', 
    'Electrical Engineering',
    'Computer Engineering',
    'Information Technology',
    'Electronics and Telecommunication Engineering',
    'Artificial Intelligence and Data Science'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.userID.trim()) {
      newErrors.userID = 'User ID is required';
    }
    
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    
    // Google Scholar is optional, so no validation needed
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData({ ...formData, [name]: fieldValue });
    
    // Clear error when user starts typing/selecting
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Prepare data according to Staff model structure
      const staffData = {
        userID: formData.userID.trim(), // Ensure lowercase and trimmed
        employedInInstitution: formData.employedInInstitution,
        availability: formData.availability,
        department: formData.department,
        googleScholar: formData.googleScholar.trim() || undefined // Send undefined if empty
      };
      
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/register-staff`, staffData, {
        withCredentials: true
      });
      
      console.log('Staff registration data:', staffData);
      alert('Registration successful. Please submit your skill sets.');
      navigate('/staff/submitSkills');
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle specific validation errors from backend
      if (error.response?.data?.message) {
        if (error.response.data.message.includes('duplicate') || error.response.data.message.includes('unique')) {
          setErrors({ userID: 'This User ID is already registered' });
        } else {
          alert(`Registration failed: ${error.response.data.message}`);
        }
      } else {
        alert('Registration failed. Please try again.');
      }
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
            className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-sky-blue-500"
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
            className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-sky-blue-500"
          />
        </div>
        
        {/* User ID Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="userID"
            value={formData.userID}
            onChange={handleChange}
            placeholder="Enter your User ID (e.g., n987654321)"
            className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500 ${
              errors.userID ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.userID && <p className="text-red-500 text-sm mt-1">{errors.userID}</p>}
          <p className="text-gray-500 text-xs mt-1">Will be automatically converted to lowercase</p>
        </div>
        
        {/* Employment Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="employedInInstitution"
                checked={formData.employedInInstitution}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm">Employed in Institution</span>
            </label>
          </div>
        </div>
        
        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm">Currently Available</span>
            </label>
          </div>
        </div>
        
        {/* Department Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500 ${
              errors.department ? 'border-red-500' : ''
            }`}
            required
          >
            <option value="">Select Department</option>
            {departmentOptions.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
        </div>
        
        {/* Google Scholar Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Google Scholar Profile <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="url"
            name="googleScholar"
            value={formData.googleScholar}
            onChange={handleChange}
            placeholder="Enter your Google Scholar profile URL"
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500"
          />
          <p className="text-gray-500 text-xs mt-1">Optional: Provide your Google Scholar profile link</p>
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-medium shadow hover:bg-dodgerblue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
        >
          Register Staff
        </button>
      </form>
    </div>
  );
};

export default RegisterStaff;