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

const router = express.Router();






export default router;