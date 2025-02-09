import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { findStaff } from "../middlewares/findStaff.middleware.js";
import { submitAbstracts, check } from "../controllers/coordinator.controller.js";

const router = Router()


router.route("/check").get(verifyJWT, check)
router.route("/submitAbstracts").post(verifyJWT, submitAbstracts)
// router.route("/getSubmittedAbstracts").post(findStaff, getSubmittedAbstracts)



export default router