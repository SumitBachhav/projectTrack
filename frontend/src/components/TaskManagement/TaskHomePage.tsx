import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const TaskHomePage: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Dummy Data
  const tasks = [
    { id: 1, title: "Design Landing Page", deadline: "March 31, 2025" },
    { id: 2, title: "API Integration", deadline: "April 2, 2025" },
    { id: 3, title: "Fix UI Bugs", deadline: "April 5, 2025" },
  ];

  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Alice Johnson" },
    { id: 3, name: "Michael Smith" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-20">
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
          className="bg-gray-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition"
          onClick={() => setActiveSection("users")}
        >
          Users Task
        </button>
        <button
          className="bg-gray-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition"
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
                className="absolute right-0 mt-2 w-48 bg-gray-200 rounded-lg shadow-lg p-3"
              >
                <ul className="space-y-2 text-gray-700">
                  <li className="hover:bg-gray-300 p-2 rounded-md cursor-pointer transition">Task Home Page</li>
                  <li className="hover:bg-gray-300 p-2 rounded-md cursor-pointer transition">Assigned Tasks</li>
                  <li className="hover:bg-gray-300 p-2 rounded-md cursor-pointer transition">Assign a Task</li>
                  <li className="hover:bg-gray-300 p-2 rounded-md cursor-pointer transition">Completed Tasks</li>
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
            <div className="p-3 bg-gray-200 rounded-lg">From - Task Title - Deadline</div>
            <div className="p-3 bg-gray-200 rounded-lg">From - Task Title - Deadline</div>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mt-6">Ongoing Tasks</h2>
          <div className="mt-4 space-y-3">
            <div className="p-3 bg-blue-200 rounded-lg">From - Task Title - Deadline - Status</div>
            <div className="p-3 bg-blue-200 rounded-lg">From - Task Title - Deadline - Status</div>
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
                    {task.title} - Deadline: {task.deadline}
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
              <ul className="mt-4 space-y-3">
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="p-3 bg-yellow-200 rounded-lg shadow-md hover:bg-yellow-300 transition cursor-pointer"
                  >
                    {user.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {!activeSection && (
            <div className="text-gray-600 text-center mt-6">Click a button to view tasks or users.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskHomePage;
