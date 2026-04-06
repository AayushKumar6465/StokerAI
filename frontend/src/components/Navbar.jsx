import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-outline-variant/8"
      style={{
        background: "rgba(14,14,14,0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      id="main-nav"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-headline text-lg font-bold text-on-surface tracking-tight hover:text-primary transition-colors"
        >
          StokerAI
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Pricing", "Docs", "Login"].map((label) => (
            <Link
              key={label}
              to={label === "Login" ? "/auth" : "#"}
              className="text-[12px] font-label text-on-surface-variant/60 hover:text-on-surface uppercase tracking-[0.15em] transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link
            to="/auth"
            className="hidden sm:inline-flex items-center justify-center whitespace-nowrap shrink-0 gap-2 px-5 py-2 rounded-full text-sm font-semibold gradient-cta shadow-[0_0_20px_rgba(182,160,255,0.15)]"
          >
            Get Started
          </Link>
          <Link
            to="/chat"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-container-highest/60 text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-bright/60 border border-outline-variant/10 transition-all duration-200"
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
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
