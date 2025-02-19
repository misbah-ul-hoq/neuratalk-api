import e from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
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
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send({ message: "User already exists" });
  }
  if (email in otpCache && otpCache[email] === otp) {
    const user = await new User({ name, email, password }).save();
    res.send({ message: "OTP verified", user });
  } else {
    res.status(400).send({ message: "Invalid OTP" });
  }
});

auth.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }
  if (user.password !== password) {
    return res.status(400).send({ message: "Incorrect email or password" });
  }
  user = await User.findOne({ email }).select("-password");

  res.send({
    message: "Login successful",
    user,
    authToken: jwt.sign(
      { _id: user?._id, email: user?.email },
      process.env.JWT_SECRET!
    ),
  });
});

auth.post("/me", async (req, res) => {
  const { authToken } = req.body;
  try {
    const decoded = jwt.verify(
      authToken,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: "Invalid token" });
  }
});

export default auth;
