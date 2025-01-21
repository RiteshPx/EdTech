// email/emailTemplate.js
const emailTemplate = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd;">
      <h2 style="color: #333;">Your OTP Code</h2>
      <p style="font-size: 16px; color: #555;">Use the following OTP to complete your action:</p>
      <p style="font-size: 24px; font-weight: bold; color: #000; margin: 10px 0;">${otp}</p>
      <p style="font-size: 14px; color: #888;">This OTP is valid for 5 minutes. Do not share it with anyone.</p>
    </div>
  `;
};

module.exports = emailTemplate;
