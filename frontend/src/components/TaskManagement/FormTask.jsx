import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";

const TaskCreateForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedDate, setSelectedDate] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState("");

  // Fetch users on component mount
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/users") // Adjust endpoint
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const onSubmit = async (data) => {
    if (!selectedReceiver) {
      toast.error("Please select a receiver!");
      return;
    }

    const formattedData = {
      ...data,
      receiverId: selectedReceiver, // Send selected user's _id
      deadline: selectedDate?.toISOString(),
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/assigner/task",
        formattedData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Task created successfully!");
        reset();
        setSelectedDate(null);
        setSelectedReceiver("");
      } else {
        toast.error("Error creating task!");
      }
    } catch (error) {
      console.error("Axios error:", error);
      toast.error("Failed to create task!");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-blue-50 border border-blue-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        Create Task
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Field */}
        <div>
          <label className="block text-blue-700 mb-1">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Task title"
            className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-blue-700 mb-1">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Task description"
            className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Receiver Dropdown */}
        <div>
          <label className="block text-blue-700 mb-1">Assign To</label>
          <select
            value={selectedReceiver}
            onChange={(e) => setSelectedReceiver(e.target.value)}
            className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a student</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          {!selectedReceiver && (
            <p className="text-red-500 text-sm mt-1">
              Please select a receiver.
            </p>
          )}
        </div>

        {/* Date Picker */}
        <div>
          <label className="block text-blue-700 mb-1">Deadline</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholderText="Select deadline"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Task
        </button>
      </form>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default TaskCreateForm;
