import React from 'react'

const GroupMembers = () => {

    const data = {
        GroupLead: { name: "Alice", domain: ["Frontend", "Data Science"], skills: ["HTML", "CSS", "JavaScript", "Python", "Machine Learning", "Pandas"] },
        members: [
            { name: "Bob", domain: ["Backend"], skills: ["Node.js", "Express", "MongoDB"] },
            { name: "Charlie", domain: ["Data Science"], skills: ["Python", "Machine Learning", "Pandas"] },
            { name: "David", domain: ["Frontend"], skills: ["React", "JavaScript", "CSS"] },
        ],
    }

    return (
        <div className='mt-16'>
            <div className="p-6 max-w-4xl mx-auto bg-slate-50 shadow-lg rounded-lg mt-32">
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800">Group ID: 21</h2>

                    <div className="mt-6">
                        <h3 className="text-xl font-medium text-blue-600">Group lead</h3>

                        <ul className="mt-2 space-y-2">
                            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100">
                                <div>
                                    <span className="text-gray-700"><strong>{data.GroupLead.name}</strong></span><br />
                                    <span className="text-gray-700">{data.GroupLead.domain.join(', ')}</span><br />
                                    <span className="text-gray-700">{data.GroupLead.skills.join(', ')}</span>
                                </div>

                                <button className="text-sm text-green-500 hover:underline">Asign Task</button>
                            </li>
                        </ul>
                    </div>

                    {/* Group members */}
                    <div className="mt-6">
                        <h3 className="text-xl font-medium text-green-600">Members</h3>
                        {data.members.length > 0 ? (
                            <ul className="mt-2 space-y-2">
                                {data.members.map((member, index) => (
                                    <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100">
                                        <div>
                                        <span className="text-gray-700"><strong>{member.name}</strong></span><br />
                                        <span className="text-gray-700">{member.domain.join(', ')}</span><br />
                                        <span className="text-gray-700">{member.skills.join(', ')}</span>
                                        </div>
                                        <button className="text-sm text-green-500 hover:underline">Asign Task</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-2 text-gray-500">No received invitations.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupMembers