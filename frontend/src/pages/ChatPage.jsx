import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, fetchChats } = useApp();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(id || null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    setCurrentChatId(id || null);
    if (id) {
      fetchMessages(id);
    } else {
      setMessages([]);
    }
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const fetchMessages = async (chatId) => {
    try {
      const { data } = await axios.get(`/api/chat/messages/${chatId}`);
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSend = async (text) => {
    try {
      if (!currentChatId) {
        const { data } = await axios.get("/api/chat/create");
        if (data.success && data.chat) {
          const newChatId = data.chat._id;
          setCurrentChatId(newChatId);
          setMessages((prev) => [
            ...prev,
            { role: "user", content: text, type: "text" },
          ]);
          setLoading(true);

          const res = await axios.post("/api/message/text", {
            chatId: newChatId,
            prompt: text,
          });

          if (res.data.success) {
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: res.data.response,
                type: "text",
              },
            ]);
            fetchChats();
            navigate(`/chat/${newChatId}`, { replace: true });
          } else {
            toast.error("Failed to get response");
          }
          setLoading(false);
        } else {
          toast.error("Failed to create session");
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "user", content: text, type: "text" },
        ]);
        setLoading(true);

        const { data } = await axios.post("/api/message/text", {
          chatId: currentChatId,
          prompt: text,
        });

        if (data.success) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: data.response,
              type: "text",
            },
          ]);
          fetchChats();
        } else {
          toast.error("Failed to get response");
        }
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
      setLoading(false);
    }
  };

  const handleSendImage = async (text) => {
    try {
      let chatId = currentChatId;

      // Pehle chatId lo
      if (!chatId) {
        const { data } = await axios.get("/api/chat/create");
        if (!data.success) return toast.error("Failed to create session");
        chatId = data.chat._id;
        setCurrentChatId(chatId);
      }

      // User message add karo
      setMessages((prev) => [
        ...prev,
        { role: "user", content: text, type: "text" },
      ]);
      setLoading(true);

      // Ab image generate karo
      const res = await axios.post("/api/message/image", {
        chatId: chatId,
        prompt: text,
      });

      if (res.data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: res.data.imageUrl,
            type: "image",
          },
        ]);
        fetchChats();
        navigate("/chat/" + chatId, { replace: true });
      } else {
        toast.error(res.data.message || "Image generation failed");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Failed to generate image");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-background" id="chat-page">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <header
          className="flex items-center justify-between px-6 py-3 shrink-0"
          style={{ borderBottom: "1px solid rgba(72,72,72,0.1)" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container">
              <div className="intelligence-pulse" />
              <span className="text-xs font-label font-bold text-on-surface uppercase tracking-widest">
                Pro Intelligence
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-label text-on-surface-variant/50 uppercase tracking-widest">
                Model 1.0
              </span>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-3xl mx-auto min-h-[100%] flex flex-col justify-end">
            {messages.length === 0 && !id ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in opacity-80 mt-[-50px]">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface mb-4">
                  <span className="text-primary mr-3">✦</span>
                  Welcome, {user?.name?.split(" ")[0] || "there"}
                </h2>
                <p className="text-on-surface-variant/70 text-lg">
                  How can I help you today?
                </p>
              </div>
            ) : (
              <div className="w-full flex-1 mt-auto">
                {messages.map((msg, idx) =>
                  msg.type === "image" ? (
                    <div key={idx} className="flex justify-start mb-6">
                      <img
                        src={msg.content}
                        alt="Generated"
                        className="rounded-xl max-w-sm"
                      />
                    </div>
                  ) : (
                    <ChatMessage
                      key={idx}
                      role={msg.role}
                      content={msg.content}
                      timestamp={msg.timestamp}
                      codeBlocks={msg.codeBlocks || []}
                    />
                  ),
                )}

                {loading && (
                  <div className="flex justify-start mb-6 animate-fade-in">
                    <div className="max-w-[85%]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="intelligence-pulse" />
                        <span className="text-xs font-label font-bold text-on-surface uppercase tracking-widest">
                          Stoker Intelligence
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 h-6 ml-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} className="h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <ChatInput onSend={handleSend} onSendImage={handleSendImage} />
      </main>
    </div>
  );
}
