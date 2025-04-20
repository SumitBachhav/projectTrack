import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Comments() {
  const { taskId } = useParams(); // Dynamic taskId from URL
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = `http://localhost:4000/api/v1/assigner/task/${taskId}/comments`;

  // Fetch comments from API when taskId changes
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL, {
          withCredentials: true,
        });
        if (response.data.success) {
          setComments(response.data.data.comments);
        } else {
          setError("Failed to load comments");
        }
      } catch (err) {
        setError("Error fetching comments");
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchComments();
    }
  }, [taskId, API_URL]);

  // Add a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const response = await axios.post(
        API_URL,
        { content: commentText },
        { withCredentials: true }
      );
      if (response.data.success) {
        const newComment = {
          _id: Date.now(), // Temporary ID
          content: commentText,
          commentedBy: { name: "You" }, // Replace with current user info if available
          createdAt: new Date().toISOString(),
        };

        setComments([...comments, newComment]);
        setCommentText("");
      }
    } catch (err) {
      setError("Error adding comment");
    }
  };

  return (
    <div className="mx-auto max-w-md p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Comments</h1>

      {/* Comment submission section */}
      <form onSubmit={handleAddComment} className="mb-6">
        <label htmlFor="new-comment" className="block text-lg font-medium mb-2">
          Add a comment
        </label>
        <div className="flex">
          <input
            id="new-comment"
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Type your comment..."
            className="w-full px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Loading and error states */}
      {loading && <p className="text-gray-500">Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Comments list */}
      <div className="space-y-4">
        {comments.map(({ _id, content, commentedBy, createdAt }) => (
          <div
            key={_id}
            className="bg-white p-4 rounded shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800">
                {commentedBy?.name || "Unknown"}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-gray-700">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
