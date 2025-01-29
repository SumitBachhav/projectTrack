import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    registerStudent,
    refreshAccessToken, 
    changeCurrentPassword, 
    check,
    registerStaff
//     getCurrentUser, 
//     updateUserAvatar, 
//     updateUserCoverImage, 
//     getUserChannelProfile, 
//     getWatchHistory, 
//     updateAccountDetails
} from "../controllers/user.controller.js";
// import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
//     // upload.fields([
//     //     {
//     //         name: "avatar",
//     //         maxCount: 1
//     //     }, 
//     //     {
//     //         name: "coverImage",
//     //         maxCount: 1
//     //     }
//     // ]),
    registerUser
    )

router.route("/login").post(loginUser)
router.route("/check").get(verifyJWT, check)

//secured routes
router.route("/logout").get(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/register-student").post(verifyJWT, registerStudent)
router.route("/register-staff").post(verifyJWT, registerStaff)
// router.route("/current-user").get(verifyJWT, getCurrentUser)
// router.route("/update-account").patch(verifyJWT, updateAccountDetails)

// router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
// router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

// router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
// router.route("/history").get(verifyJWT, getWatchHistory)

export default router