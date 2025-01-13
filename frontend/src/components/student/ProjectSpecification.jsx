import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ProjectSpecification = () => {

    const navigate = useNavigate();

    const [domainSkills, setDomainSkills] = useState([
        { domain: '', skill: '' },
    ]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedDomainSkills = [...domainSkills];
        updatedDomainSkills[index][name] = value;
        setDomainSkills(updatedDomainSkills);
    };

    const addDomainSkillSet = () => {
        setDomainSkills([...domainSkills, { domain: '', skill: '' }]);
    };

    const removeDomainSkillSet = (index) => {
        const updatedDomainSkills = domainSkills.filter((_, i) => i !== index);
        setDomainSkills(updatedDomainSkills);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // let variable = false;
        // domainSkills.forEach((entry) => {
        //     if (entry.domain === '' || entry.skill === '') {
        //         variable = true;
        //     }
        // })
        // if (variable) {
        //     alert('Please fill all the fields');
        // } else {
        //     navigate('/student/inviteStudents');
        // }
        navigate('/student/inviteStudents');

    };


    return (
        <div className="flex md:flex-row pt-20 justify-center items-center gap-8 bg-gray-100 min-h-screen">
            <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 m-1 mb-3">
                <form onSubmit={handleSubmit}>
                    <p className="text-2xl font-bold mb-4">
                        enter required skills and their respective domains
                    </p>
                    {domainSkills.map((entry, index) => (
                        <div key={index} className="domain-skill-entry">
                            <label>
                                Domain:
                                <input
                                    type="text"
                                    name="domain"
                                    value={entry.domain}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder="Enter domain"
                                    className='m-2'
                                    required
                                />
                            </label>
                            <label>
                                Skill:
                                <input
                                    type="text"
                                    name="skill"
                                    value={entry.skill}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder="Enter skill"
                                    className='m-2'
                                    required
                                />
                            </label>
                            <button
                                type="button"
                                onClick={() => removeDomainSkillSet(index)}
                                disabled={domainSkills.length <= 1}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 m-2"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div>
                        <button type="button"
                            onClick={addDomainSkillSet}
                            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 m-2"
                        >
                            Add More
                        </button>
                    </div>
                    <button type="submit"
                        // disabled={domainSkills[0].domain === '' ? true : false}
                        // disabled={domainSkills[0].domain === '' || domainSkills[0].skill === '' ? true : false}
                        // onClick={() => navigate('/student/inviteStudents')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 m-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ProjectSpecification