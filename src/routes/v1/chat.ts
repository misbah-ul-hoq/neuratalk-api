import e from "express";
import dotenv from "dotenv";
import { Chat } from "../../models/chat";
import { verifyUser } from "../../middlewares/auth";
import { getResponseFromPrompt } from "../../utils/getResponseFromPrompt";
import { TempChat } from "../../models/tempchat";
dotenv.config();

const chat = e.Router();

chat.post("/temp-chat", async (req, res) => {
  const { prompt } = req.body;
  const response = await getResponseFromPrompt(prompt);
  const tempChat = await new TempChat(response).save();
  res.send(response);
});

chat.post("/", verifyUser, async (req, res) => {
  const { user, prompt } = req.body;
  const { title, response } = await getResponseFromPrompt(prompt);
  const chat = await new Chat({
    user,
    title,
    chats: { title, chats: [{ prompt, response }] },
  }).save();
  res.send(chat);
});

export default chat;
