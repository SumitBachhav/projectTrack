import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { findStudent } from "../middlewares/findStudent.middleware.js";
import { check, reset, submitSkills, submitAbstracts } from "../controllers/student.controller.js";

const router = Router()


router.route("/check").get(findStudent, check)
router.route("/reset").get(findStudent, reset)
router.route("/submitSkills").post(findStudent, submitSkills)
router.route("/submitAbstracts").post(findStudent, submitAbstracts)


// router.route("/login").post(loginUser)

//secured routes
// router.route("/logout").post(verifyJWT,  logoutUser)
// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/change-password").post(verifyJWT, changeCurrentPassword)
// router.route("/current-user").get(verifyJWT, getCurrentUser)
// router.route("/update-account").patch(verifyJWT, updateAccountDetails)

// router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
// router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

// router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
// router.route("/history").get(verifyJWT, getWatchHistory)

export default router