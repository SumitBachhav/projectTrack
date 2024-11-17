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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const next = () => {
        // navigate('/student/dashboard');
        setFormData({
            paragraph: '',
            title: '',
            keyword: '',
            domain: '',
        })
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
                    // 'Authorization': 'Bearer your-token-here',
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
            // setFormData({
            //     paragraph: '',
            //     title: '',
            //     keyword: '',
            //     domain: '',
            // })
        } catch (err) {
            // setError(err.message);
            setError('Error sending paragraph. Please try again.' + err.message);
            setScore1('Please submit abstract to get similarity score and abstracts');
            setScore2('Please submit abstract to get similarity score and abstracts');
            setScore3('Please submit abstract to get similarity score and abstracts');
            setMatchedText1('');
            setMatchedText2('');
            setMatchedText3('');
        }
    };


    return (
        <div className='flex flex-col items-center pt-36' >

            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div>
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block px-4 py-2 border border-black rounded-md focus:outline-none focus:border-sky-blue-500 bg-gray-300 w-[500px]" placeholder="Enter Project Title" required />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Abstract</label>
                    {/* <input type="text" name="paragraph" value={formData.paragraph} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500" placeholder="Enter Project Title" required /> */}

                    <textarea
                        value={formData.paragraph}
                        name='paragraph'
                        onChange={handleChange}
                        rows="5"
                        cols="50"
                        placeholder="Type your paragraph here..."
                        required
                        className="mt-1 block px-4 py-2 border border-black rounded-md focus:outline-none focus:border-sky-blue-500 bg-gray-300 w-[500px] h-[200px] p-[10px]"

                        // className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sky-blue-500"
                        // style={{ width: '500px', height: '200px', backgroundColor: 'rgb(203 213 225)', border: '1px solid black', padding: '10px' }}
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

            <button
                onClick={next}
                style={{
                    width: '20%',
                    backgroundColor: 'rgb(203 213 225)',
                    border: '1px solid black',
                    padding: '10px',
                    margin: '10px',
                }}>
                Next
            </button>

        </div>
    )
}

export default CheckScore

