import openai from "../configs/openai.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const generateText = async (req, res) => {
  try {
    const { chatId, prompt } = req.body;

    // 1. Find user & check credits
    const user = await User.findById(req.userId);
    if (!user) return res.json({ success: false, message: "User not found" });
    if (user.credits < 1) {
      return res.json({ success: false, message: "Insufficient credits" });
    }

    // 2. Find chat
    const chat = await Chat.findOne({ _id: chatId, userId: req.userId });
    if (!chat) return res.json({ success: false, message: "Chat not found" });

    // 3. Push user message
    chat.messages.push({ role: "user", content: prompt, type: "text" });

    // 4. Update title if first message
    if (
      chat.messages.length === 1 ||
      (chat.messages.length === 2 && chat.title === "New Chat")
    ) {
      chat.title = prompt.slice(0, 40);
    }

    // 5. Build history mapping expected OpenAI { role, content } format
    const history = chat.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // 6. Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: history,
    });

    const responseText = completion.choices[0].message.content;

    // 7. Push assistant response
    chat.messages.push({
      role: "assistant",
      content: responseText,
      type: "text",
    });

    // 8. Save chat, deduct credit, save user
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

    // 1. Find user & check credits
    const user = await User.findById(req.userId);
    if (!user) return res.json({ success: false, message: "User not found" });
    if (user.credits < 2) {
      return res.json({ success: false, message: "Insufficient credits" });
    }

    // 2. Find chat
    const chat = await Chat.findOne({ _id: chatId, userId: req.userId });
    if (!chat) return res.json({ success: false, message: "Chat not found" });

    // 3. Generate image using ImageKit API
    const response = await fetch(
      "https://api.imagekit.io/v1/files/ai/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(process.env.IMAGEKIT_PRIVATE_KEY + ":").toString("base64")}`,
        },
        body: JSON.stringify({ prompt, width: 512, height: 512 }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.json({
        success: false,
        message: data.message || "Image generation failed",
      });
    }

    const generatedImageUrl =
      data.imageUrl || data.url || (data.data && data.data.imageUrl);

    // 4. Upload that image to ImageKit using SDK
    const uploadResult = await imagekit.upload({
      file: generatedImageUrl,
      fileName: `ai-image-${Date.now()}.jpg`,
    });

    const imageUrl = uploadResult.url;

    // 5. Push messages
    chat.messages.push({ role: "user", content: prompt, type: "text" });
    chat.messages.push({
      role: "assistant",
      content: imageUrl,
      type: "image",
    });

    // 6. Update title if needed
    if (chat.title === "New Chat") {
      chat.title = "Image: " + prompt.slice(0, 30);
    }

    // 7. Save chat and deduct 2 credits
    await chat.save();
    user.credits -= 2;
    await user.save();

    return res.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    return res.json({ success: false, message: error.message });
  }
};
