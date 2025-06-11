import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Users, ClipboardList, BookOpen, UserCircle, FileText, ListTodo, User2, LoaderCircle, AlertCircle, Hammer
} from 'lucide-react';

const GroupDetails = () => {
    const [groupData, setGroupData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchGroupDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/student/groupDetails`, {
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
        const user = JSON.parse(sessionStorage.getItem('userData'));
        if (!user || !user.childId) {
            setError('User not logged in or session expired.');
            setLoading(false);
            return;
        }
        fetchGroupDetails();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-60 text-blue-600 animate-pulse"><LoaderCircle className="mr-2 animate-spin" />Loading group details...</div>;
    if (error) return <div className="text-center mt-32 text-red-500 text-xl font-bold flex justify-center items-center"><AlertCircle className="mr-2" />{error}</div>;
    if (!groupData) return null;

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 bg-white shadow-xl rounded-2xl mt-16 space-y-8 border border-blue-100">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">📘 Project Group Overview</h2>

            <div className="space-y-4">
                <div className="text-lg"><ClipboardList className="inline mr-2 text-blue-500" /> <strong>Status:</strong> {groupData.status}</div>

                <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-1"><BookOpen className="inline mr-2" />Project Title</h3>
                    <p className="text-gray-800">{groupData.project?.title || 'N/A'}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-1"><FileText className="inline mr-2" />Abstract</h3>
                    <p className="text-gray-800 whitespace-pre-wrap">{groupData.project?.abstract || 'N/A'}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-1"><ListTodo className="inline mr-2" />Topic Requirements</h3>
                    {groupData.project?.requirements?.length > 0 ? (
                        <ul className="list-disc pl-6 text-gray-800">
                            {groupData.project.requirements.map((req, idx) => (
                                <li key={idx}>{req.domain}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">N/A</p>
                    )}
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-1"><Hammer className="inline mr-2" />Skills Required</h3>
                    {groupData.project?.requirements?.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {groupData.project.requirements.map((req, idx) => (
                <p key={idx} className="text-gray-800">
                    <span className="font-medium text-blue-500">{req.domain}:</span>{' '}
                    {Array.isArray(req.skills) ? req.skills.join(', ') : req.skills || 'N/A'}
                </p>
            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">N/A</p>
                    )}
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-1"><UserCircle className="inline mr-2" />Leader</h3>
                    <p className="text-gray-800">{groupData.leader?.id.name || 'N/A'} ({groupData.leader?.id.email})</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-1"><Users className="inline mr-2" />Members</h3>
                    <ul className="list-disc pl-6 text-gray-800">
                        {groupData.members?.map((member, idx) => (
                            <li key={idx}>{member.id.name} ({member.id.email})</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-1"><User2 className="inline mr-2" />Guide</h3>
                    <p className="text-gray-800">{groupData.guide?.name || 'N/A'} ({groupData.guide?.email})</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-1"><User2 className="inline mr-2" />Supervisor</h3>
                    <p className="text-gray-800">{groupData.supervisor?.name || 'N/A'} ({groupData.supervisor?.email})</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-1"><ListTodo className="inline mr-2" />Tasks</h3>
                    {groupData.tasks?.length > 0 ? (
                        <ol className="list-decimal pl-6 text-gray-800 space-y-1">
                            {groupData.tasks.map((task, idx) => (
                                <li key={idx}>{task.title || 'Unnamed Task'}</li>
                            ))}
                        </ol>
                    ) : (
                        <p className="text-gray-500">No tasks assigned yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupDetails;
