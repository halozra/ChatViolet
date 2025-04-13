import express from "express";
import verifyToken from "../middleware/jwt.js";
import { createChat, getUserChats } from "../controller/chat.controller.js";

const router = express.Router();

router.post("/", verifyToken, createChat);

router.get("/getChatAllRoom", verifyToken, getUserChats);

export default router;
