import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
// import { protect } from '../middlewares/auth.middleware.js';
import {
  assignTask,
  acceptTask,
  editTask,
  deleteTask,
  reassignTask,
  markComplete,
  approveCompletion,
  getAllTasks,
  getTaskById,
} from '../controllers/assigner.controller.js';
import { protect } from '../middlewares/auth.middleware.js'; // Your auth middleware

const router = express.Router();

// Assign a new task (Assigner)
router.post('/tasks', protect, assignTask);

// Get all tasks for the current user (Assigner/Receiver)
router.get('/tasks', protect, getAllTasks);

// Get a specific task by ID (Assigner/Receiver)
router.get('/tasks/:id', protect, getTaskById);

// Accept a task (Receiver)
router.patch('/tasks/:id/accept', protect, acceptTask);

// Edit a task (Assigner)
router.put('/tasks/:id', protect, editTask);

// Delete a task (Assigner)
router.delete('/tasks/:id', protect, deleteTask);

// Reassign a task (Assigner)
router.patch('/tasks/:id/reassign', protect, reassignTask);

// Mark task as complete (Receiver)
router.patch('/tasks/:id/complete', protect, markComplete);

// Approve task completion (Assigner)
router.patch('/tasks/:id/approve', protect, approveCompletion);

export default router;