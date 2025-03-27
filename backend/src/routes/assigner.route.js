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
router.use(verifyJWT);

router.route('/')
  .get(getAllTasks)         
  .post(assignTask);        

router.route('/:id')
  .get(getTaskById)          
  .patch(editTask)           
  .delete(deleteTask);       

router.post('/:id/accept', acceptTask);         
router.post('/:id/reassign', reassignTask);     
router.post('/:id/complete', markComplete);     
router.post('/:id/approve', approveCompletion); 



export default router;