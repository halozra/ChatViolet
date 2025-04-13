import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

/**
 * 🔹 CREATE OR GET CHAT
 * Endpoint untuk membuat atau mengambil chat antara dua user.
 */
export const createChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const loggedInUserId = req.user.id;

    // Pastikan dua user ini bisa menjadi peserta di chat room yang sama
    const participants = [loggedInUserId, userId].sort(); // urutkan untuk konsistensi

    // Cari apakah chat room untuk dua user ini sudah ada
    let chat = await Chat.findOne({ participants });

    // Jika chat room belum ada, buat chat room baru
    if (!chat) {
      chat = new Chat({ participants });
      await chat.save();
    }

    res.status(200).json(chat); // Kirim chat room ke user
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
    const loggedInUserId = req.user.id;

    // Cari semua chat room yang melibatkan user yang sedang login
    const chats = await Chat.find({
      participants: loggedInUserId,
    });

    // Ambil pesan berdasarkan IdChatRoom dari chat yang ditemukan
    const chatsWithMessages = await Promise.all(
      chats.map(async (chat) => {
        const messages = await Message.find({ IdChatRoom: chat._id });
        return {
          ...chat.toObject(),
          messages,
        };
      })
    );

    res.status(200).json(chatsWithMessages); // Kirimkan hasilnya
  } catch (error) {
    res.status(500).json({
      message: "❌ Error fetching chats",
      error: error.message,
    });
  }
};
