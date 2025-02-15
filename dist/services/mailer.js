"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});
const sendOTP = (email) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.sendOTP = sendOTP;
function generateOTP() {
    // Generate a random number between 100000 and 999999 (inclusive)
    const min = 100000;
    const max = 999999;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
    return otp.toString(); // Convert to string}
}
