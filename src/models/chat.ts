import mongoose, { Document, Schema } from "mongoose";

export interface IChat extends Document {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: number;
}

const chatSchema: Schema = new Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Number, default: Date.now },
});

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
