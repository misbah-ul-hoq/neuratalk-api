import e from "express";
import dotenv from "dotenv";
import { Chat } from "../../models/chat";
import { verifyUser } from "../../middlewares/auth";
dotenv.config();

const chat = e.Router();

chat.post("/", verifyUser, async (req, res) => {
  const { user, title, prompt, response } = req.body;
  const chat = await new Chat({
    user,
    title,
    chats: { title, chat: [{ prompt, response }] },
  }).save();
  res.send(chat);
});

export default chat;
