import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPasswords, setShowPasswords] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPasswords((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match.' });
            return;
        }

        try {
            setLoading(true);
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/v1/user/changePassword`,
                {
                    oldPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                },
                { withCredentials: true }
            );

            console.log(formData.currentPassword, formData.newPassword);
            setLoading(false);

            setMessage({ type: 'success', text: response.data.message || 'Password updated successfully!' });
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            const errMsg = error.response?.data?.message || 'Failed to change password.';
            setMessage({ type: 'error', text: errMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-32">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Change Password</h2>

            {message.text && (
                <div
                    className={`mb-4 text-sm px-4 py-2 rounded ${message.type === 'error'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-green-100 text-green-700'
                        }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                        type={showPasswords ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                        type={showPasswords ? 'text' : 'password'}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                        type={showPasswords ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        id="showPasswords"
                        type="checkbox"
                        checked={showPasswords}
                        onChange={togglePasswordVisibility}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="showPasswords" className="text-sm text-gray-600">
                        Show Passwords
                    </label>
                </div>

                {/* Submit and Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Change Password'}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/student/dashboard')}
                        className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-md hover:bg-green-200 transition text-sm font-medium"
                    >
                        Go to Dashboard
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/student/dashboard')}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition text-sm font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
