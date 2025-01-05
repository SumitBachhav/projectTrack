import React, { useState } from 'react';
import axios from 'axios';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
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
        })
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
        console.log("from add", formData)
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
            //instead of matchedText we can send id of abstract
        }
        setAbstractList([...abstractList, listObject]);
        setSendButtonDisabled(false);
    };

    const send = () => {
        navigate('/student/abstractSubmissionComplete');
        // console.log("from add", abstractList)
        //to send data to backend
        // work needs to be done---------------------------------------------------------------------
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
        console.log(formData)

        try {
            // const response = await axios.get(`/api/compare?raw_text=${paragraph}`);
            const response = await axios.post(
                '/api/compareDatabase',
                {
                    abstract: formData.paragraph,
                    // title: formData.title,
                    // keyword: formData.keyword,
                    // domain: formData.domain,
                },
                {
                    headers: {
                        // 'Authorization': 'your-token-here',
                        'Content-Type': 'application/json',
                    }
                }
            );

            console.log(response.data);
            // setResponseMessage(response.data.message);

            // let a = response.data[0][0].toFixed(5) * 100;
            // let b = response.data[1][0].toFixed(5) * 100;
            let cc = Math.round(Number(response.data[2][0]) * 100000) / 1000
            // let d = response.data[0][1];
            // let e = response.data[1][1];
            // let f = response.data[2][1];

            setScore1(` ${Math.round(Number(response.data[0][0]) * 100000) / 1000} %`);
            setScore2(` ${Math.round(Number(response.data[1][0]) * 100000) / 1000} %`);
            setScore3(` ${Math.round(Number(response.data[2][0]) * 100000) / 1000} %`);
            setMatchedText1(response.data[0][1]);
            setMatchedText2(response.data[1][1]);
            setMatchedText3(response.data[2][1]);
            setAddButtonDisabled(false);
        } catch (err) {
            // setError(err.message);
            setError('Error sending paragraph. Please try again.' + err.message);
            setScore1('Please submit abstract to get similarity score and abstracts');
            setScore2('Please submit abstract to get similarity score and abstracts');
            setScore3('Please submit abstract to get similarity score and abstracts');
            setMatchedText1('');
            setMatchedText2('');
            setMatchedText3('');

            setAddButtonDisabled(false);
            // to remove-------------------------------------------------------------------------------

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
        <div className='flex flex-row pt-20 justify-evenly'>
            <div className='flex flex-col items-center' >
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block px-4 py-2 border border-black rounded-md focus:outline-none focus:border-sky-blue-500 bg-gray-300 w-[500px]" placeholder="Enter Project Title" required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Abstract</label>

                        <textarea
                            value={formData.paragraph}
                            name='paragraph'
                            onChange={handleChange}
                            rows="5"
                            cols="50"
                            placeholder="Type your paragraph here..."
                            required
                            className="mt-1 block px-4 py-2 border border-black rounded-md focus:outline-none focus:border-sky-blue-500 bg-gray-300 w-[500px] h-[200px] p-[10px]"

                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Domain</label>
                        <input type="text" name="domain" value={formData.domain} onChange={handleChange} className="mt-1 block px-4 py-2 border border-black rounded-md focus:outline-none focus:border-sky-blue-500 bg-gray-300 w-[500px]" placeholder="Enter Project domain" required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">keyword</label>
                        <input type="text" name="keyword" value={formData.keyword} onChange={handleChange} className="mt-1 block px-4 py-2 border border-black rounded-md focus:outline-none focus:border-sky-blue-500 bg-gray-300 w-[500px]" placeholder="Enter Project keywords" required />
                    </div>


                    <button
                        type='submit'
                        style={{
                            width: '20%',
                            backgroundColor: 'rgb(203 213 225)',
                            border: '1px solid black',
                            padding: '10px',
                            margin: '10px',
                        }}>
                        Submit
                    </button>
                </form>

                {error && <div style={{ color: 'red' }}>{error}</div>}



                <div style={{ width: '500px', backgroundColor: 'rgb(203 213 225)', border: '1px solid black', padding: '10px' }}>
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

                <div className='flex flex-row justify-between'>
                    <button
                        onClick={clear}
                        style={{
                            // width: '20%',
                            backgroundColor: 'rgb(203 213 225)',
                            border: '1px solid black',
                            padding: '10px',
                            margin: '10px',
                        }}>
                        Clear
                    </button>
                    <button
                        onClick={add}
                        style={{
                            // width: '20%',
                            backgroundColor: 'rgb(203 213 225)',
                            border: '1px solid black',
                            padding: '10px',
                            margin: '10px',
                        }}
                        disabled={addButtonDisabled}
                    >
                        Add
                    </button>
                </div>



            </div>

            <div className='w-1/3 p-2 flex flex-col'>
                <h1 className="text-3xl font-bold mb-4">Abstract list for faculty verification</h1>
                <div className="bg-red-200 shadow-md rounded-xl p-4 h-80 overflow-auto border-2 border-black">
                    {
                        abstractList.map((abstract, index) => (
                            <div key={index} className="bg-blue-200 shadow-md rounded-xl p-1 h-10 flex flex-row justify-between m-1 border border-black">
                                <h3 className="text-2xl font-medium">{abstract.title}</h3>
                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded'
                                    onClick={() => handleDelete(index)}
                                >Delete
                                </button>
                            </div>
                        ))
                    }
                </div>
                <button
                    onClick={send}
                    style={{
                        // width: '20%',
                        backgroundColor: 'rgb(203 213 225)',
                        border: '1px solid black',
                        padding: '10px',
                        margin: '10px',
                    }}
                    disabled={sendButtonDisabled}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default CheckScore

