import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    IdChatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: String, // ID User pengirim (pakai String biar sama kayak Chat model-mu)
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
