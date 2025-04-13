import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    idChatRoom: {
      type: String,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, default: "" },
    media: { type: String, default: "" },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
