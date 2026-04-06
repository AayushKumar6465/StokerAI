import Chat from "../models/Chat.js";

export const createChat = async (req, res) => {
  try {
    const chat = await Chat.create({
      userId: req.userId,
      title: "New Chat",
    });

    return res.json({ success: true, chat });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.userId }).sort({
      updatedAt: -1,
    });

    return res.json({ success: true, chats });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.userId });

    if (!chat) {
      return res.json({ success: false, message: "Chat not found" });
    }

    return res.json({ success: true, messages: chat.messages });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.body;

    if (!chatId) {
      return res.json({ success: false, message: "Chat ID is required" });
    }

    const chat = await Chat.findOneAndDelete({
      _id: chatId,
      userId: req.userId,
    });

    if (!chat) {
      return res.json({
        success: false,
        message: "Chat not found or unauthorized",
      });
    }

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
