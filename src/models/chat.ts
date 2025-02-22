import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
export interface IChat extends Document {
  user: string;
  timestamp: number;
  chats: {
    _id: mongoose.ObjectId;
    title: string;
    chat: { _id: mongoose.ObjectId; prompt: string; response: string }[];
  };
}

const chatSchema = new Schema({
  user: { type: String, required: true },
  timestamp: { type: Number, default: Date.now },
  chats: {
    _id: { type: String, default: uuidv4() },
    title: String,
    chats: [
      {
        _id: { type: String, default: uuidv4() },
        prompt: String,
        response: String,
      },
    ],
  },
});

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
