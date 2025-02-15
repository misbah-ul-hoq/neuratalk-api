import e from "express";

import { sendOTP } from "../../services/mailer";

const auth = e.Router();

interface otpCache {
  [key: string]: string;
}
const otpCache: otpCache = {};
auth.post("/signup", async (req, res) => {
  const { email, otpFromClient } = req.body;
  const { email: cacheEmail, otp } = await sendOTP(email);
  otpCache[cacheEmail] = otp;
  if (otpFromClient && otpFromClient !== otp) {
    res.status(400).send({ message: "Invalid OTP" });
  } else if (
    email in otpCache &&
    otpFromClient &&
    otpCache[email] === otpFromClient
  ) {
    res.send({ message: "SignUp successfull" });
  } else {
    res.send({ message: "OTP sent. Please check your email" });
  }
});

export default auth;
