import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GroupDetails = () => {
    const [groupData, setGroupData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchGroupDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/student/groupDetails`,{
                        withCredentials: true,
                    });

                console.log(response.data.data)

                if (response.data.data) {
                    setGroupData(response.data.data);
                } else {
                    setError('No group exists.');
                }
            } catch (err) {
                console.error(err);
                setError('Error fetching group details.');
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        // Get user data from sessionStorage
        const user = JSON.parse(sessionStorage.getItem('userData'));
        console.log(user);

        if (!user || !user.childId) {
            setError('User not logged in or session expired.');
            setLoading(false);
            console.log("adf")
            return;
        }

        // display if user not logged in


        

        fetchGroupDetails();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading group details...</div>;

    if (error) return <div className="text-center mt-32 text-red-500 text-xl font-bold">{error}</div>


    if (!groupData) return null;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md mt-16">
            <h2 className="text-2xl font-bold mb-4 text-center">Group Details</h2>

            <p><strong>Status:</strong> {groupData.status}</p>

            <div className="mt-4">
                <h3 className="font-semibold">Project Title</h3>
                <p>{groupData.project?.title || 'N/A'}</p>
            </div>
            <div className="mt-4">
                <h3 className="font-semibold">Abstract</h3>
                <p>{groupData.project?.abstract || 'N/A'}</p>
            </div>
            <div className="mt-4">
                <h3 className="font-semibold">Topic Requirements</h3>
                <p>{groupData.project?.requirements.map((requirement, idx) => `${idx + 1}. ${requirement.domain}`).join('\n') || 'N/A'}</p>
            </div>

            <div className="mt-4">
                <h3 className="font-semibold">Leader</h3>
                <p>{groupData.leader?.id.name || 'N/A'} ({groupData.leader?.id.email})</p>
            </div>

            <div className="mt-4">
                <h3 className="font-semibold">Members</h3>
                <ul className="list-disc list-inside">
                    {groupData.members?.map((member, idx) => (
                        <li key={idx}>{member.id.name} ({member.id.email})</li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <h3 className="font-semibold">Guide</h3>
                <p>{groupData.guide?.name || 'N/A'} ({groupData.guide?.email})</p>
            </div>

            <div className="mt-4">
                <h3 className="font-semibold">Supervisor</h3>
                <p>{groupData.supervisor?.name || 'N/A'} ({groupData.supervisor?.email})</p>
            </div>

            <div className="mt-4">
                <h3 className="font-semibold">Tasks</h3>
                <ul className="list-decimal list-inside">
                    {groupData.tasks?.length > 0 ? (
                        groupData.tasks.map((task, idx) => (
                            <li key={idx}>{task.title || 'Unnamed Task'}</li>
                        ))
                    ) : (
                        <p>No tasks assigned yet.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default GroupDetails;
