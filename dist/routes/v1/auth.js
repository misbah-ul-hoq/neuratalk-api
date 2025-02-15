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
    console.log(req.body);
    if (email in otpCache && otpCache[email] === otp) {
        const user = yield new user_1.User({ name, email, password }).save();
        res.send({ message: "OTP verified", user });
    }
    else {
        res.status(400).send({ message: "Invalid OTP" });
    }
}));
exports.default = auth;
