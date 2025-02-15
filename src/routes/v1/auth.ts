import e from "express";

import { sendOTP } from "../../services/mailer";
import { User } from "../../models/user";

const auth = e.Router();

interface otpCache {
  [key: string]: string;
}
const otpCache: otpCache = {};
auth.post("/signup", async (req, res) => {
  const { email } = req.body;
  const { email: cacheEmail, otp } = await sendOTP(email);
  otpCache[cacheEmail] = otp;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send({ message: "User already exists" });
  }
  res.send({ message: "OTP sent. Please check your email" });
});

auth.post("/verify-otp", async (req, res) => {
  const { name, email, password, otp } = req.body;
  console.log(req.body);
  if (email in otpCache && otpCache[email] === otp) {
    const user = await new User({ name, email, password }).save();
    res.send({ message: "OTP verified", user });
  } else {
    res.status(400).send({ message: "Invalid OTP" });
  }
});

export default auth;
