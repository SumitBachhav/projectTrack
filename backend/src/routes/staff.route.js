import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { findStaff } from "../middlewares/findStaff.middleware.js";
import { refreshTokenMiddleware } from "../middlewares/refreshToken.middleware.js";
import { 
    check,
    reset,
    getSubmittedAbstracts, 
    setVirifiedAbstract, 
    verifyAbstractStudentList, 
    setStaffExpertise,
    staffDashboard
} from "../controllers/staff.controller.js";

const router = Router()


router.route("/check").get(verifyJWT, refreshTokenMiddleware, check)
router.route("/reset").get(verifyJWT, refreshTokenMiddleware, reset)
router.route("/studentListToVerify").get(verifyJWT, refreshTokenMiddleware, verifyAbstractStudentList)
router.route("/getSubmittedAbstracts").post(verifyJWT, refreshTokenMiddleware, getSubmittedAbstracts)
router.route("/setVirifiedAbstract").post(verifyJWT, refreshTokenMiddleware, setVirifiedAbstract)
router.route("/setStaffExpertise").post(verifyJWT, refreshTokenMiddleware, setStaffExpertise)
router.route("/staffDashboard").get(verifyJWT, refreshTokenMiddleware, staffDashboard)



export default router