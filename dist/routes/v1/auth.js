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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = require("../../services/mailer");
const user_1 = require("../../models/user");
const auth = express_1.default.Router();
const otpCache = {};
auth.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { email: cacheEmail, otp } = yield (0, mailer_1.sendOTP)(email);
    otpCache[cacheEmail] = otp;
    const userExists = yield user_1.User.findOne({ email });
    if (userExists) {
        return res.status(400).send({ message: "User already exists" });
    }
    res.send({ message: "OTP sent. Please check your email" });
}));
auth.post("/verify-otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, otp } = req.body;
    const userExists = yield user_1.User.findOne({ email });
    if (userExists) {
        return res.status(400).send({ message: "User already exists" });
    }
    if (email in otpCache && otpCache[email] === otp) {
        const user = yield new user_1.User({ name, email, password }).save();
        res.send({ message: "OTP verified", user });
    }
    else {
        res.status(400).send({ message: "Invalid OTP" });
    }
}));
auth.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let user = yield user_1.User.findOne({ email });
    if (!user) {
        return res.status(400).send({ message: "User not found" });
    }
    if (user.password !== password) {
        return res.status(400).send({ message: "Incorrect email or password" });
    }
    user = yield user_1.User.findOne({ email }).select("-password");
    res.send({
        message: "Login successful",
        user,
        authToken: jsonwebtoken_1.default.sign({ _id: user === null || user === void 0 ? void 0 : user._id, email: user === null || user === void 0 ? void 0 : user.email }, process.env.JWT_SECRET),
    });
}));
auth.post("/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authToken } = req.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET);
        const user = yield user_1.User.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }
        res.send(user);
    }
    catch (error) {
        res.status(400).send({ message: "Invalid token" });
    }
}));
exports.default = auth;
