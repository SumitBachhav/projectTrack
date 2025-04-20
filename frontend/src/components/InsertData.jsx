import React, { useState } from 'react';
import axios from 'axios';


function InsertData() {

    const [formData, setFormData] = useState({
        paragraph: '',
        title: '',
        keyword: '',
        domain: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(
                '/api/insert',
                {
                    title: formData.title,
                    abstract: formData.paragraph,
                    domains: formData.domain.split(',').map(item => item.trim()),
                    keywords: formData.keyword.split(',').map(item => item.trim()),
                },
                {
                    withCredentials: true
                },
                {
                  headers: {
                    // 'Authorization': 'Bearer your-token-here',
                    'Content-Type': 'application/json',
                  }
                }
              );
          
              setFormData({
                paragraph: '',
                title: '',
                keyword: '',
                domain: '',
            })
            console.log(response.status)
            // setResponseMessage(response.data.message);
        } catch (err) {
            setError('Error sending paragraph. Please try again.', err.message);
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


        </div>
    )
}

export default InsertData

