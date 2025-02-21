import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { devInfo } from "./devInfo";
dotenv.config();

export async function getResponseFromPrompt(prompt: string) {
  try {
    const geminiApiKey = process.env.GEMINI_API_KEY!;
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const fullPrompt = `${devInfo} ${prompt}`;
    const neuraTalk = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await neuraTalk.generateContent(fullPrompt);
    const titleResult = await neuraTalk.generateContent(`
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
  } catch (error) {
    console.log(error);
    return {
      prompt,
      response: "Something went wrong",
      title: "Something went wrong",
    };
  }
}

async function generateTitle(
  prompt: string,
  response: string,
  geminiApiKey: string
) {
  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const neuraTalk = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await neuraTalk.generateContent(`
    Your job is to create a title based on the follwoing question and answer:
    Question: ${prompt}
    Answer: ${response}
    Just create a title based on the question and answer. Nothing else. Send the response in pure text. Do not use markdown.
    `);

  const title = result.response.text();
  return title;
}
