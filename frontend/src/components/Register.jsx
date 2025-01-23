// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        userId: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendData = async () => {
        let obj = { 
            name: formData.name, 
            email: formData.email, 
            password: formData.password, 
            userId: formData.userId,
            role: formData.role, 
        };
        let x = await axios.post('/api/v1/user/register', obj);
        console.log(x);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        await sendData();
        // console.log(formData); // Replace with a fetch request to send data to the backend

        if (formData.role === "student") {
            window.location.href = '/register/student';
        } else if (formData.role === "staff") {
            window.location.href = '/register/staff';
        } else if (formData.role === "coordinator") {
            window.location.href = '/register/coordinator';
        }
    };

    return (
        <div className="container pt-36 mx-auto py-12 px-6 bg-white shadow-md rounded-md max-w-xl">
            <h1 className="text-2xl font-semibold text-dodgerblue-600 mb-6 text-center">Register</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500" placeholder="Enter your name" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500" placeholder="Enter your email" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500" placeholder="Enter your password" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500" placeholder="Confirm your password" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">UserId</label>
                    <input type="text" name="userId" value={formData.userId} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500" placeholder="Enter your userId" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:border-sky-blue-500" required>
                        <option value="">Select a role</option>
                        <option value="student">Student</option>
                        <option value="staff">Staff</option>
                        <option value="coordinator">Coordinator</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-medium shadow hover:bg-dodgerblue-500 focus:outline-none">
                    Next
                </button>
            </form>
        </div>
    );
};

export default Register;
