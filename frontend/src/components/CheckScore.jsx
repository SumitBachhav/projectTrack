import React, { useState } from 'react';
import axios from 'axios';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from 'react-router-dom';

function CheckScore() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        paragraph: '',
        title: '',
        keyword: '',
        domain: '',
    });

    const [score1, setScore1] = useState('Please submit abstract to get similarity score and abstracts');
    const [score2, setScore2] = useState('Please submit abstract to get similarity score and abstracts');
    const [score3, setScore3] = useState('Please submit abstract to get similarity score and abstracts');
    const [matchedText1, setMatchedText1] = useState('');
    const [matchedText2, setMatchedText2] = useState('');
    const [matchedText3, setMatchedText3] = useState('');
    const [error, setError] = useState('');

    const [abstractList, setAbstractList] = useState([]);
    const [addButtonDisabled, setAddButtonDisabled] = useState(true);
    const [sendButtonDisabled, setSendButtonDisabled] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const clear = () => {
        setFormData({
            paragraph: '',
            title: '',
            keyword: '',
            domain: '',
        });
        setScore1('Please submit abstract to get similarity score and abstracts');
        setScore2('Please submit abstract to get similarity score and abstracts');
        setScore3('Please submit abstract to get similarity score and abstracts');
        setMatchedText1('');
        setMatchedText2('');
        setMatchedText3('');
        setError('');
        setAddButtonDisabled(true);
    };

    const add = () => {
        const listObject = {
            paragraph: formData.paragraph,
            title: formData.title,
            keyword: formData.keyword,
            domain: formData.domain,
            score1: score1,
            score2: score2,
            score3: score3,
            matchedText1: matchedText1,
            matchedText2: matchedText2,
            matchedText3: matchedText3,
        };
        setAbstractList([...abstractList, listObject]);
        setSendButtonDisabled(false);
    };

    const send = () => {
        navigate('/student/abstractSubmissionComplete');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setScore1('Processing...');
        setScore2('Processing...');
        setScore3('Processing...');
        setMatchedText1('Processing...');
        setMatchedText2('Processing...');
        setMatchedText3('Processing...');
        setError('');

        try {
            const response = await axios.post(
                '/api/compareDatabase',
                {
                    abstract: formData.paragraph,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            setScore1(` ${Math.round(Number(response.data[0][0]) * 100000) / 1000} %`);
            setScore2(` ${Math.round(Number(response.data[1][0]) * 100000) / 1000} %`);
            setScore3(` ${Math.round(Number(response.data[2][0]) * 100000) / 1000} %`);
            setMatchedText1(response.data[0][1]);
            setMatchedText2(response.data[1][1]);
            setMatchedText3(response.data[2][1]);
            setAddButtonDisabled(false);
        } catch (err) {
            setError('Error sending paragraph. Please try again.');
            setScore1('Please submit abstract to get similarity score and abstracts');
            setScore2('Please submit abstract to get similarity score and abstracts');
            setScore3('Please submit abstract to get similarity score and abstracts');
            setMatchedText1('');
            setMatchedText2('');
            setMatchedText3('');
        }
    };

    const handleDelete = (index) => {
        const updatedAbstractList = [...abstractList];
        updatedAbstractList.splice(index, 1);
        setAbstractList(updatedAbstractList);

        if (updatedAbstractList.length === 0) {
            setSendButtonDisabled(true);
        }
    };

    return (
        <div className="flex flex-col md:flex-row pt-20 justify-evenly gap-8 bg-gray-100 min-h-screen">
            <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 m-1 mb-3">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Submit Abstract</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Enter Project Title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Abstract</label>
                        <textarea
                            name="paragraph"
                            value={formData.paragraph}
                            onChange={handleChange}
                            rows="5"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Type your abstract here..."
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Domain</label>
                        <input
                            type="text"
                            name="domain"
                            value={formData.domain}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Enter Project Domain"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Keywords</label>
                        <input
                            type="text"
                            name="keyword"
                            value={formData.keyword}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Enter Project Keywords"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </form>

                {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

                <div className="w-full bg-gray-200 rounded-md shadow-md mt-6 p-4">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>{score1}</AccordionTrigger>
                            <AccordionContent>
                                {matchedText1}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>{score2}</AccordionTrigger>
                            <AccordionContent>
                                {matchedText2}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>{score3}</AccordionTrigger>
                            <AccordionContent>
                                {matchedText3}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={clear}
                        className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                    >
                        Clear
                    </button>
                    <button
                        onClick={add}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        disabled={addButtonDisabled}
                    >
                        Add
                    </button>
                </div>
            </div>

            <div className="w-full md:w-1/3 p-6 bg-white shadow-md rounded-lg m-1 mb-3">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Abstract List for Faculty Verification</h2>
                <div className="bg-gray-100 p-4 rounded-md shadow-md h-80 overflow-y-auto border">
                    {abstractList.map((abstract, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-gray-200 rounded-md p-2 mb-2 border"
                        >
                            <h3 className="text-lg font-medium text-gray-800">{abstract.title}</h3>
                            <button
                                onClick={() => handleDelete(index)}
                                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    onClick={send}
                    className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                    disabled={sendButtonDisabled}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default CheckScore;
