import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ChevronDown, ChevronUp, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Comment {
  id: number;
  userId: string;
  user: string;
  message: string;
  timestamp: string;
}

const TaskDetail: React.FC = () => {
  const user = { id: "user123", name: "John Doe" };
  const [comments, setComments] = useState<Comment[]>([]);
  const [openUser, setOpenUser] = useState<{ [key: string]: boolean }>({});
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setComments([
      {
        id: 1,
        userId: "user123",
        user: "John Doe",
        message: "Hey, did you check the latest update?",
        timestamp: "10:15 AM",
      },
      {
        id: 2,
        userId: "user456",
        user: "Alice",
        message: "Yes, I reviewed it. Looks good!",
        timestamp: "10:18 AM",
      },
      {
        id: 3,
        userId: "user123",
        user: "John Doe",
        message: "Great! I'll finalize it then.",
        timestamp: "10:20 AM",
      },
      {
        id: 4,
        userId: "user456",
        user: "Alice",
        message: "Let me know if you need any help.",
        timestamp: "10:22 AM",
      },
      {
        id: 5,
        userId: "user123",
        user: "John Doe",
        message: "Will do, thanks!",
        timestamp: "10:25 AM",
      },
    ]);
  }, []);

  const toggleUserComments = (userId: string) => {
    setOpenUser((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentObj: Comment = {
      id: comments.length + 1,
      userId: user.id,
      user: user.name,
      message: newComment,
      timestamp: new Date().toLocaleTimeString(),
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
    <div className="p-20 max-w-3xl mx-auto rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-white py-4 bg-gray-600 rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-700 hover:scale-105">
        Task Detail
      </h2>
      <Card className="mb-4 p-4 mt-4">
        <CardContent>
          <h3 className="text-lg font-semibold mb-3">Comments</h3>
          <div className="space-y-4">
            {[...new Set(comments.map((comment) => comment.userId))].map(
              (userId) => (
                <div
                  key={userId}
                  className="border rounded-lg p-3 bg-gray-50 shadow-sm transition duration-300 hover:shadow-lg"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
                    onClick={() => toggleUserComments(userId)}
                  >
                    <p className="font-semibold text-lg text-gray-600">
                      {
                        comments.find((comment) => comment.userId === userId)
                          ?.user
                      }
                    </p>
                    {openUser[userId] ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                  {openUser[userId] && (
                    <div className="mt-2 space-y-3 p-3">
                      {comments
                        .filter((comment) => comment.userId === userId)
                        .map((comment) => (
                          <div
                            key={comment.id}
                            className="p-3 bg-white border rounded-lg shadow-md transition duration-300 hover:shadow-xl"
                          >
                            <p className="text-md font-medium text-gray-900">
                              {comment.message}
                            </p>
                            <span className="text-xs text-gray-500 block mt-1">
                              {comment.timestamp}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comment Input Box */}
      {/* <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md flex items-center gap-2 transition duration-300 hover:shadow-lg">
        <Input
          className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300" onClick={handleAddComment}>
          <Send size={18} />
        </Button>
      </div> */}
    </div>
  );
};

export default TaskDetail;
