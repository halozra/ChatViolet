import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, IdChatRoom } = req.body;
    const sender = req.user.id;

    // Cek apakah chat room-nya ada
    const chatExists = await Chat.findById(IdChatRoom);
    if (!chatExists) {
      return res.status(404).json({ message: "Chat room not found" });
    }

    // Simpan pesan ke DB
    const newMessage = new Message({
      IdChatRoom,
      sender,
      content,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending message", error: error.message });
  }
};
