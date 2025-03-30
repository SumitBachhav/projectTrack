import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TaskDetail {
  groupId: string;
  from: string;
  to: string;
  title: string;
  description: string;
  status: string;
  assignedDate: string;
  deadline: string;
  assignerRemark: string;
}

const TaskRequest: React.FC = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState<TaskDetail | null>(null);
  const [status, setStatus] = useState<string>("Pending");

  useEffect(() => {
    setTask({
      groupId: "G-12345",
      from: "Manager",
      to: "John Doe",
      title: "Project Update",
      description: "Complete the final report and submit it by the deadline.",
      status: "Pending",
      assignedDate: "2025-03-31",
      deadline: "2025-04-07",
      assignerRemark: "Ensure accuracy and completeness in the report.",
    });
  }, []);

  const handleAccept = async () => {
    if (!task) return;
    try {
      const response = await fetch(`http://localhost:4000/api/v1/assigner/task/${task.groupId}/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setStatus("Accepted");
      } else {
        console.error("Failed to accept task");
      }
    } catch (error) {
      console.error("Error accepting task:", error);
    }
  };

  const handleReject = () => {
    setStatus("Rejected");
  };

  return (
    <div className="p-20 max-w-full mx-auto text-white rounded-lg shadow-md min-h-screen flex flex-col pb-2">
      <h2 className="text-2xl font-bold text-center py-4 bg-gray-600 w-full rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-600 hover:scale-105">
        Task Request Page
      </h2>
      {task && (
        <div className="flex flex-col lg:flex-row gap-4 mt-4 w-full pb-2">
          {/* Main Content */}
          <div className="flex-1 bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">{task.title}</h3>
            <p className="mb-2"><strong>Description:</strong> {task.description}</p>
            <p><strong>Assigner Remark:</strong> {task.assignerRemark}</p>
            <Button
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => navigate("/task-comment")}
            >
              View Comments
            </Button>
          </div>
          
          {/* Right Section */}
          <div className="bg-gray-600 p-6 rounded-lg shadow-lg w-full lg:w-1/2">
            <h3 className="text-xl font-semibold mb-3">Task Details</h3>
            <p><strong>Group ID:</strong> {task.groupId}</p>
            <p><strong>From:</strong> {task.from}</p>
            <p><strong>To:</strong> {task.to}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Assigned Date:</strong> {task.assignedDate}</p>
            <p><strong>Deadline:</strong> {task.deadline}</p>
            
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button
                className="bg-green-500 text-white w-full sm:w-1/3 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                onClick={handleAccept}
              >
                Accept
              </Button>
              <Button
                className="bg-red-500 text-white w-full sm:w-1/2 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                onClick={handleReject}
              >
                Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskRequest;
