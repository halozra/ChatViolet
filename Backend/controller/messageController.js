import Message from "../models/message.js";
import Chat from "../models/chat.js";

export const sendMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const senderId = req.user.id;

    // 🔹 Perbaiki query pencarian chat
    const chat = await Chat.findOne({ chatId }); 
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const newMessage = new Message({
      chatId,
      sender: senderId, // 🔹 "senderId" harus sesuai dengan field di schema
      text,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error: error.message });
  }
};
