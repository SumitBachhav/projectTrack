import React, { useState } from "react";
import { useParams } from "react-router-dom";

const TopicReview = () => {
    const { studentId } = useParams();

    const TopicReviewDetails = {
        items: [
            {
                stdAbsId: 1,
                title: "Title 1",
                abstract: "Abstract 1",
                domain: "Domain 1",
                keywords: "Keywords 1",
                matched1: { percentage: 30, title: "Title A", abstract: "Abstract A", domain: "Domain A", keywords: "Keywords A" },
                matched2: { percentage: 40, title: "Title B", abstract: "Abstract B", domain: "Domain B", keywords: "Keywords B" },
                matched3: { percentage: 50, title: "Title C", abstract: "Abstract C", domain: "Domain C", keywords: "Keywords C" },
                approved: false,
            },
            {
                stdAbsId: 2,
                title: "Title 2",
                abstract: "Abstract 2",
                domain: "Domain 2",
                keywords: "Keywords 2",
                matched1: { percentage: 30, title: "Title X", abstract: "Abstract X", domain: "Domain X", keywords: "Keywords X" },
                matched2: { percentage: 40, title: "Title Y", abstract: "Abstract Y", domain: "Domain Y", keywords: "Keywords Y" },
                matched3: { percentage: 50, title: "Title Z", abstract: "Abstract Z", domain: "Domain Z", keywords: "Keywords Z" },
                approved: false,
            },
        ],
    };

    const [items] = useState(TopicReviewDetails.items);
    const [selectedItem, setSelectedItem] = useState(items[0].stdAbsId);
    const [approvedList, setApprovedList] = useState([]);
    const [comments, setComments] = useState("");

    const handleCommentsChange = (event) => {
        setComments(event.target.value);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item.stdAbsId);
    };

    const handleApproveClick = (item) => {
        if (approvedList.includes(item.stdAbsId)) {
            setApprovedList(approvedList.filter((id) => id !== item.stdAbsId));
        } else {
            setApprovedList([...approvedList, item.stdAbsId]);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-start mt-10 justify-center min-h-screen bg-gray-100 p-8 gap-8">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-700">Submitted Abstracts</h2>
                <ul className="space-y-3">
                    {items.map((item) => (
                        <li
                            key={item.stdAbsId}
                            onClick={() => handleItemClick(item)}
                            className={`p-4 rounded-lg cursor-pointer transition-all ${selectedItem === item.stdAbsId ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>

                {selectedItem && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-700">Details</h3>
                        <p>
                            <strong>Title:</strong> {items.find((item) => item.stdAbsId === selectedItem).title}
                        </p>
                        <p>
                            <strong>Abstract:</strong> {items.find((item) => item.stdAbsId === selectedItem).abstract}
                        </p>
                        <p>
                            <strong>Domain:</strong> {items.find((item) => item.stdAbsId === selectedItem).domain}
                        </p>
                        <p>
                            <strong>Keywords:</strong> {items.find((item) => item.stdAbsId === selectedItem).keywords}
                        </p>
                    </div>
                )}

                {/* {comments section} */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Comments</label>
                    <textarea
                        name="comments"
                        value={comments}
                        onChange={handleCommentsChange}
                        rows="5"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Type your comments here..."
                        required
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-700">Matched Abstracts</h2>
                {selectedItem && (
                    <>
                        {[1, 2, 3].map((index) => {
                            const matched = items.find((item) => item.stdAbsId === selectedItem)[`matched${index}`];
                            return (
                                <div key={index} className="p-4 bg-gray-200 rounded-lg mb-4">
                                    <p className="text-lg font-semibold">Matched {index} - {matched.percentage}%</p>
                                    <p><strong>Title:</strong> {matched.title}</p>
                                    <p><strong>Abstract:</strong> {matched.abstract}</p>
                                    <p><strong>Domain:</strong> {matched.domain}</p>
                                    <p><strong>Keywords:</strong> {matched.keywords}</p>
                                </div>
                            );
                        })}
                    </>
                )}

                <h2 className="text-2xl font-bold text-gray-700">Approved Abstracts</h2>
                <ul className="space-y-3">
                    {items.map((item) => (
                        <li
                            key={item.stdAbsId}
                            onClick={() => handleApproveClick(item)}
                            className={`p-4 rounded-lg cursor-pointer transition-all ${approvedList.includes(item.stdAbsId) ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TopicReview;
