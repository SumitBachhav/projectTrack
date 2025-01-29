import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { Skill} from "../models/skill.model.js"
import { Student } from "../models/student.model.js";
import { Staff } from "../models/staff.model.js";
// import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const { name, email, password, role  } = req.body
    //console.log("email: ", email);

    if (
        [name, email, password, role].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    // console.log( userId);

    const user = await User.create({
        name,
        email,
        password,
        role,
        childId: "none"
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        // new ApiResponse(200, createdUser, "User registered Successfully")
        new ApiResponse(200, {}, "User registered Successfully")
    )

})

const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { email, password } = req.body
    console.log(email);

    if (!email) {
        throw new ApiError(400, "email is required")
    }


    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const check = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    const student = await Student.findById(user?.childId);

    res.status(200).json({
        success: true,
        message: `your user id is ${student?.userID}`
    })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})


const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const registerStudent = asyncHandler(async (req, res) => {

    const { userID, year, division, department, certificates, github  } = req.body

    if (
        // [userID, year, division, department, skills, certificates, github].some((field) => field?.trim() === "")
        [userID, year, division, department, certificates, github].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedStudent = await Student.findOne({ userID })

    if (existedStudent) {
        throw new ApiError(409, "student with userID already exists")
    }


    const student = await Student.create({
        id: req.user._id,
        userID: userID.toLowerCase(),
        year,
        division,
        department,
        certificates,
        github,
    })

    const createdStudent = await Student.findById(student._id)

    if (!createdStudent) {
        throw new ApiError(500, "Something went wrong while registering the student")
    }

    await User.updateOne({ _id: req.user._id }, { $set: { childId: createdStudent._id } }, { new: true }).catch((error) => {
        throw new ApiError(500, `Something went wrong while updating user - ${error.message}`)
    })

    return res.status(201).json(
        // new ApiResponse(200, createdUser, "User registered Successfully")
        new ApiResponse(200, {}, "Student registered Successfully")
    )

})
// TODO: work needs to be done for github and certificates

const registerStaff = asyncHandler(async (req, res) => {

    // const { userID, department, expertise, otherSkills  } = req.body
    const { userID, department } = req.body

    if (
        [userID, department].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedStaff = await Staff.findOne({ userID })

    if (existedStaff) {
        throw new ApiError(409, "staff with userID already exists")
    }


    const staff = await Staff.create({
        id: req.user._id,
        userID: userID.toLowerCase(),
        department,
        // expertise,
        // otherSkills,
    })
    // TODO: scrape scholar api for expertise

    const createdStaff = await Staff.findById(staff._id)

    if (!createdStaff) {
        throw new ApiError(500, `Something went wrong while registering the staff - ${error.message}`)
    }

    await User.updateOne({ _id: req.user._id }, { $set: { childId: createdStaff._id } }, { new: true }).catch((error) => {
        throw new ApiError(500, `Something went wrong while updating user - ${error.message}`)
    })

    return res.status(201).json(
        // new ApiResponse(200, createdUser, "User registered Successfully")
        new ApiResponse(200, {}, "Staff registered Successfully")
    )

})

export {
    registerUser,
    registerStudent,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    check,
    registerStaff
}