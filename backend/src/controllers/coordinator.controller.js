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

const tempAssignStudent = asyncHandler(async (req, res) => {

    const staff = await Staff.findOne({ _id: "req.staff._id" });

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
    tempAssignStudent,
    submitAbstracts


}