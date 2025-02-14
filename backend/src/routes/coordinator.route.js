import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshTokenMiddleware } from "../middlewares/refreshToken.middleware.js";
import { findStaff } from "../middlewares/findStaff.middleware.js";
import { submitAbstracts, check, assignAbstractsToStaff } from "../controllers/coordinator.controller.js";

const router = Router()


router.route("/check").get(verifyJWT, refreshTokenMiddleware, check)
router.route("/submitAbstracts").post(verifyJWT, refreshTokenMiddleware, submitAbstracts)
router.route("/assignAbstractsToStaff").post(verifyJWT, refreshTokenMiddleware, assignAbstractsToStaff)
// router.route("/getSubmittedAbstracts").post(findStaff, getSubmittedAbstracts)



export default router