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
exports.getResponseFromPrompt = getResponseFromPrompt;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
const devInfo_1 = require("./devInfo");
dotenv_1.default.config();
function getResponseFromPrompt(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const geminiApiKey = process.env.GEMINI_API_KEY;
            const genAI = new generative_ai_1.GoogleGenerativeAI(geminiApiKey);
            const fullPrompt = `${devInfo_1.devInfo} ${prompt}`;
            const neuraTalk = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const result = yield neuraTalk.generateContent(fullPrompt);
            const titleResult = yield neuraTalk.generateContent(`
    Your job is to create a title based on the follwoing question and answer:
    Question: ${prompt}
    Answer: ${result.response.text()}
    Just create a title based on the question and answer. Nothing else. Send the response in pure text. Do not use markdown.
    `);
            return {
                prompt,
                response: result.response.text(),
                title: titleResult.response.text(),
            };
        }
        catch (error) {
            console.log(error);
            return {
                prompt,
                response: "Something went wrong",
                title: "Something went wrong",
            };
        }
    });
}
function generateTitle(prompt, response, geminiApiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const genAI = new generative_ai_1.GoogleGenerativeAI(geminiApiKey);
        const neuraTalk = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = yield neuraTalk.generateContent(`
    Your job is to create a title based on the follwoing question and answer:
    Question: ${prompt}
    Answer: ${response}
    Just create a title based on the question and answer. Nothing else. Send the response in pure text. Do not use markdown.
    `);
        const title = result.response.text();
        return title;
    });
}
