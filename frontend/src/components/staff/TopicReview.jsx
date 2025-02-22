import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TopicReview = () => {
    const { state } = useLocation();
    const { abstractId } = state || {};
    const navigate = useNavigate();


    const [abstractData, setAbstractData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [action, setAction] = useState(""); // Track selected action
    const [comment, setComment] = useState(""); // Track comment
    const [actionError, setActionError] = useState(""); // Action-specific errors

    useEffect(() => {
        if (!abstractId) return;

        const fetchAbstractDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.post("/api/v1/staff/getAbstractDetail", {
                    abstractId: abstractId.trim().toString(),
                });
                setAbstractData(response.data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAbstractDetails();
    }, [abstractId]);

    // Handle action selection
    const handleAction = (selectedAction) => {
        setAction(selectedAction);
        setComment(""); // Clear comment on action change
        setActionError(""); // Clear previous errors
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (action === "revision" && !comment.trim()) {
            setActionError("Comment is required for revision.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/v1/staff/updateAbstractReview", {
                reviewedAbstractId: abstractId,
                status: action,
                comments: comment
            });
            navigate('/staff/topicReviewOverview')
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

        alert(`Abstract ${action} successfully!`);
        setAction("");
        setComment("");
        setActionError("");
    };

    // Render loading, error, or content
    if (loading) return <p className="text-center text-gray-600">Loading abstract details...</p>;
    if (error) return <p className="text-center text-red-600">Error: {error}</p>;
    if (!abstractData) return <p className="text-center text-gray-600">No abstract data found.</p>;

    return (
        <div className="min-h-screen mt-14 flex items-center justify-center bg-gradient-to-r from-blue-400 to-gray-300 p-6">
            <div className="max-w-3xl w-full p-6 bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📄 Abstract Details</h2>

                {/* Abstract Details */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{abstractData.title}</h3>
                    <p className="text-gray-600 mb-4">{abstractData.abstract}</p>
                    <div className="mb-4">
                        <strong className="text-gray-700">📌 Domain:</strong>{" "}
                        <span className="text-blue-600">{abstractData.domain.join(", ")}</span>
                    </div>
                    <div className="mb-4">
                        <strong className="text-gray-700">🔑 Keywords:</strong>{" "}
                        <span className="text-blue-600">{abstractData.keywords.join(", ")}</span>
                    </div>
                    <div className="mb-6">
                        <strong className="text-gray-700">📊 Status:</strong>{" "}
                        <span className="px-3 py-1 rounded-full text-white bg-yellow-500">
                            {abstractData.abstractStatus}
                        </span>
                    </div>

                    {/* Matched Abstracts Section */}
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">🔍 Matched Abstracts</h3>
                    {abstractData.matched?.length ? (
                        <div className="space-y-4">
                            {abstractData.matched.map((match, index) => (
                                <div key={index} className="border p-4 rounded-lg bg-gray-100 shadow-md">
                                    <h4 className="text-lg font-semibold text-gray-900">{match.title}</h4>
                                    <p className="text-gray-700 mb-2">{match.abstract}</p>
                                    <div className="text-gray-600">
                                        <strong className="text-gray-700">📌 Domain:</strong> {match.domain}
                                    </div>
                                    <div className="text-gray-600">
                                        <strong className="text-gray-700">🔑 Keywords:</strong> {match.keywords}
                                    </div>
                                    <div className="text-gray-600">
                                        <strong className="text-gray-700">📊 Score:</strong>{" "}
                                        <span className="px-2 py-1 rounded-md bg-blue-500 text-white">{match.score}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No matched abstracts found.</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-center space-x-4">
                    {["accepted", "rejected", "revision"].map((actionType) => (
                        <button
                            key={actionType}
                            onClick={() => handleAction(actionType)}
                            className={`px-4 py-2 text-white rounded-lg ${action === actionType ? "bg-green-600" : "bg-green-500 hover:bg-green-600"
                                }`}
                        >
                            {actionType === "accepted" && "✅ Accept"}
                            {actionType === "rejected" && "❌ Reject"}
                            {actionType === "revision" && "🔄 Revision"}
                        </button>
                    ))}
                </div>

                {/* Comment Box */}
                {action && (
                    <div className="mt-6">
                        <label className="block text-gray-700 font-semibold mb-2">
                            💬 Add a Comment {action === "revision" && <span className="text-red-500">*</span>}
                        </label>
                        <textarea
                            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                            rows="4"
                            placeholder={`Enter your comment for ${action}...`}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        {actionError && <p className="text-red-500 mt-2">{actionError}</p>}

                        <button
                            onClick={handleSubmit}
                            className="w-full mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Submit Decision
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopicReview;
