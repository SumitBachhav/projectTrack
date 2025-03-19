// middlewares/auth.middleware.js (or whatever you name the file)

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { findUser } from "../utils/FindUser.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        if (!process.env.ACCESS_TOKEN_SECRET) {
            console.error("ACCESS_TOKEN_SECRET is not defined");
            throw new ApiError(500, "Internal server error: ACCESS_TOKEN_SECRET not configured");
        }

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            console.warn("No access token found in request");
            throw new ApiError(401, "Unauthorized request: Missing access token");
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (jwtError) {
            if (jwtError.name === "TokenExpiredError") {
                req.isAccessTokenExpired = true;
                console.log("Access token expired");
                return next(); // Let next middleware handle refresh
            } else {
                console.error("JWT verification failed:", jwtError.message);
                throw new ApiError(401, "Invalid access token: " + jwtError.message);
            }
        }

        const user = await findUser(decodedToken?._id);

        if (!user) {
            console.warn("User not found for decoded token:", decodedToken?._id);
            throw new ApiError(401, "Invalid access token: User not found");
        }

        req.user = user;
        req.mainId = decodedToken?._id;

        console.log("JWT verification successful for user:", user._id);
        next();

    } catch (error) {
        console.error("JWT verification middleware error:", error.message);
        throw new ApiError(error.statusCode || 500, error.message || "Internal server error");
    }
});

// Example route using the middleware (you can put this in a separate route file)
// routes/example.route.js

import express from 'express';

const router = express.Router();

router.get('/protected', verifyJWT, (req, res) => {
    res.send('This route is protected!');
});

export default router;