import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StaffForm = () => {
    const navigate = useNavigate();
    const [currentFormData, setCurrentFormData] = useState({
        domain: "",
        experience: "",
    });

    const [allDomains, setAllDomains] = useState([]);
    const [submittedDomains, setSubmittedDomains] = useState([]);
    const [fetchedDomains, setFetchedDomains] = useState([]);

    useEffect(() => {
        const fetchDomains = async () => {
            try {
                const response = await axios.get('/api/v1/user/getDomains');
                setFetchedDomains(response.data.data.domains);
                console.log(response.data.data.domains);
            } catch (error) {
                console.error('Error fetching domains:', error);
            }
        };

        fetchDomains();
    }, []);

    const handleDomainChange = (e) => {
        const domain = e.target.value;
        setCurrentFormData({
            ...currentFormData,
            domain,
        });
    };

    const handleExperienceChange = (e) => {
        setCurrentFormData({ ...currentFormData, experience: e.target.value });
    };

    const handleAddDomain = (e) => {
        e.preventDefault();
        if (!currentFormData.domain || !currentFormData.experience) {
            alert("Please select a domain and provide experience before submitting.");
            return;
        }
        setAllDomains([...allDomains, currentFormData]);
        setSubmittedDomains([...submittedDomains, currentFormData.domain]);
        setCurrentFormData({ domain: "", experience: "" });
    };

    const handleDeleteDomain = (index) => {
        const deletedDomain = allDomains[index];
        setAllDomains(allDomains.filter((_, i) => i !== index));
        setSubmittedDomains(submittedDomains.filter((d) => d !== deletedDomain.domain));
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(allDomains);
            await axios.post('/api/v1/staff/setStaffExpertise', allDomains);
            alert('Domain data submitted successfully!');
            navigate('/staff/dashboard');
        } catch (error) {
            console.error('Domain Submission error:', error);
            alert('Domain Submission failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 mt-10">
            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
                {/* Form Section */}
                <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-2/3">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Add Domain and Experience
                    </h1>
                    <form onSubmit={handleAddDomain} className="space-y-4">
                        <div>
                            <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
                                Domain
                            </label>
                            <select
                                id="domain"
                                name="domain"
                                value={currentFormData.domain}
                                onChange={handleDomainChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="" disabled>
                                    Select a Domain
                                </option>
                                {fetchedDomains.map((domain) => (
                                    <option
                                        key={domain}
                                        value={domain}
                                        disabled={submittedDomains.includes(domain)}
                                    >
                                        {domain}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                                Experience (in years)
                            </label>
                            <input
                                type="number"
                                id="experience"
                                name="experience"
                                value={currentFormData.experience}
                                onChange={handleExperienceChange}
                                placeholder="e.g., 3"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                                min="0"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        >
                            Add Domain and Experience
                        </button>
                    </form>
                </div>

                {/* Submitted Domains List Section */}
                <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-1/3">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Submitted Domains
                    </h2>
                    {allDomains.length === 0 ? (
                        <p className="text-gray-600">No domain data added yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {allDomains.map((domainSet, index) => (
                                <li
                                    key={index}
                                    className="p-4 border border-gray-300 rounded-lg shadow-sm flex items-center justify-between"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700">
                                            {domainSet.domain}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Experience: {domainSet.experience} years
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteDomain(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md focus:ring-2 focus:ring-red-400 focus:ring-offset-2 ml-auto"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {allDomains.length > 0 && (
                <button
                    onClick={handleFinalSubmit}
                    className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                    Submit
                </button>
            )}
            <a href="https://forms.gle/DaoWzq3cTGdMqX1F9" target="_blank" className="text-blue-500 mt-5 hover:underline hover:font-semibold">Cannot find your domain ? </a>
            <p className="text-sm text-gray-600">Note: Do not submit any domains if any of the domains are not listed.</p>
            <p className="text-sm text-gray-600">You can come back to this page to add your skill sets after you get a conformation email.</p>
        </div>
    );
};

export default StaffForm;
