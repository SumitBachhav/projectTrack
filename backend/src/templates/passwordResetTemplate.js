const passwordResetTemplate = ({ name, email, password }) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: auto;">
    <p>Dear <strong>${name}</strong>,</p>

    <p>
      Your password for the <strong>Probit</strong> platform has been successfully reset.
    </p>

    <p>
      Below are your updated login details. Please keep this information secure:
    </p>

    <ul>
      <li><strong>Email ID:</strong> ${email}</li>
      <li><strong>New Password:</strong> ${password}</li>
    </ul>

    <p>
      You can now log in using the updated credentials by visiting the link below:
      <br />
      <a href="https://main.dnfwop90kvj3i.amplifyapp.com" style="color: #1a73e8;">Login to Probit</a>
    </p>

    <p>
      For your security, we recommend changing your password after logging in.
    </p>

    <p>
      If you did not request this change or believe this was done in error, please contact the support team immediately.
    </p>

    <hr style="border: none; border-top: 1px solid #ccc;" />

    <p style="font-size: 0.9em; color: #555;">
      This email was sent to you by the Probit Development Team, Department of Engineering, MET College.<br />
      For assistance, contact us at <a href="mailto:probit247@gmail.com" style="color: #1a73e8;">probit247@gmail.com</a><br />
      MET College, Engineering Block, Nashik – 422003
    </p>

    <p style="font-size: 0.8em; color: #888;">
      If you did not request a password reset or no longer wish to receive emails from Probit, please reply with "Unsubscribe" in the subject line.
    </p>
  </div>
`;

export default passwordResetTemplate;
