import express from 'express';
import {
  createChat,
  getChats,
  getChatMessages,
  deleteChat,
} from '../controllers/chatController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.get('/create', authMiddleware, createChat);
router.get('/get', authMiddleware, getChats);
router.get('/messages/:id', authMiddleware, getChatMessages);
router.post('/delete', authMiddleware, deleteChat);

export default router;
