import Chat from "../models/chat.js";

/**
 * 🔹 CREATE CHAT
 * Endpoint untuk membuat chat antara dua user.
 * Jika chat sudah ada, langsung kirim chat yang sudah ada (tidak buat duplikat).
 */
export const createChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const loggedInUserId = req.user.id;

    const participants = [loggedInUserId, userId].sort(); // konsisten urutan

    let chat = await Chat.findOne({ participants });

    if (!chat) {
      chat = new Chat({ participants });
      await chat.save();
    }

    res.status(200).json(chat);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating chat", error: error.message });
  }
};

/**
 * 🔹 GET USER CHATS
 * Endpoint untuk mengambil semua chat milik user yang sedang login.
 */
export const getUserChats = async (req, res) => {
  try {
    const loggedInUserId = req.user.id; // ID user yang login

    // Cari semua chat yang berisi user tersebut sebagai member
    const chats = await Chat.find({ members: loggedInUserId });

    // Kirim semua chat tersebut sebagai response
    res.status(200).json(chats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching chats", error: error.message });
  }
};

/**
 * 🔹 GET CHAT BY ID
 * Endpoint untuk mengambil satu chat berdasarkan ID-nya
 */
export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.idchatRoom); // Ambil chat berdasarkan ID dari parameter URL

    // Kalau chat tidak ditemukan
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Kirim chat yang ditemukan
    res.status(200).json(chat);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching chat", error: error.message });
  }
};
