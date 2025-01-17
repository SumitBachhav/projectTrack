import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TopicReview = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();

    const TopicReviewDetails = {
        items: [
            {
                stdAbsId: 1,
                title: "AI-Driven Diagnosis of Skin Cancer",
                abstract: "Skin cancer is widespread, and early detection is essential for successful treatment. This presentation examines how Artificial Intelligence (AI) can assist in diagnosing skin cancer by analyzing dermoscopic images. AI methods, particularly deep learning, can enhance diagnostic precision and efficiency over traditional approaches that rely on human experts. In this seminar, we will discuss the methodology, goals, and the pros and cons of this technique.",
                domain: "Artificial Intelligence",
                keywords: "Artificial Intelligence, Deep learning, Neural network",
                matched1: { percentage: 98, title: "Skin Cancer Diagnosis Using AI", abstract: "Skin cancer is common and early detection is critical for effective treatment. This presentation explores the use of Artificial Intelligence (AI) in diagnosing skin cancer by analyzing dermoscopic images. AI techniques, such as deep learning, can improve diagnostic accuracy and speed compared to traditional methods which depended on human experts. In this seminar we will explore methodology, objectives, advantages disadvantages of this technique.", domain: "Artificial Intelligence", keywords: "Artificial Intelligence, Deep learning, Neural network" },
                matched2: { percentage: 51, title: "AI In Finance: Revolutionizing The Industry", abstract: "Artificial Intelligence (AI) is revolutionizing the financial industry by enhancing efficiency, accuracy, and decision-making capabilities across various sectors. AI technologies, such as machine learning, natural language processing (NLP), and deep learning, are increasingly being applied in areas like portfolio management, fraud detection, risk assessment, and algorithmic trading. These advancements enable financial institutions to process vast amounts of data quickly, automate complex tasks, and provide personalized services. AI-driven innovations, including robo-advisors, credit scoring systems, and RegTech solutions, are transforming how financial services are delivered, improving customer experience while reducing operational costs. As AI continues to evolve, its potential to disrupt and reshape the financial landscape remains significant.", domain: "Artificial Intelligence", keywords: "Finance, ML, AI, Portfolio Management,, Fraud Detection  " },
                matched3: { percentage: 47, title: "AI FITNESS USING DEEP LEARNING", abstract: "Abstract C", domain: "Fitness", keywords: "Cnn rnn ai deeplearning" },
                approved: false,
            },
            {
                stdAbsId: 2,
                title: "RECOGNISING AND RECREATING VOICE USING ML",
                abstract: "Abstract 2",
                domain: "Domain 2",
                keywords: "Keywords 2",
                matched1: { percentage: 30, title: "Title X", abstract: "Abstract X", domain: "Domain X", keywords: "Keywords X" },
                matched2: { percentage: 25, title: "Title Y", abstract: "Abstract Y", domain: "Domain Y", keywords: "Keywords Y" },
                matched3: { percentage: 18, title: "Title Z", abstract: "Abstract Z", domain: "Domain Z", keywords: "Keywords Z" },
                approved: false,
            },
        ],
    };

    const [items] = useState(TopicReviewDetails.items);
    const [selectedItem, setSelectedItem] = useState(items[0].stdAbsId);
    const [approvedList, setApprovedList] = useState([]);

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

    const handleSubmit = () => {
        // Handle the submit action (e.g., sending the approved abstracts to the server)
        // console.log("Approved Abstracts Submitted:", approvedList);
        navigate(`/staff/topicReviewOverview`);
    };

    const handleViewAbstract = (abstract) => {
        // Handle the view abstract action (e.g., showing more details or navigating to a detailed view)
        alert(`Viewing Abstract: ${abstract}`);
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
                        <p className="mt-2">
                            <strong>Title:</strong> {items.find((item) => item.stdAbsId === selectedItem).title}
                        </p>
                        <p className="mt-2">
                            <strong>Abstract:</strong> {items.find((item) => item.stdAbsId === selectedItem).abstract}
                        </p>
                        <p className="mt-2">
                            <strong>Domain:</strong> {items.find((item) => item.stdAbsId === selectedItem).domain}
                        </p>
                        <p className="mt-2">
                            <strong>Keywords:</strong> {items.find((item) => item.stdAbsId === selectedItem).keywords}
                        </p>

                        {/* View Abstract Button */}
                        {/* <button
                            onClick={() => handleViewAbstract(items.find((item) => item.stdAbsId === selectedItem).abstract)}
                            className="mt-4 py-2 px-4 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition-all"
                        >
                            View Abstract
                        </button> */}
                    </div>
                )}

                {/* Approved Abstracts and Submit Button */}
                <h2 className="text-2xl font-bold text-gray-700 mt-6">Approved Abstracts</h2>
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

                {/* Submit Button */}
                <div className="mt-6">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
                    >
                        Submit Approved Abstracts
                    </button>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-700">Matched Abstracts</h2>
                {selectedItem && (
                    <>
                        {[1, 2, 3].map((index) => {
                            const matched = items.find((item) => item.stdAbsId === selectedItem)[`matched${ index }`];
                        return (
                        <div key={index} className="p-4 bg-gray-200 rounded-lg mb-4">
                            <p className="text-lg font-semibold">Matched {index} - {matched.percentage}%</p>
                            <p><strong>Title:</strong> {matched.title}</p>
                            <p><strong>Domain:</strong> {matched.domain}</p>
                            <p><strong>Keywords:</strong> {matched.keywords}</p>
                            <p><strong>Abstract:</strong>
                             {/* {matched.abstract} */}
                             </p>
                            <button
                                onClick={() => handleViewAbstract(matched.abstract)}
                                className="mt-4 py-2 px-4 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition-all"
                            >
                                View
                            </button>
                        </div>
                        );
            })}
                    </>
                )}
            </div>
        </div>
    );
};

export default TopicReview;