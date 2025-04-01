import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBars } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

interface User {
  id: string;
  name: string;
}

interface Task {
  id: number;
  title: string;
  deadline: string;
}

interface ApiResponse {
  statusCode: number;
  data: User[] | null;
  message?: string;
}

const TaskHomePage: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const tasks: Task[] = [
    { id: 1, title: "Design Landing Page", deadline: "March 31, 2025" },
    { id: 2, title: "API Integration", deadline: "April 2, 2025" },
    { id: 3, title: "Fix UI Bugs", deadline: "April 5, 2025" },
  ];

  useEffect(() => {
    if (activeSection === "users") {
      fetchUsers();
    }
  }, [activeSection]);

  const fetchUsers = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/assigner/task/me",
        { withCredentials: true }
      );

      if (
        response.data &&
        response.data.success &&
        Array.isArray(response.data.data)
      ) {
        const tasks = response.data.data;
        console.log("Fetched tasks:", tasks);
        // Process tasks as needed
      } else {
        throw new Error(
          "Unexpected response format: " + JSON.stringify(response.data)
        );
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      // Additional error handling as needed
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 md:p-20">
      {/* Header */}
      <div className="w-full max-w-6xl bg-gray-800 text-white text-center py-4 rounded-lg text-2xl font-bold shadow-lg">
        Task Home Page
      </div>

      {/* Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl flex flex-wrap justify-between items-center mt-6 gap-3"
      >
        <button className="bg-gray-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition">
          This Milestone ◀
        </button>
        <button
          className={`${
            activeSection === "users" ? "bg-blue-600" : "bg-gray-600"
          } text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition`}
          onClick={() => setActiveSection("users")}
        >
          Users Task
        </button>
        <button
          className={`${
            activeSection === "tasks" ? "bg-blue-600" : "bg-gray-600"
          } text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition`}
          onClick={() => setActiveSection("tasks")}
        >
          All Tasks
        </button>

        {/* Menu Button */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
          >
            <FaBars size={20} />
          </button>
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-48 bg-gray-200 rounded-lg shadow-lg p-3 z-10"
              >
                <ul className="space-y-2 text-gray-700">
                  <li className="hover:bg-gray-300 p-2 rounded-md cursor-pointer transition">
                    Task Home Page
                  </li>
                  <li className="hover:bg-gray-300 p-2 rounded-md cursor-pointer transition">
                    Assigned Tasks
                  </li>
                  <li className="hover:bg-gray-300 p-2 rounded-md cursor-pointer transition">
                    Assign a Task
                  </li>
                  <li className="hover:bg-gray-300 p-2 rounded-md cursor-pointer transition">
                    Completed Tasks
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Main Content Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Left Section - Requests & Ongoing Tasks */}
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-gray-800">Requests</h2>
          <div className="mt-4 space-y-3">
            <div className="p-3 bg-gray-200 rounded-lg">
              From - Task Title - Deadline
            </div>
            <div className="p-3 bg-gray-200 rounded-lg">
              From - Task Title - Deadline
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mt-6">
            Ongoing Tasks
          </h2>
          <div className="mt-4 space-y-3">
            <div className="p-3 bg-blue-200 rounded-lg">
              From - Task Title - Deadline - Status
            </div>
            <div className="p-3 bg-blue-200 rounded-lg">
              From - Task Title - Deadline - Status
            </div>
          </div>
        </div>

        {/* Right Section - Dynamic Content */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow-lg">
          {activeSection === "tasks" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-lg font-bold text-gray-800">All Tasks</h2>
              <ul className="mt-4 space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="p-3 bg-green-200 rounded-lg shadow-md hover:bg-green-300 transition cursor-pointer"
                  >
                    {task.title} - Deadline:{" "}
                    {new Date(task.deadline).toLocaleString()}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {activeSection === "users" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-lg font-bold text-gray-800">Users List</h2>

              {loading && (
                <div className="text-center my-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                  <p className="mt-2 text-gray-600">Loading users...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
                  <p>Error: {error}</p>
                  <button
                    onClick={fetchUsers}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Retry
                  </button>
                </div>
              )}

              {!loading && !error && (
                <ul className="mt-4 space-y-3">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <li
                        key={user.id}
                        className="p-3 bg-yellow-200 rounded-lg shadow-md hover:bg-yellow-300 transition cursor-pointer flex justify-between items-center"
                      >
                        <span>{user.name}</span>
                        <span className="text-xs text-gray-500">
                          ID: {user.id.substring(0, 8)}...
                        </span>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500">No users found.</p>
                  )}
                </ul>
              )}
            </motion.div>
          )}

          {!activeSection && (
            <div className="text-gray-600 text-center mt-6">
              Click a button to view tasks or users.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskHomePage;