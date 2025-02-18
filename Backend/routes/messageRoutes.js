import express from "express";
import { sendMessage, getMessages } from "../controller/messageController.js";

import verifyToken from "../middleware/jwt.js";

const router = express.Router();

// 🔹 Kirim pesan dalam chat
router.post("/", verifyToken, sendMessage);

// 🔹 Ambil semua pesan dari chat tertentu
router.get("/:chatId", verifyToken, getMessages);

export default router;
