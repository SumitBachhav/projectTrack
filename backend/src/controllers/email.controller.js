// controllers/emailController.js
import sendBulkEmails from '../utils/sendBulkEmails.js';
import sendSingleEmail from '../utils/SendSingleEmail.js';
import accountCreatedTemplate from '../templates/accountCreatedTemplate.js';
import passwordResetTemplate from '../templates/passwordResetTemplate.js';
import {User} from '../models/user.model.js';
import mongoose from "mongoose";


const sendAccountInvitations = async (req, res) => {
  const { users } = req.body;

  if (!users || !Array.isArray(users)) {
    return res.status(400).json({ success: false, message: 'Invalid user list' });
  }

  try {
    const subject = "Invitation to Participate in Probit – Project Management Platform";
    const { successList, failureList } = await sendBulkEmails(users, subject, accountCreatedTemplate);

    res.status(200).json({
      success: true,
      message: "Emails processed",
      sent: successList,
      failed: failureList
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const sendNewCredentials = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(req.mainId).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const newPassword = 741852;

    // Update password
    user.password = newPassword;
    await user.save({ validateBeforeSave: false, session });

    const tempUser = {
      name: user.name,
      email: user.email,
      password: newPassword
    };

    const subject = "Reset Password";
    const emailResult = await sendSingleEmail(tempUser, subject, passwordResetTemplate);

    // Commit transaction only if email is sent successfully
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, result: emailResult });
  } catch (error) {
    // Rollback password update
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: error.message });
  }
};



export { 
  sendAccountInvitations,
  sendNewCredentials

};