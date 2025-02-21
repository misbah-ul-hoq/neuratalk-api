import mongoose, { Schema } from "mongoose";

const tempChatSchema = new Schema({
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  title: { type: String, required: true },
  timestamp: {
    type: String,
    default: `Time:${new Date().toLocaleTimeString()}, Date:${new Date()
      .toISOString()
      .slice(0, 10)}`,
  },
});

export const TempChat = mongoose.model("TempChat", tempChatSchema);
