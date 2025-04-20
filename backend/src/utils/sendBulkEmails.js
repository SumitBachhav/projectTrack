// utils/sendBulkEmails.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendBulkEmails = async (recipients, subject, getHtmlContent) => {
  const results = await Promise.allSettled(
    recipients.map(user => {
      const html = getHtmlContent(user); // user = { name, email, password }
      return transporter.sendMail({
        to: user.email,
        subject,
        html
      });
    })
  );

  const successList = [];
  const failureList = [];

  results.forEach((result, index) => {
    const user = recipients[index];
    if (result.status === 'fulfilled') {
      successList.push({ email: user.email, name: user.name });
    } else {
      failureList.push({
        email: user.email,
        name: user.name,
        error: result.reason?.message || "Unknown error"
      });
    }
  });

  return { successList, failureList };
};

export default sendBulkEmails;
