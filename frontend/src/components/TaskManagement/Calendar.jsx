import React, { useState, useEffect } from "react";
import axios from "axios";

function Calendar() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // State for current month and year navigation
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const API_URL = "http://localhost:4000/api/v1/assigner/task";

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        if (response.data.success) {
          setTasks(response.data.data);
        } else {
          setError("Failed to fetch tasks");
        }
      } catch (err) {
        setError("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Calculate days for the current month
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();

  const daysArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(new Date(currentYear, currentMonth, i));
  }

  // Highlight logic based on deadlines
  const getDayHighlight = (day) => {
    const tasksForDay = tasks.filter((task) => {
      const deadlineDate = new Date(task.deadline);
      return deadlineDate.toDateString() === day.toDateString();
    });

    if (tasksForDay.length === 0) return "";

    const isNearDeadline = tasksForDay.some((task) => {
      const deadlineDate = new Date(task.deadline);
      const diffTime = deadlineDate - today; // difference in milliseconds
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 3;
    });

    return isNearDeadline ? "bg-red-200" : "bg-blue-200";
  };

  // Navigation functions for previous and next month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-4 mt-28">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Prev
        </button>
        <h1 className="text-2xl font-bold text-blue-600">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentYear}
        </h1>
        <button
          onClick={handleNextMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Next
        </button>
      </div>
      {loading && <p className="text-gray-500">Loading tasks...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-7 gap-2">
        {daysArray.map((day) => (
          <div
            key={day.toISOString()}
            className={`border border-gray-200 p-2 h-20 flex flex-col justify-between ${getDayHighlight(
              day
            )}`}
          >
            <span className="text-sm font-medium">{day.getDate()}</span>
            <div className="text-xs">
              {tasks
                .filter((task) => {
                  const deadlineDate = new Date(task.deadline);
                  return deadlineDate.toDateString() === day.toDateString();
                })
                .map((task) => (
                  <p key={task.id} className="truncate" title={task.title}>
                    {task.title}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
