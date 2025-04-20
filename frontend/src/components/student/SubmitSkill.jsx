// /student/submitSkills
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SkillSetSubmission = () => {
    const navigate = useNavigate();
    const [currentFormData, setCurrentFormData] = useState({
        domain: "",
        skills: [],
        experience: "",
    });

    const [allSkills, setAllSkills] = useState([]);
    const [submittedDomains, setSubmittedDomains] = useState([]);

    const [domains, setDomains] = useState([]);
    const [skillOptions, setSkillOptions] = useState([]);

    useEffect(() => {
        const fetchDomainsAndSkills = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/getDomainsAndSkills`, {
                    withCredentials: true
                });
                setSkillOptions(response.data.data.domainsWithSkills);
                console.log(response.data.data.domainsWithSkills);
                let d = Object.keys(response.data.data.domainsWithSkills);
                setDomains(d);
            } catch (error) {
                console.error('Error fetching domains:', error);
            }
        };

        fetchDomainsAndSkills();
    }, []);

    // const domains = ["Web Development", "Data Science", "UI/UX Design", "DevOps"];
    // const skillOptions = {
    //     "Web Development": ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    //     "Data Science": ["Python", "R", "Pandas", "NumPy", "TensorFlow"],
    //     "UI/UX Design": ["Figma", "Adobe XD", "Sketch", "InVision"],
    //     "DevOps": ["Docker", "Kubernetes", "Jenkins", "AWS", "Terraform"],
    // }; 

    const handleDomainChange = (e) => {
        const domain = e.target.value;
        setCurrentFormData({
            ...currentFormData,
            domain,
            skills: [], // Reset skills when domain changes
        });
    };

    const handleSkillChange = (e) => {
        const skill = e.target.value;
        const isChecked = e.target.checked;

        setCurrentFormData((prevState) => {
            const updatedSkills = isChecked
                ? [...prevState.skills, skill]
                : prevState.skills.filter((s) => s !== skill);
            return { ...prevState, skills: updatedSkills };
        });
    };

    const handleExperienceChange = (e) => {
        setCurrentFormData({ ...currentFormData, experience: e.target.value });
    };

    const handleAddSkillSet = (e) => {
        e.preventDefault();
        if (currentFormData.skills.length === 0) {
            alert("Please select at least one skill before submitting.");
            return;
        }
        setAllSkills([...allSkills, currentFormData]);
        setSubmittedDomains([...submittedDomains, currentFormData.domain]);
        setCurrentFormData({ domain: "", skills: [], experience: "" });
    };

    const handleDeleteSkillSet = (index) => {
        const deletedSkillSet = allSkills[index];
        setAllSkills(allSkills.filter((_, i) => i !== index));
        setSubmittedDomains(submittedDomains.filter((d) => d !== deletedSkillSet.domain));
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(allSkills);
            await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/student/submitSkills`, allSkills, {
                withCredentials: true
            });
            alert('Skills submitted successfully!');
            navigate('/student/dashboard');  // Navigate to dashboard after successful submission
        } catch (error) {
            console.error('Skill Set Submission error:', error);
            alert('Skill Set Submission failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 mt-10">
            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
                {/* Form Section */}
                <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-2/3">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Add Skill Set
                    </h1>
                    <form onSubmit={handleAddSkillSet} className="space-y-4">
                        {/* Domain Dropdown */}
                        <div>
                            <label
                                htmlFor="domain"
                                className="block text-sm font-medium text-gray-700"
                            >
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
                                {domains.map((domain) => (
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

                        {/* Skills Checkboxes */}
                        {currentFormData.domain && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Skills
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {skillOptions[currentFormData.domain]?.map((skill) => (
                                        <label key={skill} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value={skill}
                                                checked={currentFormData.skills.includes(skill)}
                                                onChange={handleSkillChange}
                                                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                                            />
                                            <span className="ml-2 text-gray-700">{skill}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Experience Input */}
                        <div>
                            <label
                                htmlFor="experience"
                                className="block text-sm font-medium text-gray-700"
                            >
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

                        {/* Add Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        >
                            Add Skill Set
                        </button>
                    </form>
                </div>

                {/* Skill Sets List Section */}
                <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-1/3">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Submitted Skill Sets
                    </h2>
                    {allSkills.length === 0 ? (
                        <p className="text-gray-600">No skill sets added yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {allSkills.map((skillSet, index) => (
                                <li
                                    key={index}
                                    className="p-4 border border-gray-300 rounded-lg shadow-sm flex items-center justify-between"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700">
                                            {skillSet.domain}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Skills: {skillSet.skills.join(", ")}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Experience: {skillSet.experience} years
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteSkillSet(index)}
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

            {/* Final Submit Button */}
            {allSkills.length > 0 && (
                <button
                    onClick={handleFinalSubmit}
                    className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                    Submit
                </button>
            )}
            <a href="https://forms.gle/DaoWzq3cTGdMqX1F9" target="_blank" className="text-blue-500 mt-5 hover:underline hover:font-semibold">Cannot find your domain or skill? </a>
            <p className="text-sm text-gray-600">Note: Do not submit any skill if any of the domains or skills are not listed.</p>
            <p className="text-sm text-gray-600">You can come back to this page to add your skill sets after you get a conformation email.</p>
        </div>
    );
};

export default SkillSetSubmission;
