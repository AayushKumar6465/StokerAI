import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend?.(message);
      setMessage("");
    }
  };

  return (
    <div className="px-4 pb-4 pt-2" id="chat-input-area">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-surface-container-highest rounded-2xl ghost-border overflow-hidden transition-all focus-within:shadow-[0_0_30px_rgba(110,155,255,0.08)]"
        style={{ borderColor: "rgba(72,72,72,0.15)" }}
      >
        {/* Input Row */}
        <div className="flex items-end gap-2 px-4 py-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Message StokerAI..."
            rows={1}
            className="flex-1 bg-transparent text-on-surface text-[15px] placeholder:text-on-surface-variant/40 resize-none min-h-[24px] max-h-[120px]"
            style={{ lineHeight: "1.5" }}
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between px-4 pb-3 pt-0">
          <div className="flex items-center gap-1">
            {/* Attachment */}
            <button
              type="button"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant/50 hover:bg-surface-container hover:text-on-surface transition-colors"
              aria-label="Attach file"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[18px] h-[18px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>
            </button>
            {/* Mic */}
            <button
              type="button"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant/50 hover:bg-surface-container hover:text-on-surface transition-colors"
              aria-label="Voice input"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[18px] h-[18px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                />
              </svg>
            </button>
            {/* Image */}
            <button
              type="button"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant/50 hover:bg-surface-container hover:text-on-surface transition-colors"
              aria-label="Generate image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[18px] h-[18px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                />
              </svg>
            </button>
          </div>

          {/* Send Button */}
          <button
            type="submit"
            className="w-9 h-9 rounded-xl flex items-center justify-center gradient-cta disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={!message.trim()}
            aria-label="Send message"
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
                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
              />
            </svg>
          </button>
        </div>
      </form>

      <p className="text-center text-[11px] text-on-surface-variant/30 mt-2 font-label">
        StokerAI can make mistakes. Verify important information.
      </p>
    </div>
  );
}
