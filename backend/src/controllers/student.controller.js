import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { Skill } from "../models/skill.model.js"
import { Student } from "../models/student.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const submitSkills = asyncHandler(async (req, res) => {
    const skillsData = req.body;

    try {
        // Prepare an array for the skills to be inserted
        const skillsToInsert = [];
        const existingDomains = new Set();

        // Check the skills data and prepare the insert array
        for (let singelData of skillsData) {
            const { domain, skills, experience } = singelData;

            if ([domain, skills].some((field) => field?.trim() === "")) {
                throw new ApiError(400, "All fields are required");
            }

            // Check if the domain already exists for the user
            if (existingDomains.has(domain)) {
                continue;  // Skip this entry if domain already exists
            }
            existingDomains.add(domain);

            // Push valid skill data to the insert array
            skillsToInsert.push({
                ownerId: req.user._id,
                domain,
                skills,
                experience: experience || 0,
            });
        }

        // Insert the skills in bulk
        const insertedSkills = await Skill.insertMany(skillsToInsert, { ordered: true });

        // Return success response if insert was successful
        return res.status(201).json(
            new ApiResponse(200, {}, "Skills registered successfully")
        );
    } catch (error) {
        throw new ApiError(500, `Something went wrong while submitting the skill - ${error.message}`);
    }
});



export {
    submitSkills,
}


/*
const submitNewSkill = asyncHandler(async (req, res) => {
    const skillsData = req.body; // Array of skill data
    const userId = req.user._id; // Assuming userId is in the request user object
    const skillsToInsert = []; // Array to collect all the skills that will be inserted
    const existingSkills = await Skill.find({ ownerId: userId }); // Fetch existing skills for the user

    try {
        // Loop over all skillsData and validate
        for (const singleData of skillsData) {
            const { domain, skills, experience } = singleData;

            // Check if domain or skills are empty or contain only spaces
            if ([domain, skills].some((field) => field?.trim() === "")) {
                throw new ApiError(400, "All fields are required");
            }

            // Check if the domain already exists for the user
            const isDomainExists = existingSkills.some((skill) => skill.domain === domain);

            if (isDomainExists) {
                // If the domain already exists for the user, throw an error or skip this entry
                throw new ApiError(400, `The domain '${domain}' already exists for this user`);
            }

            // Prepare the skill document to be inserted
            skillsToInsert.push({
                ownerId: userId,
                domain,
                skills,
                experience,
            });
        }

        // Insert all the skills data at once using insertMany
        if (skillsToInsert.length > 0) {
            const result = await Skill.insertMany(skillsToInsert); // Insert all skills at once
            if (result.length === 0) {
                throw new ApiError(500, "Something went wrong while saving the skills");
            }
        }

        // Return success response
        return res.status(201).json(
            new ApiResponse(200, {}, "Skills registered successfully")
        );
    } catch (error) {
        // Handle any errors that occurred during processing
        throw new ApiError(500, `Something went wrong while submitting the skill - ${error.message}`);
    }
});






const faker = require('faker');

// Function to generate fake skill data
const generateFakeSkills = (num = 10) => {
    const fakeSkills = [];

    for (let i = 0; i < num; i++) {
        const domain = faker.name.jobArea();  // Fake domain, e.g., "Software Development"
        const skills = faker.lorem.words(faker.random.number({ min: 1, max: 3 }));  // Random skills (1-3 words)
        const experience = faker.random.number({ min: 1, max: 10 });  // Random experience (1-10 years)

        fakeSkills.push({
            domain,
            skills,
            experience
        });
    }

    return fakeSkills;
};

// Generate 10 fake skill data entries
const fakeSkillData = generateFakeSkills(10);

console.log(fakeSkillData);


*/