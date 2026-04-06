import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-background flex" id="auth-page">
      {/* ──────── Left Panel — Brand ──────── */}
      <div
        className="hidden lg:flex flex-1 flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #111114 0%, #0e0e10 100%)",
        }}
      >
        {/* Ambient Glows */}
        <div
          className="absolute top-0 left-0 right-0 h-72 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(182,160,255,0.04) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full opacity-[0.04] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, #b6a0ff 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-24">
            <div className="intelligence-pulse" />
            <span className="font-headline text-sm font-semibold text-on-surface-variant/70 tracking-wide">
              StokerAI
            </span>
          </div>

          {/* Main Copy */}
          <h1 className="font-headline text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
            <span className="text-on-surface">The Intelligent</span>
            <br />
            <span className="text-primary">Monolith.</span>
          </h1>

          <p className="mt-7 text-[15px] text-on-surface-variant/60 leading-relaxed max-w-md">
            Access a curated laboratory of deep intelligence. Engineered for
            professionals who demand silence and power.
          </p>

          {/* Feature Badges */}
          <div className="flex gap-4 mt-12">
            {[
              {
                icon: "⚡",
                label: "Ethereal Speed",
                desc: "Sub-second inference cycles.",
              },
              {
                icon: "🛡️",
                label: "Neural Privacy",
                desc: "Encrypted at the atomic level.",
              },
            ].map((f) => (
              <div
                key={f.label}
                className="px-5 py-4 rounded-xl border border-outline-variant/10 flex items-start gap-3"
                style={{ background: "rgba(25,26,26,0.5)" }}
              >
                <span className="text-lg mt-0.5">{f.icon}</span>
                <div>
                  <h4 className="text-sm font-headline font-bold text-on-surface">
                    {f.label}
                  </h4>
                  <p className="text-xs text-on-surface-variant/50 mt-0.5">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p className="relative z-10 text-[10px] font-mono text-on-surface-variant/20 uppercase tracking-[0.2em]">
          Neural System v3.2 — Stable
        </p>
      </div>

      {/* ──────── Right Panel — Form ──────── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-12 text-center">
            <Link
              to="/"
              className="font-headline text-2xl font-bold text-primary"
            >
              StokerAI
            </Link>
          </div>

          {/* Heading */}
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-1.5">
            Welcome to the void
          </h2>
          <p className="text-sm text-on-surface-variant/60 mb-9">
            Enter your credentials to synchronize.
          </p>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[10px] font-label font-semibold text-on-surface-variant/50 uppercase tracking-[0.15em] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-4 py-3 rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/30 border border-outline-variant/12 focus:border-secondary/30 transition-colors"
                style={{ background: "rgba(38,38,38,0.4)" }}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-label font-semibold text-on-surface-variant/50 uppercase tracking-[0.15em]">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-primary/80 hover:text-primary"
                >
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant/30 border border-outline-variant/12 focus:border-secondary/30 transition-colors"
                style={{ background: "rgba(38,38,38,0.4)" }}
              />
            </div>

            {/* Submit */}
            <Link
              to="/chat"
              className="w-full flex items-center justify-center whitespace-nowrap shrink-0 py-3.5 rounded-full gradient-cta text-sm font-bold uppercase tracking-[0.1em] shadow-[0_0_30px_rgba(182,160,255,0.15)] mt-2"
            >
              Synchronize Session
            </Link>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-outline-variant/10" />
            <span className="text-[10px] font-label text-on-surface-variant/30 uppercase tracking-[0.2em]">
              Or access with
            </span>
            <div className="flex-1 h-px bg-outline-variant/10" />
          </div>

          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2.5 py-3 rounded-xl border border-outline-variant/12 text-sm font-medium text-on-surface-variant/70 hover:bg-surface-container-low hover:text-on-surface hover:border-outline-variant/20 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2.5 py-3 rounded-xl border border-outline-variant/12 text-sm font-medium text-on-surface-variant/70 hover:bg-surface-container-low hover:text-on-surface hover:border-outline-variant/20 transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </button>
          </div>

          {/* Bottom */}
          <p className="text-center text-[13px] text-on-surface-variant/40 mt-8">
            Don't have an access key?{" "}
            <a
              href="#"
              className="text-primary/80 font-medium hover:text-primary"
            >
              Request Invitation
            </a>
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <a
              href="#"
              className="text-[10px] font-label text-on-surface-variant/25 uppercase tracking-[0.15em] hover:text-on-surface-variant/50 transition-colors"
            >
              Privacy Protocol
            </a>
            <span className="text-on-surface-variant/15 text-[8px]">◇</span>
            <a
              href="#"
              className="text-[10px] font-label text-on-surface-variant/25 uppercase tracking-[0.15em] hover:text-on-surface-variant/50 transition-colors"
            >
              Terms of Synchrony
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
