import Message from "../models/message.js";

/**
 * 🔹 SEND MESSAGE
 * Endpoint ini digunakan untuk mengirim pesan ke dalam sebuah chat tertentu.
 */
export const sendMessage = async (req, res) => {
  try {
    const { idChatRoom, text } = req.body; // ID chat dan isi pesan dari body request
    const senderId = req.user.id; // ID pengirim pesan (didapat dari token JWT)
    // ✅ Buat pesan baru yang akan disimpan
    const newMessage = new Message({
      idChatRoom, // ID chat tempat pesan ini dikirim
      sender: senderId, // ID pengirim
      text, // Isi pesan
    });

    // ✅ Simpan pesan baru ke database
    const savedMessage = await newMessage.save();

    // ✅ Kirim response pesan yang berhasil disimpan
    res.status(201).json(savedMessage);
  } catch (error) {
    // ❌ Jika ada error saat mengirim pesan
    res.status(500).json({
      message: "Error sending message",
      error: error.message,
    });
  }
};

/**
 * 🔹 GET MESSAGES
 * Endpoint ini digunakan untuk mengambil semua pesan dari satu chat (berdasarkan idchatRoom).
 */
export const getMessages = async (req, res) => {
  try {
    const { idchatRoom } = req.params; // Ambil idchatRoom dari parameter URL

    // ✅ Ambil semua pesan yang terkait dengan idchatRoom tersebut dan urutkan dari yang paling lama ke yang terbaru
    const messages = await Message.find({ idchatRoom }).sort({ createdAt: 1 });

    // ✅ Kirim semua pesan sebagai response
    res.status(200).json(messages);
  } catch (error) {
    // ❌ Jika terjadi error saat mengambil pesan
    res.status(500).json({
      message: "Error fetching messages",
      error: error.message,
    });
  }
};
