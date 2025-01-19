import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import { Student } from "../models/student.model.js"
import { Abstract } from "../models/abstract.model.js"
// import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const reset = asyncHandler( async (req, res) => {
    await Student.updateOne( { name: "testName" }, 
        { $set: { 
            submittedAbstracts: [],
            acceptedByStaffAbstracts: [],
            finalizedAbstract: "",
            donatedAbstracts: []
        
        } } ) 
        return res.status(201).json(
            new ApiResponse(200, {}, "user reset complete")
        )
})

const tempUser = asyncHandler( async (req, res) => {
    const{name, userID} = req.body;
    const student = await Student.create({
        name,
        userID,
            })

    res.send(student)
})

const submitTempAbstract = asyncHandler( async (req, res) => {
    // const {fullName, email, username, password } = req.body
    // console.log("email: ", email);

    // const abstractList = req.body;
    // abstractList.forEach(async (abstract) => {
    //     await Abstract.create({
    //         studentID: "123",
    //         title: abstract.title,
    //         abstract: abstract.abstract,
    //         domain: abstract.domain,
    //         keywords: abstract.keywords,
    //         score1: abstract.score1,
    //         score2: abstract.score2,
    //         score3: abstract.score3,
    //         matchedId1: abstract.matchedId1,
    //         matchedId2: abstract.matchedId2,
    //         matchedId3: abstract.matchedId3
    //     })
    // })
    // console.log(abstractList);
    // const x = await Student.updateOne( { name: "testName" }, { $set: { submittedAbstracts: ['6788677657c0361655cd2684', '6788677657c0361655cd2683'] } } ) 
    // console.log(x)
    res.send("abstract submitted")
})

export {
    reset,
    submitTempAbstract,
    tempUser
}