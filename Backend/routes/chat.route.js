import express from "express";
import verifyToken from "../middleware/jwt.js";
import {
  addFriend,
  createChat,
  getFriend,
  getUserChats,
} from "../controller/chat.controller.js";

const router = express.Router();

router.post("/", verifyToken, createChat);
router.post("/addFriend",verifyToken,addFriend)

router.get("/getChatAllRoom", verifyToken, getUserChats);
router.get("/getFriend", verifyToken, getFriend);

export default router;
