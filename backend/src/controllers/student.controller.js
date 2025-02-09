import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { Skill } from "../models/skill.model.js"
import { Abstract } from "../models/abstract.model.js";
import { Student } from "../models/student.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const check = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: `your user id is ${req.student.userID}`
    })
})

const reset = asyncHandler(async (req, res) => {

    await Student.updateOne({ _id: req.student._id }, {
        $set: {
            // skills: [],
            submittedAbstracts: [],
            // certificates: [],
            // github: "",
            // groupId: "",
            // acceptedByStaffAbstracts: [],
            // finalizedAbstract: "",
            // donatedAbstracts: [],
            // invites: { sent: [], received: [] },
            // requests: { sent: [], received: [] },
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


const submitSkills = asyncHandler(async (req, res) => {
    const skillsData = req.body;

    try {
        const skillsToInsert = [];
        const existingDomains = new Set();

        for (let singleData of skillsData) {
            const { domain, skills, experience } = singleData;

            // Check if domain or skills are missing or empty
            if (!domain.trim() || !Array.isArray(skills) || skills.length === 0) {
                throw new ApiError(400, "All fields are required and at least one skill must be selected");
            }

            // Avoid duplicate domains
            if (existingDomains.has(domain)) {
                continue;
            }
            existingDomains.add(domain);

            // Add valid skill data to the insert array
            skillsToInsert.push({
                ownerId: req.user._id,
                domain,
                skills,
                experience: experience || 0,
            });
        }

        // Insert skills in bulk if there are valid entries
        if (skillsToInsert.length === 0) {
            throw new ApiError(400, "No valid skill sets to insert");
        }

        const insertedSkills = await Skill.insertMany(skillsToInsert, { ordered: true });

        const skillIds = insertedSkills.map(skill => skill._id);
        await Student.findByIdAndUpdate(req.user._id, {
            $addToSet: { skills: { $each: skillIds } }
        });

        return res.status(201).json(
            new ApiResponse(200, {}, "Skills registered successfully")
        );
    } catch (error) {
        throw new ApiError(500, `Something went wrong while submitting the skill - ${error.message}`);
    }
});

// TODO : update student with submitted skills


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
            const { title, abstract, domain, keywords, matched } = singleData;

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
                ownerId: req.student._id,
                title,
                abstract,
                domain,
                keywords,
                matched: matched || -1, // Default matched to -1 if not provided
            });
        }

        // Insert abstracts into database
        const insertedAbstract = await Abstract.insertMany(abstractToInsert, { ordered: true });

        if (insertedAbstract.length === 0) {
            throw new ApiError(400, "Proper abstracts format required");
        }

        // Get inserted abstract IDs
        const ids = insertedAbstract.map(item => item._id.toString());

        // Update student with submitted abstracts
        await Student.updateOne(
            { _id: req.student._id },
            { $push: { submittedAbstracts: { $each: ids } } }
        );

        // Respond with success message
        return res.status(201).json(
            new ApiResponse(200, {}, "Abstract submitted successfully as a whole")
        );
    } catch (error) {
        // General error handler
        throw new ApiError(500, `Something went wrong while submitting the abstract - ${error.message}`);
    }
});

const studentDashboard = asyncHandler(async (req, res) => {


    const data = {
        skillSubmitted: req.user.skills.length > 0,
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
    submitSkills,
    submitAbstracts,
    studentDashboard
}