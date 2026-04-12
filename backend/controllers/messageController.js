import openai from "../configs/openai.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import imagekit from "../configs/imagekit.js";

export const generateText = async (req, res) => {
  try {
    const { chatId, prompt } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.json({ success: false, message: "User not found" });
    if (user.credits < 1) {
      return res.json({ success: false, message: "Insufficient credits" });
    }

    // Find chat
    const chat = await Chat.findOne({ _id: chatId, userId: req.userId });
    if (!chat) return res.json({ success: false, message: "Chat not found" });

    // Push user message
    chat.messages.push({ role: "user", content: prompt, type: "text" });

    // Update title if first message
    if (
      chat.messages.length === 1 ||
      (chat.messages.length === 2 && chat.title === "New Chat")
    ) {
      chat.title = prompt.slice(0, 40);
    }

    // Build history mapping expected OpenAI { role, content } format
    const history = chat.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: history,
    });

    const responseText = completion.choices[0].message.content;

    // Push assistant response
    chat.messages.push({
      role: "assistant",
      content: responseText,
      type: "text",
    });

    // Save chat, deduct credit, save user
    await chat.save();

    user.credits -= 1;
    await user.save();

    return res.json({ success: true, response: responseText });
  } catch (error) {
    console.error("Error generating text:", error);
    return res.json({ success: false, message: error.message });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { chatId, prompt } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.json({ success: false, message: "User not found" });
    if (user.credits < 2)
      return res.json({ success: false, message: "Insufficient credits" });

    const chat = await Chat.findOne({ _id: chatId, userId: req.userId });
    if (!chat) return res.json({ success: false, message: "Chat not found" });

    // Pollinations.ai — free, no API key, no CSRF issues
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&seed=${Date.now()}`;

    // Upload to ImageKit for storage
    const uploadResult = await imagekit.upload({
      file: imageUrl,
      fileName: `ai-image-${Date.now()}.jpg`,
      folder: "/stokerai",
    });

    const finalUrl = uploadResult.url;

    chat.messages.push({ role: "user", content: prompt, type: "text" });
    chat.messages.push({ role: "assistant", content: finalUrl, type: "image" });

    if (chat.title === "New Chat") {
      chat.title = "Image: " + prompt.slice(0, 30);
    }

    await chat.save();
    user.credits -= 2;
    await user.save();

    return res.json({ success: true, imageUrl: finalUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    return res.json({ success: false, message: error.message });
  }
};
