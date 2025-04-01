import React, { useState } from "react";

function Comments() {
  // Initial state with sample comments
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Martha",
      text: "This this is a test comment to check the the length and the max length of that comment section ",
      time: "10:15 AM",
    },
    {
      id: 2,
      author: "Johny",
      text: "Johny's insightful comment here.",
      time: "10:20 AM",
    },
    {
      id: 3,
      author: "Mary Kate",
      text: "Mary Kate’s note is here.",
      time: "10:25 AM",
    },
  ]);

  // Add a new comment with current time
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newComment = {
      id: Date.now(),
      author: "New User", // you can modify this as needed
      text: commentText,
      time: currentTime,
    };

    setComments([...comments, newComment]);
    setCommentText("");
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

      {/* Comments list */}
      <div className="space-y-4">
        {comments.map(({ id, author, text, time }) => (
          <div
            key={id}
            className="bg-white p-4 rounded shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800">{author}</span>
              <span className="text-sm text-gray-500">{time}</span>
            </div>
            <p className="text-gray-700">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
