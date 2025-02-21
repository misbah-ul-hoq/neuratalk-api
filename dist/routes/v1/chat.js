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
const chat_1 = require("../../models/chat");
const auth_1 = require("../../middlewares/auth");
const getResponseFromPrompt_1 = require("../../utils/getResponseFromPrompt");
const tempchat_1 = require("../../models/tempchat");
dotenv_1.default.config();
const chat = express_1.default.Router();
chat.post("/temp-chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    console.log(prompt);
    const response = yield (0, getResponseFromPrompt_1.getResponseFromPrompt)(prompt);
    const tempChat = yield new tempchat_1.TempChat(response).save();
    res.send(response);
}));
chat.post("/", auth_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, title, prompt, response } = req.body;
    const chat = yield new chat_1.Chat({
        user,
        title,
        chats: { title, chat: [{ prompt, response }] },
    }).save();
    res.send(chat);
}));
exports.default = chat;
