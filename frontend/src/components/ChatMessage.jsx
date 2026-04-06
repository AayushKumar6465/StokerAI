export default function ChatMessage({
  role,
  content,
  timestamp,
  codeBlocks = [],
}) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6 animate-fade-in`}
    >
      <div
        className={`${
          isUser
            ? "max-w-[70%] bg-surface-container-high rounded-2xl rounded-br-sm px-5 py-4"
            : "max-w-[85%]"
        }`}
      >
        {/* AI Label */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-3">
            <div className="intelligence-pulse" />
            <span className="text-xs font-label font-bold text-on-surface uppercase tracking-widest">
              Stoker Intelligence
            </span>
          </div>
        )}

        {/* Text Content */}
        <div
          className={`text-[15px] leading-[1.7] ${isUser ? "text-on-surface" : "text-on-surface-variant"}`}
        >
          {content}
        </div>

        {/* Code Blocks */}
        {codeBlocks.map((block, idx) => (
          <div
            key={idx}
            className="mt-4 rounded-xl overflow-hidden bg-surface-container-lowest"
          >
            {/* Code Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-surface-container">
              <span className="text-[11px] font-label text-on-surface-variant/60 uppercase tracking-wider">
                {block.language || "javascript"}
              </span>
              <button className="text-on-surface-variant/50 hover:text-on-surface text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                  />
                </svg>
                Copy
              </button>
            </div>
            {/* Code Content */}
            <pre className="px-5 py-4 overflow-x-auto">
              <code className="text-[13px] font-mono leading-[1.7] text-primary/90">
                {block.code}
              </code>
            </pre>
          </div>
        ))}

        {/* Timestamp */}
        {timestamp && (
          <p
            className={`text-[11px] font-label text-on-surface-variant/40 mt-2 ${isUser ? "text-right" : ""}`}
          >
            {timestamp}
          </p>
        )}

        {/* AI Actions */}
        {!isUser && (
          <div className="flex items-center gap-1 mt-3">
            {["Copy", "Regenerate", "Share"].map((action) => (
              <button
                key={action}
                className="px-3 py-1.5 rounded-lg text-[11px] font-label text-on-surface-variant/50 uppercase tracking-wider hover:bg-surface-container-highest hover:text-on-surface transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
