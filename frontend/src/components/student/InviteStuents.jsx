import React, { useState } from 'react';

// Fake data for students and project requirements
const studentsData = [
    { name: 'Alice', domain: 'Frontend', skills: ['HTML', 'CSS', 'JavaScript'] },
    { name: 'Bob', domain: 'Backend', skills: ['Node.js', 'Express', 'MongoDB'] },
    { name: 'Charlie', domain: 'Data Science', skills: ['Python', 'Machine Learning', 'Pandas'] },
    { name: 'David', domain: 'Frontend', skills: ['React', 'JavaScript', 'CSS'] },
    { name: 'Eve', domain: 'Backend', skills: ['Node.js', 'MongoDB', 'Express'] },
];

const projectRequirement = [
    {
        domain: 'Frontend',
        skills: ['JavaScript', 'Node.js', 'CSS'],
    },
    {
        domain: 'Backend',
        skills: ['Node.js', 'MongoDB', 'Express'],
    },
    {
        domain: 'Data Science',
        skills: ['Python', 'Machine Learning', 'Pandas'],
    }
]



const InviteStuents = () => {
    const [selectedStudents, setSelectedStudents] = useState([]);

    const [skillIncluded, setSkillIncluded] = useState([
        'CSS',
        'javascript',
    ]);

    // Handle selecting/deselecting a student
    // const handleStudentSelection = (studentName) => {
    //     setSelectedStudents((prevSelected) => {
    //         if (prevSelected.includes(studentName)) {
    //             return prevSelected.filter((name) => name !== studentName);
    //         } else {
    //             return [...prevSelected, studentName];
    //         }
    //     });
    // };

    // Filter students who have the required skills for the project
    // const filterStudentsBySkills = () => {
    //     return studentsData.filter((student) => {
    //         return (
    //             student.skills.some((skill) => projectRequirement.skills.includes(skill)) &&
    //             projectRequirement.domains.includes(student.domain)
    //         );
    //     });
    // };

    // Determine if a domain should be dimmed
    // const isDomainDimmed = (domain) => {
    //     return selectedStudents.length > 0 && !studentsData.some((student) => student.name === selectedStudents[0] && student.domain === domain);
    // };

    const badge = (value) => {
        return (
            <span 
                className = {` text-gray-800 ${skillIncluded.includes(value) ? 'bg-green-600 text-white' : 'bg-red-100'} text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300`}
            >
                {value}
            </span>
        )
    }

    return (
        <div className="p-6 mt-12">
            <h1 className="text-3xl font-bold mb-6">Project Requirements</h1>
            <div className="mt-8">
                <ul className="list-none p-0">
                    {projectRequirement.map((item, index) => (
                        <li key={index} className="mb-2 p-2 border border-gray-300 rounded-md">
                            {badge(item.domain)} - {item.skills.map((skill) => badge(skill))}
                        </li>
                    ))}
                </ul>
            </div>
            {/* <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold">Required Domains and Skills</h3>
                <p><strong>Domains:</strong> {projectRequirement.domains.join(', ')}</p>
                <p><strong>Skills:</strong> {projectRequirement.skills.join(', ')}</p>
            </div> */}

            {/* <div className="flex flex-wrap gap-6 mb-8">
                {projectRequirement.domains.map((domain, index) => {
                    const studentsInDomain = studentsData.filter((student) => student.domain === domain);
                    return (
                        <div
                            key={index}
                            className={`bg-white p-6 rounded-lg shadow-md w-1/3 ${isDomainDimmed(domain) ? 'opacity-50' : ''}`}
                        >
                            <h3 className="text-xl font-semibold">{domain} Domain</h3>
                            <ul className="list-none p-0">
                                {studentsInDomain.map((student) => (
                                    <li
                                        key={student.name}
                                        className={`cursor-pointer p-2 rounded-md ${selectedStudents.includes(student.name) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                                        onClick={() => handleStudentSelection(student.name)}
                                    >
                                        {student.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div> */}

            {/* <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Students who match project requirements</h3>
                <ul className="list-none p-0">
                    {filterStudentsBySkills().map((student) => (
                        <li key={student.name} className="mb-2 p-2 border border-gray-300 rounded-md">
                            {student.name} - {student.domain} ({student.skills.join(', ')})
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};

export default InviteStuents;