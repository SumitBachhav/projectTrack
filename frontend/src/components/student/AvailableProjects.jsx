import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AvailableProjects = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAbstractId, setSelectedAbstractId] = useState(null);
    const [selecting, setSelecting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/student/getDonatedAbstracts`,
                    { withCredentials: true }
                );
                setData(res.data.data);
            } catch (err) {
                console.error('Failed to fetch available projects', err);
                setError('Something went wrong while fetching available projects.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSelect = async () => {
        if (!selectedAbstractId) return;

        try {
            setSelecting(true);
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/student/selectDonatedAbstract`,
                { abstractId: selectedAbstractId },
                { withCredentials: true }
            );
            const toForwardData = data.find((item) => item.abstractId === selectedAbstractId);
            const selectedData = {
                title: toForwardData.title,
                abstract: toForwardData.abstract,
                id : toForwardData.abstractId
            };
            const donatedIds = toForwardData.donatedIds;
            alert('Abstract selected successfully!');
            //   navigate("/student/inviteStudents");
            navigate('/student/projectSpecification', { state: { abstract: selectedData, donatedIds: [] } });

        } catch (err) {
            console.error('Error selecting abstract:', err);
            alert('Something went wrong while selecting the abstract.');
        } finally {
            setSelecting(false);
        }
    };

    if (loading)
        return (
            <p className="text-center mt-16 text-xl font-semibold text-gray-600">
                Loading available projects...
            </p>
        );

    if (error)
        return (
            <p className="text-center mt-16 text-xl font-semibold text-red-600">
                {error}
            </p>
        );

    return (
        <div className="mt-16 flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
                <p className="text-2xl font-bold">Available Projects</p>
                <div className="w-full bg-gray-200 rounded-md shadow-md mt-6 p-4">
                    <Accordion type="single" collapsible className="w-full">
                        {data.map((item) => (
                            <AccordionItem key={item.abstractId} value={`item-${item.abstractId}`}>
                                <AccordionTrigger>{item.title}</AccordionTrigger>
                                <AccordionContent>
                                    <div>
                                        {item.abstract}
                                        <p className="font-bold mt-2">{item.domain}</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <button
                    onClick={() => navigate('/student/availableGroups')}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
                >
                    Look for a group
                </button>
            </div>

            {/* Right side: abstract title selection */}
            <div className="w-full lg:w-1/3 bg-white border border-gray-300 rounded-md shadow-md p-4 h-fit">
                <h2 className="text-xl font-semibold mb-4">Select an Abstract</h2>
                <ul className="space-y-2 max-h-80 overflow-y-auto">
                    {data.map((item) => (
                        <li
                            key={item.abstractId}
                            className={`cursor-pointer p-2 rounded-md border ${selectedAbstractId === item.abstractId
                                    ? 'bg-blue-100 border-blue-500'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            onClick={() => setSelectedAbstractId(item.abstractId)}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handleSelect}
                    disabled={!selectedAbstractId || selecting}
                    className={`mt-4 w-full px-4 py-2 rounded-md ${selectedAbstractId
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        }`}
                >
                    {selecting ? 'Selecting...' : 'Confirm Selection'}
                </button>
            </div>
        </div>
    );
};

export default AvailableProjects;
