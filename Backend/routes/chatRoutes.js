import express from "express";
import verifyToken from "../middleware/jwt.js";
import {
  createChat,
  getUserChats,
  getChatById,
} from "../controller/chatController.js";

const router = express.Router();

router.post("/", verifyToken, createChat);

router.get("/getChatAllRoom", verifyToken, getUserChats);

router.get("/getChatById", verifyToken, getChatById);

export default router;
