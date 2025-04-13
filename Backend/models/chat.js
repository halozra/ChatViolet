import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const chatSchema = new mongoose.Schema(
  {
    IdChatRoom: {
      type: String,
      default: uuidv4,
      required: true,
    },
    participants: [{ type: String, ref: "User" }], // Ganti ObjectId dengan String
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
