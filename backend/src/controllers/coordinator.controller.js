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
    const abstracts = await Abstract.find({ status: 'pending' });
    console.log(abstracts)
    res.status(200).json({
        success: true,
        message: `your user id is ${req.user._id}`
    })
})

const submitAbstracts = asyncHandler(async (req, res) => {
    const AbstractData = req.body;

    // Validation: Ensure the request body is an array and not empty
    if (!Array.isArray(AbstractData) || AbstractData.length === 0) {
        throw new ApiError(400, "No abstracts submitted to insert");
    }

    try {
        const abstractToInsert = [];

        // Helper function for field validation
        const validateField = (field, fieldName) => {
            if (!field?.trim()) {
                throw new ApiError(400, `${fieldName} is required and cannot be empty`);
            }
        };

        for (let singleData of AbstractData) {
            const { title, abstract, domain, keywords } = singleData;

            // Validate required fields
            validateField(title, "Title");
            validateField(abstract, "Abstract");

            // Validate domain and keywords arrays
            if (Array.isArray(domain) && domain.length === 0) {
                throw new ApiError(400, "Domain cannot be empty");
            }
            if (Array.isArray(keywords) && keywords.length === 0) {
                throw new ApiError(400, "Keywords cannot be empty");
            }

            abstractToInsert.push({
                ownerId: req.user._id,
                title,
                abstract,
                domain,
                keywords,
                status: "completed"
                // matched: -1, // Default matched to -1 if not provided
            });
        }

        // Insert abstracts into database
        const insertedAbstract = await Abstract.insertMany(abstractToInsert, { ordered: true });

        if (insertedAbstract.length === 0) {
            throw new ApiError(400, "Proper abstracts format required");
        }

        // Get inserted abstract IDs
        // const ids = insertedAbstract.map(item => item._id.toString());

        // Update student with submitted abstracts
        // await Student.updateOne(
        //     { _id: req.student._id },
        //     { $push: { submittedAbstracts: { $each: ids } } }
        // );

        // Respond with success message
        return res.status(201).json(
            new ApiResponse(200, {}, "Abstract submitted successfully as a whole")
        );
    } catch (error) {
        // General error handler
        throw new ApiError(500, `Something went wrong while submitting the abstract - ${error.message}`);
    }
});

const assignAbstractsToStaffLogic = async () => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const abstracts = await Abstract.find({ status: 'pending' }).session(session);
        const staffMembers = await Staff.find({ employedInInstitution: true, availability: true }).session(session);

        if (staffMembers.length === 0) {
            throw new Error("No staff members found in the system.");
        }

        const totalAbstracts = abstracts.length;
        const totalStaff = staffMembers.length;
        const maxAbstractsPerStaff = Math.floor((totalAbstracts * 3) / totalStaff); // each abstract needs 3 staff

        // Track how many abstracts each staff has
        const staffAssignments = new Map();
        staffMembers.forEach(staff => staffAssignments.set(staff._id.toString(), []));

        // Abstract to staff assignment map
        const abstractAssignments = new Map(); // abstractId -> [staffIds]

        for (const abstract of abstracts) {
            const matchedStaff = [];
            const abstractDomains = abstract.domain.map(domain => domain.toLowerCase());

            // Step 1: Try to assign staff with matching domains
            for (const staff of staffMembers) {
                const staffIdStr = staff._id.toString();
                const assignedList = staffAssignments.get(staffIdStr);
                const expertiseDomains = staff.expertiseDomain.map(item => item.domain.toLowerCase());

                if (
                    assignedList.length < maxAbstractsPerStaff &&
                    matchedStaff.length < 3 &&
                    abstractDomains.some(domain => expertiseDomains.includes(domain)) &&
                    !matchedStaff.includes(staff._id.toString())
                ) {
                    matchedStaff.push(staff._id.toString());
                    assignedList.push(abstract._id);
                }

                if (matchedStaff.length === 3) break;
            }

            // Step 2: Fill remaining slots with random staff (if less than 3 assigned)
            if (matchedStaff.length < 3) {
                const needed = 3 - matchedStaff.length;
                const shuffledStaff = [...staffMembers].sort(() => 0.5 - Math.random());

                for (const staff of shuffledStaff) {
                    const staffIdStr = staff._id.toString();
                    const assignedList = staffAssignments.get(staffIdStr);

                    if (
                        assignedList.length < maxAbstractsPerStaff + 1 &&
                        !matchedStaff.includes(staffIdStr)
                    ) {
                        matchedStaff.push(staffIdStr);
                        assignedList.push(abstract._id);
                    }

                    if (matchedStaff.length === 3) break;
                }
            }

            if (matchedStaff.length === 3) {
                abstractAssignments.set(abstract._id.toString(), matchedStaff);
            } else {
                throw new Error(`Unable to assign 3 staff to abstract: ${abstract._id}`);
            }
        }

        // Update staff and abstract documents in DB
        for (const staff of staffMembers) {
            const assignedAbstracts = staffAssignments.get(staff._id.toString()) || [];

            const verificationAssigned = assignedAbstracts.map(abstractId => ({
                abstract: abstractId,
                status: 'pending'
            }));

            await Staff.findByIdAndUpdate(
                staff._id,
                { $set: { verificationAssigned } },
                { session }
            );
        }

        for (const [abstractId, staffIds] of abstractAssignments.entries()) {
            const assignedTo = staffIds.map(staffId => ({
                assignedStaff: staffId,
                decision: 'pending',
                comments: { old: [], new: [] }
            }));

            await Abstract.findByIdAndUpdate(
                abstractId,
                {
                    $set: { status: 'submitted' },
                    $push: { assignedTo: { $each: assignedTo } }
                },
                { session }
            );
        }

        await session.commitTransaction();
        console.log("Abstracts and staff records updated successfully within a transaction!");
    } catch (error) {
        await session.abortTransaction();
        console.error("Transaction aborted due to error:", error.message);
    } finally {
        session.endSession();
    }
};



const assignAbstractsToStaff = asyncHandler(async (req, res) => {
    await assignAbstractsToStaffLogic();
    return res.status(200).json(new ApiResponse(200, {}, "Abstracts assigned and statuses updated successfully!"));
});



export {
    check,
    submitAbstracts,
    assignAbstractsToStaff


}