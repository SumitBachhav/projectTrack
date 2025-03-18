import { Router } from "express";
import { 
    assignTask, 
    acceptTask, 
    editTask, 
    deleteTask, 
    reassignTask, 
    markComplete, 
    approveCompletion,
    getAllTasks,
    getTaskById
} from "../controllers/assigner.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Apply authentication middleware to all routes
router.use(verifyJWT);

// Task management routes
router.post("/", assignTask);
router.patch("/:id/accept", acceptTask);
router.put("/:id", editTask);
router.delete("/:id", deleteTask);
router.patch("/:id/reassign", reassignTask);
router.patch("/:id/complete", markComplete);
router.patch("/:id/approve", approveCompletion);

// Additional utility routes
router.get("/", getAllTasks);
router.get("/:id", getTaskById);

export default router; 