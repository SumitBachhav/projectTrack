import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshTokenMiddleware } from "../middlewares/refreshToken.middleware.js";

import { 
    sendAccountInvitations,
    sendNewCredentials

} from '../controllers/email.controller.js'

const router = Router()

router.post('/send-invitations', sendAccountInvitations);
router.post('/sendNewCredentials', verifyJWT, refreshTokenMiddleware, sendNewCredentials);

export default router

