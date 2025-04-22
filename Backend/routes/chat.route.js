import express from 'express'
import verifyToken from '../middleware/jwt.js'
import {
  addFriend,
  createChat,
  searchFriend,
  ListFriend,
  getUserChats,
} from '../controller/chat.controller.js'

const router = express.Router()

router.post('/create', verifyToken, createChat)
router.post('/addFriend', verifyToken, addFriend)

router.get('/getChatAllRoom', verifyToken, getUserChats)
router.get('/search', verifyToken, searchFriend)
router.get('/listFriend', verifyToken, ListFriend)

export default router
