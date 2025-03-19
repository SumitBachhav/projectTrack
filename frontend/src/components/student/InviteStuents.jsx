import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InviteStudents = () => {
    const navigate = useNavigate();
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState(new Set());
    const [studentsData, setStudentsData] = useState([]);
    const [projectRequirement, setProjectRequirement] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/student/getProjectAndStudentData`);
                setStudentsData(data.data.matchingStudents);
                setProjectRequirement(data.data.projectRequirements);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, []);

    const projectRequirementDomains = new Set(projectRequirement.map(item => item.domain));

    const handleStudentClick = (student) => {
        setSelectedStudents((prev) => {
            const updatedStudents = prev.includes(student.name)
                ? prev.filter(name => name !== student.name)
                : [...prev, student.name];

            const updatedSkills = new Set(selectedSkills);
            student.skills.forEach(skill => {
                updatedStudents.includes(student.name) ? updatedSkills.add(skill) : updatedSkills.delete(skill);
            });

            setSelectedSkills(updatedSkills);
            return updatedStudents;
        });
    };

    const handleSendInvite = async () => {
        const selectedStudentDetails = studentsData.filter(student => selectedStudents.includes(student.name));
        const selectedStudentIds = selectedStudentDetails.map(student => student.id);
        const selectedStudentDomains = new Set(selectedStudentDetails.flatMap(student => student.domain));

        const matchedDomainCount = [...selectedStudentDomains].filter(domain => projectRequirementDomains.has(domain)).length;
        const coveragePercentage = (matchedDomainCount / projectRequirementDomains.size) * 100;

        if (selectedStudents.length === 0 || selectedStudents.length > 6) {
            alert('Please select at least 1 student and at most 6 students');
            return;
        }

        if (coveragePercentage < 50) {
            alert(`Selected students do not cover enough project domains. Current coverage: ${coveragePercentage.toFixed(2)}%`);
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/student/sendInvitations`, { studentIds: selectedStudentIds });
            if (response.status === 201) {
                alert('Invites sent successfully');
                navigate('/student/dashboard');
            } else {
                alert('Failed to send invitations. Please try again.');
            }
        } catch (error) {
            console.error('Error sending invitations:', error);
            alert(error.response.data.message);
        }
    };

    const domainCard = (domain) => (
        <div className="rounded shadow-lg bg-white border m-4 border-gray-900">
            <p className="font-bold">{domain}</p>
            {studentsData
                .filter(student => student.domain.includes(domain))
                .map((student, index) => (
                    <ul key={index}>
                        <li
                            className={`mb-2 p-2 border border-gray-300 rounded-md m-2 cursor-pointer bg-${
                                selectedStudents.includes(student.name) ? 'green-600 text-white' : 'white text-black'
                            }`}
                            onClick={() => handleStudentClick(student)}
                        >
                            {student.name}
                        </li>
                    </ul>
                ))}
        </div>
    );

    return (
        <div className="p-6 mt-12">
            <h1 className="text-3xl font-bold mb-6">Invite Students</h1>
            
            {/* Project Requirements */}
            <div className="mt-8">
                <p className="text-2xl">Project Requirements</p>
                <ul className="list-none p-0">
                    {projectRequirement.map((item, index) => (
                        <li key={index} className="mb-2 p-2 border border-gray-300 rounded-md">
                            {item.domain} -{' '}
                            {item.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${
                                        selectedSkills.has(skill)
                                            ? 'bg-green-600 text-white'
                                            : 'bg-yellow-100 text-gray-800'
                                    }`}
                                >
                                    {skill}
                                </span>
                            ))}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Select Students */}
            <p className="mt-8 text-2xl">Select Students</p>
            <div className="flex flex-row overflow-auto">
                {projectRequirement.map((item, index) => (
                    <div className="bg-gray-100 w-1/4" key={index}>
                        {domainCard(item.domain)}
                    </div>
                ))}
            </div>

            {/* Selected Students */}
            <div className="mt-8">
                <p className="text-2xl">Selected Students</p>
                <ul className="list-none p-0">
                    {selectedStudents.map((name, index) => (
                        <li key={index} className="mb-2 p-2 border border-gray-300 rounded-md">
                            {name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Send Invite Button */}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
                onClick={handleSendInvite}
            >
                Send Invite
            </button>
        </div>
    );
};

export default InviteStudents;
