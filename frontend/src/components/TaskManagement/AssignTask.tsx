import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AssignTask: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-gray-700 text-white text-center py-3 rounded-lg font-bold text-xl shadow-lg"
      >
        Assign Task
      </motion.div>

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
        <button className="bg-gray-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition">
          Users Task
        </button>
        <button className="bg-gray-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition">
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

      {/* Task Details Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      >
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
          >
            <h3 className="text-lg font-bold text-gray-800">Task {index + 1}</h3>
            <p className="text-gray-600 mt-2">Assigned To: User {index + 1}</p>
            <p className="text-gray-600">Deadline: {new Date().toLocaleDateString()}</p>
            <p className="text-gray-600">Status: Ongoing</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AssignTask;
