import React, { useState } from 'react'

const CheckIfApproved = () => {

    // const data = {
    //     approvedList: [],
    //     comments: 'comment of none'
    // }

    // const data = {
    //     approvedList: [{ stdAbsId: 1, title: 'title 1' }],
    //     comments: 'comment of one'
    // }

    // data to send to backend
    // accepted abstract, rejected abstract

    const data = {
        approvedList: [{ stdAbsId: 1, title: 'title 1' }, { stdAbsId: 2, title: 'title 2' }],
        comments: 'comment of two'
    }

    const handleSubmitDetailsClick = () => {
        // navigate to submit project specification page
    }

    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        if (selectedItem !== item.stdAbsId) {
            setSelectedItem(item.stdAbsId)

        }
    };


    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };




    const handleComment = (comment) => {
        if (comment.length == '0') {
            return (
                <p className="mb-4">Comments: none</p>
            )
        } else {
            return (
                <p className="mb-4">Comments: {comment}</p>
            )
        }
    }

    const noneApproved = () => {
        return (

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className="text-2xl font-bold mb-4">Err!</p>
                <p className="mb-4">Your abstract has not been approved.</p>
                {handleComment(data.comments)}
            </div>
        )
    }

    const oneApproved = () => {
        return (

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className="text-2xl font-bold mb-4">Success!</p>
                <p className="mb-4">{`Your abstract titled ${data.approvedList[0].title} has been approved`}.</p>
                {handleComment(data.comments)}
                <button
                    onClick={handleSubmitDetailsClick}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
                >
                    Submit Project Specification
                </button>
            </div>
        )
    }

    const moreThanOneApproved = () => {
        return (

            <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col">
                <p className="text-2xl font-bold mb-4">Success!</p>
                <p className="mb-4">{`Your multiple abstracts have been approved`}.</p>
                {handleComment(data.comments)}
                <div className="max-w-md mx-auto p-4">
                    <ul className="list-none space-y-2">
                        {data.approvedList.map((item, index) => (
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
                <label className="mb-4">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    {`  let other students use your remaining abstract`}
                </label>
                <button
                    onClick={handleSubmitDetailsClick}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
                >
                    Submit Project Specification
                </button>
            </div>
        )
    }



    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {
                noneApproved()
                // oneApproved()
                // moreThanOneApproved()
            }
        </div>
    )
}

export default CheckIfApproved