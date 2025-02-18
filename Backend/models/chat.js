import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const chatSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      default: uuidv4,
      required: true, 
    },
    participants: [{ type: String, ref: "User" }],  // Ganti ObjectId dengan String
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }], // Pesan masih menggunakan ObjectId, karena mengacu ke Message yang memakai _id
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
