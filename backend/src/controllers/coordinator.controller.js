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
    try {
        // Step 1: Fetch all abstracts and staff members
        const abstracts = await Abstract.find({ status: 'pending' });
        const staffMembers = await Staff.find();

        if (staffMembers.length === 0) {
            throw new Error("No staff members found in the system.");
        }

        const totalAbstracts = abstracts.length;
        const totalStaff = staffMembers.length;
        const maxAbstractsPerStaff = Math.floor(totalAbstracts / totalStaff);

        const staffAssignments = new Map(); // Track assigned abstracts for each staff
        staffMembers.forEach(staff => staffAssignments.set(staff._id.toString(), []));

        const assignedAbstracts = new Set(); // Track abstracts that get assigned
        const unassignedAbstracts = [];

        // Step 2: Assign abstracts based on domain expertise with a limit
        abstracts.forEach(abstract => {
            let assigned = false;

            for (const staff of staffMembers) {
                const assignedList = staffAssignments.get(staff._id.toString());

                if (assignedList.length >= maxAbstractsPerStaff) {
                    continue; // Skip staff who already reached the limit
                }

                const expertiseDomains = staff.expertiseDomain.map(item => item.domain.toLowerCase());
                const abstractDomains = abstract.domain.map(domain => domain.toLowerCase());

                const hasMatchingDomain = abstractDomains.some(domain => expertiseDomains.includes(domain));

                if (hasMatchingDomain) {
                    assignedList.push(abstract._id);
                    assignedAbstracts.add(abstract._id);
                    assigned = true;
                    break; // Stop after assigning to the first matching staff
                }
            }

            if (!assigned) {
                unassignedAbstracts.push(abstract._id);
            }
        });

        // Step 3: Randomly distribute unassigned abstracts
        let staffIndex = 0;
        while (unassignedAbstracts.length > 0) {
            const staff = staffMembers[staffIndex];
            const assignedList = staffAssignments.get(staff._id.toString());

            // Ensure no staff exceeds the limit by more than one (for uneven distribution)
            if (assignedList.length < maxAbstractsPerStaff + 1) {
                const abstractId = unassignedAbstracts.pop();
                assignedList.push(abstractId);
                assignedAbstracts.add(abstractId);
            }

            staffIndex = (staffIndex + 1) % totalStaff;
        }

        // Step 4: Update staff records with assigned abstracts
        const staffUpdatePromises = staffMembers.map(staff => {
            const assignedList = staffAssignments.get(staff._id.toString());
            return Staff.findByIdAndUpdate(staff._id, {
                $set: { verificationAssigned: assignedList }
            });
        });

        // Step 5: Update abstract statuses to 'submitted'
        const abstractUpdatePromises = Array.from(assignedAbstracts).map(abstractId => 
            Abstract.findByIdAndUpdate(abstractId, { $set: { status: 'submitted' } })
        );

        await Promise.all([...staffUpdatePromises, ...abstractUpdatePromises]);

        console.log('Abstracts assigned and statuses updated successfully!');
    } catch (error) {
        console.error('Error assigning abstracts:', error.message);
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