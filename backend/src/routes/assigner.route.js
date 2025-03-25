import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    getAllTasks, 
    getTaskById, 
    assignTask, 
    acceptTask, 
    editTask, 
    deleteTask, 
    reassignTask, 
    markComplete, 
    approveCompletion, 
    getCompletedTasks  
} from "../controllers/assigner.controller.js";

const router = express.Router();

router.post("/assign", verifyJWT, assignTask);
router.put("/accept/:taskId", verifyJWT, acceptTask);
router.put("/edit/:taskId", verifyJWT, editTask);
router.delete("/delete/:taskId", verifyJWT, deleteTask);
router.put("/reassign/:taskId", verifyJWT, reassignTask);
router.put("/complete/:taskId", verifyJWT, markComplete);
router.put("/approve/:taskId", verifyJWT, approveCompletion);
router.get("/tasks", verifyJWT, getAllTasks);
router.get("/completed-tasks", verifyJWT, getCompletedTasks); // ✅ Fixed Route

export default router;
