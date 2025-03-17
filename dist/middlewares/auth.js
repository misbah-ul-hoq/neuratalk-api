"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyUser = (req, res, next) => {
    const token = req.headers.authtoken;
    console.log(token);
    console.log(req.headers);
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // req.user = decoded;
        return next();
    }
    catch (error) {
        return res.status(401).send({ message: "Unauthorized" });
    }
};
exports.verifyUser = verifyUser;
