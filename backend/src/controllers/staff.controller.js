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

const reset = asyncHandler(async (req, res) => {

    await Staff.updateOne({ _id: req.user._id }, {
        $set: {
            // userID: [],
            // department: [],
            // expertiseDomain: [],
            // groups: [],
            verificationAssigned: [],
        }
    })
        .catch((error) => {
            throw new ApiError(500, `Something went wrong while reseting the student - ${error.message}`);
        });

    res.status(200).json({
        success: true,
        message: "reset successfull"
    })
})

const toVerifyAbstractList = asyncHandler(async (req, res) => {

   try {
     const staff = await Staff.findById(req.user._id).populate("verificationAssigned");
     
     if (!staff) {
         throw new ApiError(404, "Staff not found");
     }
     
     let data = [];
 
     for (let x of staff.verificationAssigned){
         data.push({
             id: x._id,
             title: x.title,
             status: x.status
         })
     }

     res.status(200).json(
        new ApiResponse(200, data, "success")
    )
    
   } catch (error) {
    throw new ApiError(500, `Something went wrong while fetching student list - ${error.message}`);
   }


    
})


const getAbstractDetail = asyncHandler(async (req, res) => {
    const { abstractId } = req.body;

    const abstractData = await Abstract.findById(abstractId);
    if (!abstractData) {
        throw new ApiError(404, "Abstract not found");
    }

    const matchedAbstractIds = abstractData.matched.map(m => m.abstractId);
    // console.log('matchedAbstractIds', matchedAbstractIds);

    const matchedAbstracts = await Abstract.find({ _id: { $in: matchedAbstractIds } }).lean();
    // console.log('matchedAbstracts', matchedAbstracts);

    const matchedMap = matchedAbstracts.reduce((acc, abs) => {
        acc[abs._id] = abs;
        return acc;
    }, {});

    // console.log('matchedMap', matchedMap);

    const data = {
        ownerId: abstractData.ownerId,
        abstractId: abstractData._id,
        title: abstractData.title,
        abstract: abstractData.abstract,
        domain: abstractData.domain,
        keywords: abstractData.keywords,
        matched: abstractData.matched.map(m => {

            const matchedAbs = matchedMap[m.abstractId];
            const absData = {
                title: matchedAbs.title,
                abstract: matchedAbs.abstract,
                domain: matchedAbs.domain,
                keywords: matchedAbs.keywords,
                ownerId: matchedAbs.ownerId
            }
            const score = m.score;

            return {
                ...absData, score
            }
        }),
        abstractStatus: abstractData.status,
        comments: abstractData.comments
    };

    res.status(200).json(new ApiResponse(200, data, "Abstracts fetched successfully"));
});


const updateAbstractReview = asyncHandler(async (req, res) => {
    const { reviewedAbstractId, status, comments } = req.body;

    if (!reviewedAbstractId || !status) {
        throw new ApiError(400, "Reviewed Abstract ID and status are required.");
    }

    const validStatuses = ['pending', 'submitted', 'revision', 'accepted', 'rejected', 'completed'];
    if (!validStatuses.includes(status)) {
        throw new ApiError(400, "Invalid status value.");
    }

    const abstract = await Abstract.findById(reviewedAbstractId);
    if (!abstract) {
        throw new ApiError(404, "Abstract not found.");
    }

    abstract.status = status;
    if (comments) {
        abstract.comments.push(comments);
    }

    await abstract.save();

    res.status(200).json(new ApiResponse(200, "Abstract review updated successfully", abstract));
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

const setStaffExpertise = async (req, res, next) => {
    try {
        const staffId = req.user._id;
        const  expertiseDomains = req.body; // Array of domains from request body

        // Step 1: Validate input
        // console.log(expertiseDomains)
        if (!Array.isArray(expertiseDomains) || expertiseDomains.length === 0) {
            throw new ApiError(400, 'Expertise domains must be a non-empty array.');
        }

        // Validate each domain object
        for (const domainObj of expertiseDomains) {
            if (!domainObj.domain || typeof domainObj.domain !== 'string') {
                throw new ApiError(400, 'Each domain must have a valid domain name.');
            }
            if (!domainObj.experience || isNaN(domainObj.experience)) {
                throw new ApiError(400, 'Each domain must have a valid experience as a number.');
            }
        }

        // Step 2: Update staff expertise in the database
        const updatedStaff = await Staff.findByIdAndUpdate(
            staffId,
            { $set: { expertiseDomain: expertiseDomains.map(d => ({ domain: d.domain, experience: parseInt(d.experience) })) } },
            { new: true, runValidators: true }
        );

        if (!updatedStaff) {
            throw new ApiError(404, 'Staff member not found.');
        }

        // Step 3: Respond with success
        res.status(200).json(new ApiResponse(200, [], 'Expertise domains updated successfully.'));
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};

//TODO

const staffDashboard = asyncHandler(async (req, res) => {


    const data = {
        skillSubmitted: req.user.expertiseDomain.length > 0,
    }



    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    data
                },
                "User dashboard loaded Successfully"
            )
        )
});

export {
    check,
    reset,
    toVerifyAbstractList,
    updateAbstractReview,
    getAbstractDetail,
    donateAbstracts,
    setStaffExpertise,
    staffDashboard

}