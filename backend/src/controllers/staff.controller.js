import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { Skill } from "../models/skill.model.js"
import { Abstract } from "../models/abstract.model.js";
import { Student } from "../models/student.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Staff } from "../models/staff.model.js";
import { SystemData } from "../models/system.model.js";
import { DonatedAbstract } from "../models/donatedAbstract.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const validateField = (field, fieldName) => {
    if (!field?.trim()) {
        throw new ApiError(400, `${fieldName} is required and cannot be empty`);
    }
};


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

    const student = await Student.findById(studentId).lean();
    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    const abstractIds = student.submittedAbstracts || [];
    if (abstractIds.length === 0) {
        return res.status(200).json(new ApiResponse(200, [], "No abstracts submitted"));
    }

    const abstracts = await Abstract.find({ _id: { $in: abstractIds } }).lean();
    const matchedAbstractIds = abstracts.flatMap(a => a.matched.map(m => m.abstractId));
    const matchedAbstracts = await Abstract.find({ _id: { $in: matchedAbstractIds } }).lean();

    const matchedMap = matchedAbstracts.reduce((acc, abs) => {
        acc[abs._id] = abs;
        return acc;
    }, {});

    const data = abstracts.map(abstract => ({
        abstractId: abstract._id,
        title: abstract.title,
        abstract: abstract.abstract,
        domain: abstract.domain,
        keywords: abstract.keywords,
        matched: abstract.matched.map(m => {
            const matchedAbs = matchedMap[m.abstractId];
            return matchedAbs
                ? {
                      title: matchedAbs.title,
                      abstract: matchedAbs.abstract,
                      domain: matchedAbs.domain,
                      keywords: matchedAbs.keywords,
                      abstractStatus: matchedAbs.status,
                  }
                : null;
        }).filter(Boolean),
        abstractStatus: abstract.status,
    }));

    res.status(200).json(new ApiResponse(200, data, "Abstracts fetched successfully"));
});


const setVirifiedAbstract = asyncHandler(async (req, res) => {

    const { ApprovedAbstractIds, studentId } = req.body;

    if (Array.isArray(ApprovedAbstractIds) && ApprovedAbstractIds.length > 0) {
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



const donateAbstracts = asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const AbstractData = req.body;

        if (!Array.isArray(AbstractData) || AbstractData.length === 0) {
            throw new ApiError(400, "No abstracts submitted to insert");
        }

        const abstractToInsert = AbstractData.map(({ title, abstract, domain, keywords, matched }, index) => {
            validateField(title, `Title at index ${index}`);
            validateField(abstract, `Abstract at index ${index}`);

            if (!Array.isArray(domain) || domain.length === 0) {
                throw new ApiError(400, `Domain cannot be empty at index ${index}`);
            }
            if (!Array.isArray(keywords) || keywords.length === 0) {
                throw new ApiError(400, `Keywords cannot be empty at index ${index}`);
            }

            return {
                ownerId: req.staff._id,
                title,
                abstract,
                domain,
                keywords,
                matched: matched || -1,
            };
        });

        const insertedAbstracts = await Abstract.insertMany(abstractToInsert, { session });

        if (insertedAbstracts.length === 0) {
            throw new ApiError(400, "Proper abstracts format required");
        }

        const donatedAbstracts = insertedAbstracts.map(abstract => ({
            abstract: abstract._id,
            InUse: false,
            acceptedBy: null
        }));

        await DonatedAbstract.insertMany(donatedAbstracts, { session });

        await session.commitTransaction();

        return res.status(201).json(
            new ApiResponse(200, {}, "Abstract submitted successfully and reflected as donated")
        );
    } catch (error) {
        await session.abortTransaction();
        throw new ApiError(500, `Error while submitting abstract: ${error.message}`);
    } finally {
        session.endSession();
    }
});



export {
    check,
    // reset,
    getSubmittedAbstracts,
    setVirifiedAbstract,
    verifyAbstractStudentList,
    donateAbstracts,

}