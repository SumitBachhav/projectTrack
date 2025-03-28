import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Task } from "../models/assigner.model.js";


export const assignTask = async (req, res) => {
  try {
    const { title, description, receiverId, deadline, remark } = req.body;
    const assignerId = req.user.id;

    // Validate required fields
    if (!title || !description || !receiverId || !deadline) {
      return res.status(400).json({
        message: "Required fields: title, description, receiverId, deadline"
      });
    }

    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    // Validate deadline is a future date
    if (new Date(deadline) < new Date()) {
      return res.status(400).json({
        message: "Deadline must be a future date"
      });
    }

    // Create task document
    const task = new Task({
      title,
      description,
      assigner: assignerId,
      receiver: receiverId,
      deadline,
      remark: remark || undefined, 
    });

    await task.save();

    res.status(201).json({
      message: "Task assigned successfully",
      task: {
        _id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        deadline: task.deadline,
        assigner: assignerId,
        receiver: receiverId,
        remark: task.remark
      }
    });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error.message 
    });
  }
};

//accept Task (Receiver)
export const acceptTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: "Task not found" });
    
    //check if the current user is the assigned receiver
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

// edit task assigner only
export const editTask = async (req, res) => {
  try {
    // auth check
    if (!req.user?.id) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { id } = req.params;
    const { title, description, remark, deadline } = req.body;

    // Validate task ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }

    // find task and who is assigner
    const task = await Task.findOne({
      _id: id,
      assigner: req.user.id
    });

    if (!task) {
      return res.status(404).json({ 
        message: "Task not found or you don't have permission to edit it"
      });
    }

    //updates
    const updates = {};
    const allowedFields = ['title', 'description', 'remark', 'deadline'];
    
    // validate and prepare updates
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        if (typeof req.body[field] === 'string') {
          updates[field] = req.body[field].trim();
          
          // Check for empty strings after trim
          if (!updates[field]) {
            return res.status(400).json({ 
              message: `${field} cannot be empty`
            });
          }
        } else {
          updates[field] = req.body[field];
        }
      }
    }

    // validation for deadline
    if (updates.deadline) {
      const newDeadline = new Date(updates.deadline);
      if (isNaN(newDeadline)) {
        return res.status(400).json({ message: "Invalid deadline format" });
      }
      if (newDeadline < new Date()) {
        return res.status(400).json({ message: "Deadline must be in the future" });
      }
      updates.deadline = newDeadline;
    }

    // update task with validation
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
        select: '-__v -previousAssignments'
      }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task updated successfully",
      task: updatedTask.toObject({ virtuals: true })
    });

  } catch (error) {
    console.error("Error editing task:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });

    // handle specific error types
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: "Validation failed",
        errors 
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: "Invalid data format",
        field: error.path 
      });
    }

    res.status(500).json({
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

//delete Task (Only assigner)
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

//reassign Task (Only assigner)
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

//mark as Complete (Receiver)
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

//approve Completion (only assigner)
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



//Get on all tasks for the current user (
export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    //validate user id format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    //find tasks with pagination,filtering
    const tasks = await Task.find({
      $or: [
        { assigner: userId },
        { receiver: userId }
      ]
    })
    .populate('assigner', 'name email _id')
    .populate('receiver', 'name email _id')
    .select('-__v') //exclude version key
    .sort({ createdAt: -1 })
    .lean();

    //transform tasks for better client-side consumption
    const transformedTasks = tasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      deadline: task.deadline,
      assigner: {
        id: task.assigner._id,
        name: task.assigner.name,
        email: task.assigner.email
      },
      receiver: {
        id: task.receiver._id,
        name: task.receiver.name,
        email: task.receiver.email
      },
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    }));

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: transformedTasks
    });

  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

//get task by id of task
export const getTaskById = async (req, res) => {
  try {
    const userId = req.user.id;

    //validating id is in hex or not 
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    //finding the tasks
    const tasks = await Task.find({
      $or: [
        { assigner: userId },
        { receiver: userId }
      ]
    })
    .populate('assigner', 'name email _id')
    .populate('receiver', 'name email _id')
    .select('-__v')
    .sort({ createdAt: -1 });

    //transform tasks
    const transformedTasks = tasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      deadline: task.deadline,
      assigner: {
        id: task.assigner._id,
        name: task.assigner.name,
        email: task.assigner.email
      },
      receiver: {
        id: task.receiver._id,
        name: task.receiver.name,
        email: task.receiver.email
      },
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    }));

    return res.status(200).json({
      success: true,
      count: transformedTasks.length,
      data: transformedTasks
    });

  } catch (error) {
    console.error("Error fetching user tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

//get task by user 
export const getTasksAcceptedByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    //validate user ID format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    //find tasks where the user is the receiver and the task is in progress
    const tasks = await Task.find({
      receiver: userId,
      status: "inProgress", //glter for accepted tasks
    })
      .populate("assigner", "name email _id")
      .populate("receiver", "name email _id")
      .select("-__v")
      .sort({ createdAt: -1 });

    //transform tasks for better client-side consumption
    const transformedTasks = tasks.map((task) => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      deadline: task.deadline,
      assigner: {
        id: task.assigner._id,
        name: task.assigner.name,
        email: task.assigner.email,
      },
      receiver: {
        id: task.receiver._id,
        name: task.receiver.name,
        email: task.receiver.email,
      },
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      count: transformedTasks.length,
      data: transformedTasks,
    });
  } catch (error) {
    console.error("Error fetching accepted tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};


export const getMyCompletedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      receiver: req.user.id,        //tasks assigned to user
      status: 'completed',          //only completed 
      completedAt: { $exists: true }//ensure completion 
    })
    
    .select('title deadline status _id assigner receiver completedAt')

    .populate('assigner', 'name')   //only get assigner name
    .populate('receiver', 'name')   //only get receiver name
    
    .sort({ completedAt: -1 })
    // to increase performance
    .lean();                        

    // transform data
    const formattedTasks = tasks.map(task => ({
      Title: task.title,
      Deadline: task.deadline,
      Status: task.status,
      TaskId: task._id.toString(),
      To: task.receiver?.name || 'Unknown', 
      From: task.assigner?.name || 'Unknown' 
    }));

    res.json(formattedTasks);

  } catch (error) {

    console.error(`[${new Date().toISOString()}] Error fetching completed tasks:`, error);
    
    
    res.status(500).json({ 
      message: 'Failed to fetch completed tasks',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};

export const getAllCompletedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ status: 'completed' })
      .select('title deadline status _id assigner receiver')
      .populate('assigner', 'name email')
      .populate('receiver', 'name email')
      .sort({ completedAt: -1 });

    res.json(tasks.map(task => ({
      Title: task.title,
      Deadline: task.deadline,
      Status: task.status,
      TaskId: task._id,
      To: task.receiver.name,
      From: task.assigner.name
    })));

  } catch (error) {
    console.error('Error fetching all completed tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getAssignedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assigner: req.user.id,  // tasks assigned by current user
    })
    .select('title deadline status _id receiver')
    .populate('receiver', 'name')  // get receiver's name
    .sort({ deadline: -1 })
    .lean();

    const formattedTasks = tasks.map(task => ({
      Title: task.title,
      Deadline: task.deadline,
      Status: task.status,
      TaskId: task._id.toString(),
      To: task.receiver?.name || 'Unknown User'
    }));

    res.json(formattedTasks);

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Assigned tasks error:`, error);
    res.status(500).json({
      message: 'Failed to fetch assigned tasks',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};