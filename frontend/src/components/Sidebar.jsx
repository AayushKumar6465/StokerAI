import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const navItems = [
  {
    label: "New Chat",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    ),
    to: "/chat",
  },
  {
    label: "History",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    to: "/settings",
  },
  {
    label: "Settings",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    to: "/settings",
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { chats, logout, user, fetchChats } = useApp();

  const deleteChat = async (chatId) => {
    try {
      const { data } = await axios.post("/api/chat/delete", { chatId });
      if (data.success) {
        fetchChats();
        // if currently viewing this chat, navigate to /chat
        if (location.pathname.includes(chatId)) {
          navigate("/chat");
        }
        toast.success("Chat deleted");
      }
    } catch (err) {
      toast.error("Failed to delete chat");
    }
  };

  if (!isOpen) {
    return (
      <aside
        className="w-[68px] h-screen flex flex-col items-center py-7 shrink-0 border-r border-outline-variant/8 transition-all"
        style={{
          background: "linear-gradient(180deg, #111113 0%, #0d0d0f 100%)",
        }}
        id="sidebar"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="p-1.5 rounded-lg text-on-surface-variant/40 hover:bg-surface-container/50 hover:text-on-surface transition-colors mb-6"
          title="Open Sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18V6zM9.75 3.75V20.25v0"
            />
          </svg>
        </button>
      </aside>
    );
  }

  return (
    <aside
      className="w-72 h-screen flex flex-col shrink-0 border-r border-outline-variant/8 relative"
      style={{
        background: "linear-gradient(180deg, #111113 0%, #0d0d0f 100%)",
      }}
      id="sidebar"
    >
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-7 right-4 p-1.5 rounded-lg text-on-surface-variant/40 hover:bg-surface-container/50 hover:text-on-surface transition-colors"
        title="Close Sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18V6zM9.75 3.75V20.25v0"
          />
        </svg>
      </button>

      {/* Top Brand */}
      <div className="pl-5 pr-12 pt-7 pb-5">
        <Link
          to="/"
          className="font-headline text-xl font-bold text-primary tracking-tight hover:text-primary-container transition-colors"
        >
          StokerAI
        </Link>
        <p className="text-[10px] font-label text-on-surface-variant/35 mt-1 uppercase tracking-[0.2em]">
          Pro Intelligence
        </p>
      </div>

      {/* Start New Session */}
      <div className="px-4 mb-5">
        <button
          onClick={() => navigate("/chat")}
          className="w-full flex items-center justify-center whitespace-nowrap shrink-0 gap-2 py-2.5 rounded-full gradient-cta text-sm font-semibold shadow-[0_0_25px_rgba(182,160,255,0.12)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Start New Session
        </button>
      </div>

      {/* Navigation */}
      <div className="px-4 mb-2">
        <p className="px-2.5 text-[9px] font-label text-on-surface-variant/30 uppercase tracking-[0.2em] mb-2">
          Navigation
        </p>
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.to && item.label !== "New Chat";
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-200 ${
                  isActive
                    ? "bg-surface-container-highest/60 text-on-surface border border-outline-variant/10"
                    : "text-on-surface-variant/60 hover:bg-surface-container/50 hover:text-on-surface/80 border border-transparent"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Recent Sessions */}
      <div className="px-4 mt-5 flex-1 overflow-y-auto">
        <p className="px-2.5 text-[9px] font-label text-on-surface-variant/30 uppercase tracking-[0.2em] mb-2">
          Recent Sessions
        </p>
        <div className="space-y-0.5">
          {chats?.slice(0, 10).map((chat) => (
            <div key={chat._id} className="relative group">
              <button
                onClick={() => navigate("/chat/" + chat._id)}
                className="w-full text-left px-3 py-2 rounded-xl text-[13px] text-on-surface-variant/50 hover:bg-surface-container/40 hover:text-on-surface/70 transition-all duration-200 truncate"
              >
                {chat.title || "New Chat"}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat._id);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 text-on-surface-variant/50 hover:text-error transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-4 pb-5 mt-auto">
        {/* User Profile */}
        <div
          className="flex items-center gap-3 px-3 py-3 rounded-xl border border-outline-variant/8"
          style={{ background: "rgba(25,26,26,0.5)" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-on-primary shrink-0"
            style={{
              background: "linear-gradient(135deg, #b6a0ff 0%, #7e51ff 100%)",
            }}
          >
            S
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-on-surface/80 truncate">
              {user?.name || "Stoker Pro"}
            </p>
            <p className="text-[10px] text-on-surface-variant/35 truncate">
              {user?.email || "intelligence@stoker.ai"}
            </p>
          </div>
          <button
            onClick={logout}
            className="text-on-surface-variant/30 hover:text-on-surface/60 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
