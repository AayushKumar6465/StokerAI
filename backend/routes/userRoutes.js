import express from 'express';
import {
  register,
  login,
  getUserData,
  getPublishedImages,
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/published-images', getPublishedImages);

// Protected routes
router.get('/data', authMiddleware, getUserData);

export default router;
