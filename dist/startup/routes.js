"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../routes/v1/auth"));
const chat_1 = __importDefault(require("../routes/v1/chat"));
const routes = (app) => {
    app.use("/api/v1/auth", auth_1.default);
    app.use("/api/v1/chat", chat_1.default);
};
exports.default = routes;
