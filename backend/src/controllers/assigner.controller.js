import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

// Assign a Task
export const assignTask = async (req, res) => {
    try {
        const { title, description, receiverId, dueDate } = req.body;
        const assignerId = req.user._id;

        // Check if receiver exists
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ message: "Receiver not found" });
        }

        const newTask = new Task({
            title,
            description,
            assigner: assignerId,
            receiver: receiverId,
            dueDate
        });

        await newTask.save();

        res.status(201).json({ message: "Task assigned successfully", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Error assigning task", error: error.message });
    }
};

// Accept a Task
export const acceptTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user._id;

        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (task.receiver.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized to accept this task" });
        }

        task.status = "inProgress";
        task.acceptedBy = userId;
        await task.save();

        res.status(200).json({ message: "Task accepted", task });
    } catch (error) {
        res.status(500).json({ message: "Error accepting task", error: error.message });
    }
};

// Edit a Task
export const editTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, dueDate, status } = req.body;
        const assignerId = req.user._id;

        const task = await Task.findOne({ _id: taskId, assigner: assignerId });
        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (dueDate) task.dueDate = dueDate;
        if (status) task.status = status;

        await task.save();

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error: error.message });
    }
};

// Delete a Task
export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const assignerId = req.user._id;

        const task = await Task.findOneAndDelete({ _id: taskId, assigner: assignerId });
        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }
};

// Reassign a Task
export const reassignTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { newReceiverId } = req.body;
        const assignerId = req.user._id;

        const task = await Task.findOne({ _id: taskId, assigner: assignerId });
        if (!task) return res.status(404).json({ message: "Task not found or unauthorized" });

        task.previousUsers.push(task.receiver);
        task.receiver = newReceiverId;
        task.status = "pending";
        await task.save();

        res.status(200).json({ message: "Task reassigned successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Error reassigning task", error: error.message });
    }
};

// Mark Task as Completed
export const markComplete = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user._id;

        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (task.receiver.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized to mark this task as completed" });
        }

        task.status = "completed";
        await task.save();

        res.status(200).json({ message: "Task marked as completed", task });
    } catch (error) {
        res.status(500).json({ message: "Error marking task as completed", error: error.message });
    }
};

// Approve Task Completion
export const approveCompletion = async (req, res) => {
    try {
        const { taskId } = req.params;
        const assignerId = req.user._id;

        const task = await Task.findOne({ _id: taskId, assigner: assignerId });
        if (!task) return res.status(404).json({ message: "Task not found or unauthorized" });

        task.status = "approved";
        await task.save();

        res.status(200).json({ message: "Task completion approved", task });
    } catch (error) {
        res.status(500).json({ message: "Error approving task", error: error.message });
    }
};


export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate("assigner receiver", "name email");
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
};


export const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId).populate("assigner receiver", "name email");

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error: error.message });
    }
};



export const getCompletedTasks = async (req, res) => {
    try {
        const completedTasks = await Task.find({ status: "completed" })
            .select("title dueDate status _id receiver assigner")
            .populate("receiver", "name email")
            .populate("assigner", "name email");

        res.status(200).json({ tasks: completedTasks }); // ✅ Fixed response format
    } catch (error) {
        res.status(500).json({ message: "Error fetching completed tasks", error: error.message });
    }
};
