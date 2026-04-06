import express from "express";
import {
  generateText,
  generateImage,
} from "../controllers/messageController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/text", authMiddleware, generateText);
router.post("/image", authMiddleware, generateImage);

export default router;
