import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { findStaff } from "../middlewares/findStaff.middleware.js";
import { check, getSubmittedAbstracts, setVirifiedAbstract, tempSetList, verifyAbstractStudentList } from "../controllers/staff.controller.js";

const router = Router()


router.route("/check").get(findStaff, check)
router.route("/studentListToVerify").get(findStaff, verifyAbstractStudentList)
router.route("/getSubmittedAbstracts").post(findStaff, getSubmittedAbstracts)
router.route("/setVirifiedAbstract").post(findStaff, setVirifiedAbstract)
router.route("/temp").get(findStaff, tempSetList)



export default router