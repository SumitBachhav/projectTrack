import React, { useState } from 'react'

// fetch data through student id

const TopicReview = () => {

    const TopicReviewDetails = {
        items: [
            {
                stdAbsId: 1, title: 'title 1', abstract: 'abstract 1', domain: 'domain 1', keywords: 'keywords 1',
                matched1: { percentage: 30, title: 'title 1', abstract: 'abstract 1', domain: 'domain 1', keywords: 'keywords 1' },
                matched2: { percentage: 40, title: 'title 2', abstract: 'abstract 2', domain: 'domain 2', keywords: 'keywords 2' },
                matched3: { percentage: 50, title: 'title 3', abstract: 'abstract 3', domain: 'domain 3', keywords: 'keywords 3' },
                approved: false
            },
            {
                stdAbsId: 2, title: 'title 2', abstract: 'abstract 2', domain: 'domain 2', keywords: 'keywords 2',
                matched1: { percentage: 30, title: 'title 11', abstract: 'abstract 11', domain: 'domain 11', keywords: 'keywords 11' },
                matched2: { percentage: 40, title: 'title 2', abstract: 'abstract 2', domain: 'domain 2', keywords: 'keywords 2' },
                matched3: { percentage: 50, title: 'title 3', abstract: 'abstract 3', domain: 'domain 3', keywords: 'keywords 3' },
                approved: false
            },
            {
                stdAbsId: 3, title: 'title 3', abstract: 'abstract 3', domain: 'domain 3', keywords: 'keywords 3',
                matched1: { percentage: 30, title: 'title 1', abstract: 'abstract 1', domain: 'domain 1', keywords: 'keywords 1' },
                matched2: { percentage: 40, title: 'title 2', abstract: 'abstract 2', domain: 'domain 2', keywords: 'keywords 2' },
                matched3: { percentage: 50, title: 'title 3', abstract: 'abstract 3', domain: 'domain 3', keywords: 'keywords 3' },
                approved: false
            },
        ],
        markAsDone: false,
        studentId: 1
    }
    let items = TopicReviewDetails.items

    const handleMarkAsDone = () => {
        // setMarkAsDone(!markAsDone);
        alert("Saved")
    };// submit data through api -------------------------------------------------------
    // approved list to send to backend

    const [approvedList, setApprovedList] = useState([]);

    const [selectedItem, setSelectedItem] = useState(items[0].stdAbsId);

    const handleItemClick = (item) => {
        if (selectedItem !== item.stdAbsId) {
            setSelectedItem(item.stdAbsId)

        }
    };

    const handleApproveClick = (item) => {
        if (approvedList.includes(items.indexOf(item))) {
            setApprovedList(approvedList.filter((index) => index !== items.indexOf(item)))
        } else {
            setApprovedList([...approvedList, items.indexOf(item)]);
        }
    };




    return (
        <div className="flex flex-row items-center justify-center min-h-screen">
            <div className='w-1/2 p-10 border border-black min-h-screen mt-16 overflow-auto max-h-screen'>
                <p className='font-bold text-3xl'>Submitted Abstract</p>
                <div className="max-w-md mx-auto p-4">
                    <ul className="list-none space-y-2">
                        {items.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleItemClick(item)}
                                className={`cursor-pointer p-2 rounded-lg transition-all ${selectedItem === item.stdAbsId
                                    ? 'bg-gray-500 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    {selectedItem && (
                        <div>
                            <p><strong> Title: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).title}</p>
                            <p><strong> Abstract: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).abstract}</p>
                            <p><strong> Domain: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).domain}</p>
                            <p><strong> Keywords: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).keywords}</p>
                        </div>
                    )}
                </div>
                <p className='font-bold text-3xl'>Approved Abstract</p>

                <div className="max-w-md mx-auto p-4">
                    <ul className="list-none space-y-2">
                        {items.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleApproveClick(item)}
                                className={`cursor-pointer p-2 rounded-lg transition-all ${approvedList.includes(items.indexOf(item))
                                    ? 'bg-gray-500 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                    <div className='mt-2 cursor-pointer p-2 rounded-lg transition-all bg-gray-200 hover:bg-gray-300'
                        onClick={() => setApprovedList([-1])}>
                        None
                    </div>
                </div>
                <button
                    onClick={handleMarkAsDone}
                    style={{
                        backgroundColor: 'rgb(203 213 225)',
                        border: '1px solid black',
                        padding: '10px',
                        margin: '10px',
                    }}                    >
                    Mark as Done and Save
                </button>
            </div>
            <div className='w-1/2 p-10 border border-black min-h-screen mt-16 overflow-auto max-h-screen'>
                <p className='font-bold text-3xl'>Matched Abstracts</p>
                <div className='mt-4'>
                    {selectedItem && (
                        <div>
                            <div className='bg-gray-200 mb-2'>
                                <p className='font-bold text-3xl'>Percentage: {items.find((item) => item.stdAbsId === selectedItem).matched1.percentage}</p>
                                <p><strong> Title: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).matched1.title}</p>
                                <p><strong> Abstract: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).matched1.abstract}</p>
                                <p><strong> Domain: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).matched1.domain}</p>
                                <p><strong> Keywords: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).matched1.keywords}</p>
                            </div>
                            <div className='bg-gray-300 mb-2'>
                                <p className='font-bold text-3xl'>Percentage: {items.find((item) => item.stdAbsId === selectedItem).matched2.percentage}</p>
                                <p><strong> Title: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).matched2.title}</p>
                                <p><strong> Abstract: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).matched2.abstract}</p>
                                <p><strong> Domain: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).matched2.domain}</p>
                                <p><strong> Keywords: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).matched2.keywords}</p>
                            </div>
                            <div className='bg-gray-200'>
                                <p className='font-bold text-3xl'>Percentage: {items.find((item) => item.stdAbsId === selectedItem).matched3.percentage}</p>
                                <p><strong> Title: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).matched3.title}</p>
                                <p><strong> Abstract: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).matched3.abstract}</p>
                                <p><strong> Domain: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).matched3.domain}</p>
                                <p><strong> Keywords: </strong> <br /> {items.find((item) => item.stdAbsId === selectedItem).matched3.keywords}</p>
                            </div>

                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default TopicReview