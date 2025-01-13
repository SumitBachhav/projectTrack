import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Fake data for students and project requirements
// const studentsData = [
//     { name: 'Alice', domain: ['Frontend', 'Data Science'], skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'Machine Learning', 'Pandas'] },
//     { name: 'Bob', domain: ['Backend'], skills: ['Node.js', 'Express', 'MongoDB'] },
//     { name: 'Charlie', domain: ['Data Science'], skills: ['Python', 'Machine Learning', 'Pandas'] },
//     { name: 'David', domain: ['Frontend'], skills: ['React', 'JavaScript', 'CSS'] },
//     { name: 'Eve', domain: ['Backend'], skills: ['Node.js', 'MongoDB', 'Express'] },
//     { name: 'Alice', domain: ['Frontend', 'Data Science'], skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'Machine Learning', 'Pandas'] },
//     { name: 'Bob', domain: ['Backend'], skills: ['Node.js', 'Express', 'MongoDB'] },
//     { name: 'Charlie', domain: ['Data Science'], skills: ['Python', 'Machine Learning', 'Pandas'] },
//     { name: 'David', domain: ['Frontend'], skills: ['React', 'JavaScript', 'CSS'] },
//     { name: 'Eve', domain: ['Backend'], skills: ['Node.js', 'MongoDB', 'Express'] },
//     { name: 'Alice', domain: ['Frontend', 'Data Science'], skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'Machine Learning', 'Pandas'] },
//     { name: 'Bob', domain: ['Backend'], skills: ['Node.js', 'Express', 'MongoDB'] },
//     { name: 'Charlie', domain: ['Data Science'], skills: ['Python', 'Machine Learning', 'Pandas'] },
//     { name: 'David', domain: ['Frontend'], skills: ['React', 'JavaScript', 'CSS'] },
//     { name: 'Eve', domain: ['Backend'], skills: ['Node.js', 'MongoDB', 'Express'] },
//     { name: 'Alice', domain: ['Frontend', 'Data Science'], skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'Machine Learning', 'Pandas'] },
//     { name: 'Bob', domain: ['Backend'], skills: ['Node.js', 'Express', 'MongoDB'] },
//     { name: 'Charlie', domain: ['Data Science'], skills: ['Python', 'Machine Learning', 'Pandas'] },
//     { name: 'David', domain: ['Frontend'], skills: ['React', 'JavaScript', 'CSS'] },
//     { name: 'Eve', domain: ['Backend'], skills: ['Node.js', 'MongoDB', 'Express'] },
//     { name: 'Alice', domain: ['Frontend', 'Data Science'], skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'Machine Learning', 'Pandas'] },
//     { name: 'Bob', domain: ['Backend'], skills: ['Node.js', 'Express', 'MongoDB'] },
//     { name: 'Charlie', domain: ['Data Science'], skills: ['Python', 'Machine Learning', 'Pandas'] },
//     { name: 'David', domain: ['Frontend'], skills: ['React', 'JavaScript', 'CSS'] },
//     { name: 'Eve', domain: ['Backend'], skills: ['Node.js', 'MongoDB', 'Express'] },
//     { name: 'Alice', domain: ['Frontend', 'Data Science'], skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'Machine Learning', 'Pandas'] },
//     { name: 'Bob', domain: ['Backend'], skills: ['Node.js', 'Express', 'MongoDB'] },
//     { name: 'Charlie', domain: ['Data Science'], skills: ['Python', 'Machine Learning', 'Pandas'] },
//     { name: 'David', domain: ['Frontend'], skills: ['React', 'JavaScript', 'CSS'] },
//     { name: 'Eve', domain: ['Backend'], skills: ['Node.js', 'MongoDB', 'Express'] },
//     { name: 'Alice', domain: ['Frontend', 'Data Science'], skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'Machine Learning', 'Pandas'] },
//     { name: 'Bob', domain: ['Backend'], skills: ['Node.js', 'Express', 'MongoDB'] },
//     { name: 'Charlie', domain: ['Data Science'], skills: ['Python', 'Machine Learning', 'Pandas'] },
//     { name: 'David', domain: ['Frontend'], skills: ['React', 'JavaScript', 'CSS'] },
//     { name: 'Eve', domain: ['Backend'], skills: ['Node.js', 'MongoDB', 'Express'] },
//     { name: 'Alice', domain: ['Frontend', 'Data Science'], skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'Machine Learning', 'Pandas'] },
//     { name: 'Bob', domain: ['Backend'], skills: ['Node.js', 'Express', 'MongoDB'] },
//     { name: 'Charlie', domain: ['Data Science'], skills: ['Python', 'Machine Learning', 'Pandas'] },
//     { name: 'David', domain: ['Frontend'], skills: ['React', 'JavaScript', 'CSS'] },
//     { name: 'Eve', domain: ['Backend'], skills: ['Node.js', 'MongoDB', 'Express'] },
// ];

const studentsData = [
    { 
        name: 'Alice', 
        domain: ['Frontend', 'Data Science'], 
        skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'Machine Learning', 'Pandas', 'D3.js'] 
    },
    { 
        name: 'Bob', 
        domain: ['Backend', 'DevOps'], 
        skills: ['Node.js', 'Express', 'MongoDB', 'Docker', 'AWS', 'CI/CD'] 
    },
    { 
        name: 'Charlie', 
        domain: ['Data Science', 'AI'], 
        skills: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'TensorFlow', 'Keras'] 
    },
    { 
        name: 'David', 
        domain: ['Frontend', 'UI/UX Design'], 
        skills: ['React', 'JavaScript', 'CSS', 'Figma', 'Adobe XD', 'Wireframing'] 
    },
    { 
        name: 'Eve', 
        domain: ['Backend', 'Cloud Computing'], 
        skills: ['Node.js', 'MongoDB', 'Express', 'AWS', 'Azure', 'Docker'] 
    },
    { 
        name: 'Frank', 
        domain: ['Mobile Development'], 
        skills: ['React Native', 'Java', 'Android', 'Swift', 'Firebase'] 
    },
    { 
        name: 'Grace', 
        domain: ['Cybersecurity', 'Backend'], 
        skills: ['Penetration Testing', 'Python', 'Linux', 'Wireshark', 'Network Security'] 
    },
    { 
        name: 'Hannah', 
        domain: ['Frontend', 'UI/UX Design'], 
        skills: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Sketch', 'User Research'] 
    },
    { 
        name: 'Ivy', 
        domain: ['Cloud Computing', 'DevOps'], 
        skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'] 
    },
    { 
        name: 'Jack', 
        domain: ['Game Development'], 
        skills: ['Unity', 'C#', 'Game Design', '3D Modeling', 'VR/AR'] 
    },
    { 
        name: 'Lily', 
        domain: ['Data Science', 'Business Analytics'], 
        skills: ['R', 'Machine Learning', 'SQL', 'Tableau', 'Power BI', 'Data Visualization'] 
    },
    { 
        name: 'Mason', 
        domain: ['Backend', 'Blockchain'], 
        skills: ['Node.js', 'Express', 'MongoDB', 'Ethereum', 'Smart Contracts', 'Solidity'] 
    }
];



// const projectRequirement = [
//     {
//         domain: 'Frontend',
//         skills: ['JavaScript', 'Node.js', 'CSS'],
//     },
//     {
//         domain: 'Backend',
//         skills: ['Node.js', 'MongoDB', 'Express'],
//     },
//     {
//         domain: 'Data Science',
//         skills: ['Python', 'Machine Learning', 'Pandas'],
//     },
//     {
//         domain: 'Data Science',
//         skills: ['Python', 'Machine Learning', 'Pandas'],
//     },
//     {
//         domain: 'Data Science',
//         skills: ['Python', 'Machine Learning', 'Pandas'],
//     },
//     {
//         domain: 'Data Science',
//         skills: ['Python', 'Machine Learning', 'Pandas'],
//     },
//     {
//         domain: 'Data Science',
//         skills: ['Python', 'Machine Learning', 'Pandas'],
//     },
//     {
//         domain: 'Data Science',
//         skills: ['Python', 'Machine Learning', 'Pandas'],
//     },
//     {
//         domain: 'Data Science',
//         skills: ['Python', 'Machine Learning', 'Pandas'],
//     },
//     {
//         domain: 'Data Science',
//         skills: ['Python', 'Machine Learning', 'Pandas'],
//     },
//     {
//         domain: 'Data Science',
//         skills: ['Python', 'Machine Learning', 'Pandas'],
//     },
//     {
//         domain: 'Data Science',
//         skills: ['Python', 'Machine Learning', 'Pandas'],
//     },
//     {
//         domain: 'Data Science',
//         skills: ['Python', 'Machine Learning', 'Pandas'],
//     },
//     {
//         domain: 'Data Science',
//         skills: ['Python', 'Machine Learning', 'Pandas'],
//     },
//     {
//         domain: 'Data Science',
//         skills: ['Python', 'Machine Learning', 'Pandas'],
//     }
// ]

const projectRequirement = [
    {
        domain: 'Frontend',
        skills: ['JavaScript', 'React', 'CSS', 'HTML'],
    },
    {
        domain: 'Backend',
        skills: ['Node.js', 'MongoDB', 'Express', 'RESTful APIs'],
    },
    {
        domain: 'Data Science',
        skills: ['Python', 'Machine Learning', 'Pandas', 'NumPy'],
    },
    {
        domain: 'UI/UX Design',
        skills: ['Figma', 'Sketch', 'Adobe XD', 'Wireframing'],
    },
    {
        domain: 'Mobile Development',
        skills: ['React Native', 'Swift', 'Android', 'Firebase'],
    },
    {
        domain: 'Cloud Computing',
        skills: ['AWS', 'Azure', 'Docker', 'Kubernetes'],
    },
    {
        domain: 'DevOps',
        skills: ['CI/CD', 'Docker', 'Kubernetes', 'Jenkins'],
    },
    {
        domain: 'Game Development',
        skills: ['Unity', 'C#', '3D Modeling', 'Game Design'],
    },
    {
        domain: 'Cybersecurity',
        skills: ['Penetration Testing', 'Firewalls', 'Cryptography', 'Ethical Hacking'],
    },
    {
        domain: 'Digital Marketing',
        skills: ['SEO', 'Google Ads', 'Content Marketing', 'Social Media Marketing'],
    }
];



const InviteStuents = () => {

    const navigate = useNavigate();

    const [selectedStudents, setSelectedStudents] = useState([]);
    let selects = [];

    const [repeatedSkills, setRepeatedSkills] = useState([]);

    const [selectedSkills, setselectedSkills] = useState([]);




    const handleAddSkills = (skills) => {
        let tempRepeatSkills = []
        let tempSelectSkills = []
        skills.forEach((skill) => {
            if (!repeatedSkills.includes(skill)) {
                if (selectedSkills.includes(skill)) {
                    tempRepeatSkills.push(skill)
                } else {
                    tempSelectSkills.push(skill)
                }
            }
        });
        if (tempRepeatSkills.length > 0) {
            setRepeatedSkills([...repeatedSkills, ...tempRepeatSkills]);
        }
        if (tempSelectSkills.length > 0) {
            setselectedSkills([...selectedSkills, ...tempSelectSkills]);
        }
    }

    const handleRemoveSkills = (skills) => {
        let tempRepeatSkills = repeatedSkills;
        let tempSelectSkills = selectedSkills;
        skills.forEach((skill) => {
            if (repeatedSkills.includes(skill)) {
                tempRepeatSkills = tempRepeatSkills.filter((item) => item !== skill);
            } else {
                tempSelectSkills = tempSelectSkills.filter((item) => item !== skill);
            }
        });
        if (tempRepeatSkills != repeatedSkills) {
            setRepeatedSkills(tempRepeatSkills);
        }
        if (tempSelectSkills != selectedSkills) {
            setselectedSkills(tempSelectSkills);
        }
    }

    const handleStudentClick = (student) => {
        if (selectedStudents.includes(student.name)) {
            selects = selectedStudents.filter((item) => item !== student.name);
            setSelectedStudents(selects);
            handleRemoveSkills(student.skills);
        } else {
            selects = [...selectedStudents, student.name];
            setSelectedStudents(selects);
            handleAddSkills(student.skills);

        }
    };


    const handleSendInvite = () => {
        // send data to backend------------------------------------------------------------
        // console.log('Selected Students:', selectedStudents);
        // console.log('Selected Skills:', selectedSkills);
        // console.log('Repeated Skills:', repeatedSkills);
        if (selectedStudents.length > 0 && selectedStudents.length <= 6) {
            alert('Invites sent successfully');
            navigate('/student/dashboard');
        } else {
            alert('Please select at least 1 student and at most 6 students');
        }
    };



    const domainCard = (value) => {
        return (
            <div className="rounded shadow-lg bg-white border m-4 border-gray-900">
                <p className='font-bold'>{value}</p>
                {studentsData.filter((item) => item.domain.includes(value)).map((item, index) => (
                    <ul
                        key={index}
                    >
                        <li

                            className={`mb-2 p-2 border border-gray-300 rounded-md m-2 cursor-pointer bg-${selectedStudents.includes(item.name) ? 'green-600' : 'white'} text-${selectedStudents.includes(item.name) ? 'white' : 'black'}  `}
                            onClick={() => handleStudentClick(item)}
                        >
                            {item.name}
                        </li>
                    </ul>
                ))}
            </div>
        )
    }

    return (
        <div className="p-6 mt-12">
            <h1 className="text-3xl font-bold mb-6">Invite Students</h1>
            <div className="mt-8">
                <ul className="list-none p-0">
                    <p className='text-2xl'>Project Requirements</p>
                    {projectRequirement.map((item, index) => (
                        <li key={index} className="mb-2 p-2 border border-gray-300 rounded-md">
                            {item.domain} - {item.skills.map((skill, index) => {
                                return (
                                    <span
                                        key={index}
                                        className={` text-gray-800 ${repeatedSkills.includes(skill) ? 'bg-red-600 text-white' : selectedSkills.includes(skill) ? 'bg-green-600 text-white' : 'bg-yellow-100'} text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300`}
                                    >
                                        {skill}
                                    </span>
                                )
                            })}
                        </li>
                    ))}
                </ul>
            </div>
            <p className='mt-8 text-2xl'>Select Students</p>
            <div className='flex flex-row overflow-auto'>
                {projectRequirement.map((item, index) => (
                    <div className=" bg-gray-100 w-1/4"
                        key={index}>

                        {
                            domainCard(item.domain)
                        }
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <p className='text-2xl'>Selected Students</p>
                <ul className="list-none p-0">
                    {selectedStudents.map((item, index) => (
                        <li key={index} className="mb-2 p-2 border border-gray-300 rounded-md">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
                onClick={handleSendInvite}
            >
                Send Invite
            </button>
        </div>
    );
};

export default InviteStuents;