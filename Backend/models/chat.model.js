import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const chatSchema = new mongoose.Schema(
  {
    participants: [{ type: String, ref: "User", required: true }],
    messages: [messageSchema],
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
