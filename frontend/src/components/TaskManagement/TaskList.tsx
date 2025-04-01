import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { useToast } from "../ui/use-toast";
import TaskForm from "./TaskForm";
import TaskDetails from "./TaskDetails";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "inProgress" | "completed" | "approved";
  assigner: User;
  receiver: User;
  remark?: string;
  createdAt: string;
  updatedAt: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data.tasks);
      setError(null);
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const handleCreateTask = async (data: {
    title: string;
    description: string;
    receiverId: string;
  }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/tasks`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Success",
        description: "Task created successfully",
      });
      setShowCreateForm(false);
      fetchTasks();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
      console.error(err);
    }
  };

  const handleAcceptTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/tasks/${taskId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Success",
        description: "Task accepted",
      });
      fetchTasks();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to accept task",
        variant: "destructive",
      });
      console.error(err);
    }
  };

  const handleMarkComplete = async (taskId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/tasks/${taskId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Success",
        description: "Task marked as complete",
      });
      fetchTasks();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to mark task as complete",
        variant: "destructive",
      });
      console.error(err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      case "inProgress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800">
            Completed
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Approved
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseDetails = () => {
    setSelectedTask(null);
    fetchTasks();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading tasks...
      </div>
    );
  }

  if (error && tasks?.length === 0) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <Button onClick={() => setShowCreateForm(true)}>Create Task</Button>
      </div>

      {showCreateForm && (
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Task</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskForm
                onSubmit={handleCreateTask}
                onCancel={() => setShowCreateForm(false)}
                users={users}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={handleCloseDetails}
          users={users}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks?.length === 0 ? (
          <div className="col-span-full text-center py-10">
            No tasks found. Create a new task to get started.
          </div>
        ) : (
          (tasks ?? []).map((task) => (
            <Card key={task._id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  {getStatusBadge(task.status)}
                </div>
                <CardDescription>
                  Assigned to: {task.receiver.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm line-clamp-3">{task.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" onClick={() => handleViewTask(task)}>
                  View Details
                </Button>
                {task.status === "pending" &&
                  task.receiver._id === localStorage.getItem("userId") && (
                    <Button onClick={() => handleAcceptTask(task._id)}>
                      Accept
                    </Button>
                  )}
                {task.status === "inProgress" &&
                  task.receiver._id === localStorage.getItem("userId") && (
                    <Button onClick={() => handleMarkComplete(task._id)}>
                      Mark Complete
                    </Button>
                  )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
