import express from "express";
import { sendMessage } from "../controller/message.controller.js";

import verifyToken from "../middleware/jwt.js";

const router = express.Router();

// 🔹 Kirim pesan dalam chat
router.post("/", verifyToken, sendMessage);

export default router;
