import React, { useState } from 'react';
// fetch data through abstract id


// Sample array to dynamically render radio options


const TestPage = () => {

    const items = [
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2' },
        { id: 3, label: 'Option 3' },
    ];

    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item.id);
        console.log(item.id)
    };




    return (
        <div className="flex flex-row items-center justify-center min-h-screen bg-gray-100">
            <div className='w-1/2 p-10 border border-black min-h-screen mt-16'>
                <p className='font-bold text-3xl'>Submitted Abstract</p>
                <div className="max-w-md mx-auto p-4">
                    <ul className="list-none space-y-2">
                        {items.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleItemClick(item)}
                                className={`cursor-pointer p-2 rounded-lg transition-all ${selectedItem === item.id
                                    // ? 'bg-blue-500 text-white' // Selected item style
                                    ? 'bg-gray-500 text-white' // Selected item style
                                    : 'bg-gray-200 hover:bg-gray-300' // Default and hover style
                                    }`}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default TestPage