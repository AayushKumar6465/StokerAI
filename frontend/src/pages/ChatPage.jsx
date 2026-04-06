import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";

const initialMessages = [
  {
    role: "user",
    content:
      'Can you write a React function that uses the Intersection Observer API to detect when an element enters the viewport, and explain the concept of "threshold"?',
    timestamp: "SENT 10:24 AM",
  },
  {
    role: "assistant",
    content:
      "The **Intersection Observer API** provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.",
    timestamp: "",
    codeBlocks: [
      {
        language: "javascript",
        code: `const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      callbackFunction,
      options
    );
    if (containerRef.current)
      observer.observe(containerRef.current);

    return () => {
      if (containerRef.current)
        observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};`,
      },
    ],
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);

  const handleSend = (text) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text, timestamp: "JUST NOW" },
    ]);
    // Auto AI response (mock)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'll analyze that for you. The architecture follows a clean separation of concerns with observable patterns that scale well in production environments.",
          timestamp: "",
          codeBlocks: [],
        },
      ]);
    }, 1200);
  };

  return (
    <div className="h-screen flex bg-background" id="chat-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
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
                Model 6.3
              </span>
              <span className="text-[11px] font-label text-on-surface-variant/30 uppercase tracking-widest">
                Plugins
              </span>
            </div>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant/50 hover:bg-surface-container-highest hover:text-on-surface">
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
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant/50 hover:bg-surface-container-highest hover:text-on-surface">
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
            </button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-3xl mx-auto">
            {messages.map((msg, idx) => (
              <ChatMessage
                key={idx}
                role={msg.role}
                content={msg.content}
                timestamp={msg.timestamp}
                codeBlocks={msg.codeBlocks || []}
              />
            ))}

            {/* Threshold Explanation (static, part of the AI response) */}
            {messages.length >= 2 && (
              <div className="max-w-[85%] mb-6 animate-fade-in">
                <h4 className="font-headline text-base font-bold text-on-surface mb-3">
                  The Concept of Threshold
                </h4>
                <ul className="space-y-3 text-[15px] text-on-surface-variant leading-[1.7]">
                  <li className="flex gap-2">
                    <span className="text-primary mt-1 shrink-0">•</span>
                    <span>
                      A{" "}
                      <code className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary text-[13px] font-mono">
                        threshold
                      </code>{" "}
                      of{" "}
                      <code className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary text-[13px] font-mono">
                        1.0
                      </code>{" "}
                      means that when 100% of the target is visible within the
                      element specified by the root option, the callback is
                      invoked.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1 shrink-0">•</span>
                    <span>
                      The default value is{" "}
                      <code className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary text-[13px] font-mono">
                        0
                      </code>{" "}
                      (meaning even a single pixel visible triggers it).
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1 shrink-0">•</span>
                    <span>
                      You can provide an array of values (e.g.,{" "}
                      <code className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary text-[13px] font-mono">
                        [0, 0.25, 0.5, 0.75, 1]
                      </code>
                      ) to run the callback every time another 25% of the
                      element becomes visible.
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <ChatInput onSend={handleSend} />
      </main>
    </div>
  );
}
