import Chat from "../models/chat.js";

export const createChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const loggedInUserId = req.user.id;
    const existChat = await Chat.findOne({
      members: { $all: [loggedInUserId, userId] },
    });

    if (existChat) {
      return res.status(200).json(existChat);
    }

    const newChat = new Chat({
      members: [loggedInUserId, userId],
    });

    const savedChat = await newChat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating chat", error: error.message });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const chats = await Chat.find({ members: loggedInUserId });
    res.status(200).json(chats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching chats", error: error.message });
  }
};

export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    };
    res.status(200).json(chat);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching chat", error: error.message });
  };
};
