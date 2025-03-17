import mongoose, { Schema } from "mongoose";

const tempChatSchema = new Schema(
  {
    user: {
      type: new Schema(
        {
          email: { type: String, required: true },
          image: { type: String, required: false },
          name: { type: String, required: true },
        },
        { _id: false }
      ),
      required: false,
    },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

export const TempChat = mongoose.model("TempChat", tempChatSchema);
