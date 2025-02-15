import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTP = async (email: string) => {
  const otp = generateOTP();
  transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "OTP",
    html: `

    <body style="font-family: Arial, sans-serif;">
            <div style="background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); text-align: center; max-width: 350px; width: 100%;">
            <h2 style="color: #333;">Your OTP Code</h2>
            <p style="color: #666;">Use the OTP below to complete your verification process.</p>
            <h1 style="background: #4facfe; color: #fff; padding: 10px; border-radius: 5px; display: inline-block;">${otp}</h1>
            <p style="margin-top: 10px; font-size: 14px; color: #666;">If you did not request this code, please ignore this email.</p>
            <p style="margin-top: 20px; font-size: 16px; font-weight: bold; color: #333;">NeuraTalk Inc.</p>
        </div>
    </body>

    `,
  });
  return { email: email, otp };
};

function generateOTP() {
  // Generate a random number between 100000 and 999999 (inclusive)
  const min = 100000;
  const max = 999999;
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;

  return otp.toString(); // Convert to string}
}
