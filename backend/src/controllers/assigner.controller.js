import mongoose from "mongoose";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

export const assignTask = async (req, res) => {
  try {
    const { title, description, receiverId } = req.body;
    const assignerId = req.user.id;

    // Create a new Task document using the Task model
    const task = new Task({
      title,
      description,
      assigner: assignerId,
      receiver: receiverId
    });
    await task.save();

    res.status(201).json({ message: "Task assigned successfully", task });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Accept Task (Receiver)
export const acceptTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: "Task not found" });
    
    // Check if the current user is the assigned receiver
    if (task.receiver.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });
      
    task.status = "inProgress";
    await task.save();

    res.json({ message: "Task accepted", task });
  } catch (error) {
    console.error("Error accepting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Edit Task (Only assigner)
export const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.assigner.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    task.title = title;
    task.description = description;
    await task.save();

    res.json({ message: "Task updated", task });
  } catch (error) {
    console.error("Error editing task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Task (Only assigner)
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.assigner.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reassign Task (Only assigner)
export const reassignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { newReceiverId } = req.body;
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.assigner.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    task.receiver = newReceiverId;
    task.status = "pending";
    await task.save();

    res.json({ message: "Task reassigned", task });
  } catch (error) {
    console.error("Error reassigning task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark as Complete (Receiver)
export const markComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.receiver.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    task.status = "completed";
    await task.save();

    res.json({ message: "Task marked as complete", task });
  } catch (error) {
    console.error("Error marking task complete:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Approve Completion (Only assigner)
export const approveCompletion = async (req, res) => {
  try {
    const { id } = req.params;
    const { remark, isApproved } = req.body;
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.assigner.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    task.status = isApproved ? "approved" : "pending";
    task.remark = remark;
    await task.save();

    res.json({
      message: isApproved ? "Task approved" : "Task marked as incomplete",
      task
    });
  } catch (error) {
    console.error("Error approving task completion:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tasks for the current user (either as assigner or receiver)
export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find tasks where the user is either the assigner or receiver
    const tasks = await Task.find({
      $or: [
        { assigner: userId },
        { receiver: userId }
      ]
    })
    .populate('assigner', 'name email')
    .populate('receiver', 'name email')
    .sort({ createdAt: -1 });
    
    res.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a specific task by ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const task = await Task.findById(id)
      .populate('assigner', 'name email')
      .populate('receiver', 'name email');
    
    if (!task) return res.status(404).json({ message: "Task not found" });
    
    // Check if the user is either the assigner or receiver
    if (task.assigner._id.toString() !== userId && task.receiver._id.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    res.json({ task });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Server error" });
  }
};
