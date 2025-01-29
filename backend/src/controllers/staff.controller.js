import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { Skill } from "../models/skill.model.js"
import { Abstract } from "../models/abstract.model.js";
import { Student } from "../models/student.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Staff } from "../models/staff.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const check = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: `your user id is ${req.staff.userID}`
    })
})

// const reset = asyncHandler(async (req, res) => {

//     await Student.updateOne({ _id: req.student._id }, {
//         $set: {
//             // skills: [],
//             submittedAbstracts: [],
//             // certificates: [],
//             // github: "",
//             // groupId: "",
//             // acceptedByStaffAbstracts: [],
//             // finalizedAbstract: "",
//             // donatedAbstracts: [],
//             // invites: { sent: [], received: [] },
//             // requests: { sent: [], received: [] },
//         }
//     })
//         .catch((error) => {
//             throw new ApiError(500, `Something went wrong while reseting the student - ${error.message}`);
//         });

//     res.status(200).json({
//         success: true,
//         message: "reset successfull"
//     })
// })

const verifyAbstractStudentList = asyncHandler(async (req, res) => {

   try {
     const staff = await Staff.findOne({ _id: req.staff._id }).populate("verificationAssigned");
     
     if (!staff) {
         throw new ApiError(404, "Staff not found");
     }
     
     let data = [];
 
     for (let x of staff.verificationAssigned){
         data.push({
             id: x._id,
             userID: x.userID,
         })
     }

     res.status(200).json(
        new ApiResponse(200, data, "success")
    )
    
   } catch (error) {
    throw new ApiError(500, `Something went wrong while fetching student list - ${error.message}`);
   }


    
})


const getSubmittedAbstracts = asyncHandler(async (req, res) => {

    const { studentId } = req.body;
    const student = await Student.findById(studentId);

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    const abstractIds = student.submittedAbstracts;

    if (!abstractIds || abstractIds.length === 0) {
        return res.status(200).json(
            new ApiResponse(200, {}, "No abstracts submitted")
        )
    }

    const abstracts = await Abstract.find({ _id: { $in: abstractIds } });

    if (!abstracts) {
        throw new ApiError(404, "Abstracts not found, error fetching abstracts");
    }

    let data = [];

    try {
        for (let abstract of abstracts) {
            // abstract.ownerId = abstract.ownerId.toString();

            matchedData = [];
            for (let m of abstract.matched) {
                abs = await Abstract.findById(m.abstractId);
                matchedData.push({
                    title: abs.title,
                    abstract: abs.abstract,
                    domain: abs.domain,
                    keywords: abs.keywords,
                    // matched: abs.matched,
                    abstractStatus: abs.status,
                });
            }

            data.push({
                abstractId: abstract._id,
                title: abstract.title,
                abstract: abstract.abstract,
                domain: abstract.domain,
                keywords: abstract.keywords,
                matched: matchedData,
                abstractStatus: abstract.status,
            });
        }
    } catch (error) {
        throw new ApiError(404, "Matched Abstracts not found, error fetching abstracts", error.message);
    }

    res.status(200).json(
        new ApiResponse(200, data, "Abstracts fetched successfully")
    )
})

const setVirifiedAbstract = asyncHandler(async (req, res) => {

    const { ApprovedAbstractIds, studentId } = req.body;

    if (Array.isArray(ApprovedAbstractIds) || ApprovedAbstractIds.length > 0) {
        // await Abstract.updateMany({ _id: { $in: AbstractIds } }, { $set: { status: "verified" } });
        const student = await Student.findById(studentId);

        if (!student) {
            throw new ApiError(404, "Student not found");
        }

        const abstractIds = student.submittedAbstracts;

        try {
            for (let abstractId of abstractIds) {
                if (abstractId in ApprovedAbstractIds) {
                    await Abstract.updateOne({ _id: abstractId }, { $set: { status: "accepted" } });
                }else{
                    await Abstract.updateOne({ _id: abstractId }, { $set: { status: "rejected" } });
                }
            }
        } catch (error) {
            throw new ApiError(500, "Error while updating abstracts");
        }

        
        try {
            await Student.updateOne({ _id: studentId }, { $set: { acceptedByStaffAbstracts: ApprovedAbstractIds } });
        } catch (error) {
            throw new ApiError(500, "Error while updating student");
        }
    }

    res.status(200).json(
        new ApiResponse(200, {}, "Abstracts updated successfully")
    )

});

//TODO: update topic review page and overview page

const tempSetList = asyncHandler(async (req, res) => {

    const staff = await Staff.findOne({ _id: req.staff._id });

    if (!staff) {
        throw new ApiError(404, "Staff not found");
    }

    await Staff.updateOne({ _id: staff._id }, { $set: { verificationAssigned: ["6796ec73115d89c7ad592c49"] } });


    res.status(200).json(
        new ApiResponse(200, {}, "success")
    )
})


export {
    check,
    // reset,
    getSubmittedAbstracts,
    setVirifiedAbstract,
    verifyAbstractStudentList,
    tempSetList

}