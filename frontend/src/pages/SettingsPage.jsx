import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useApp } from "../context/AppContext";

const settingsTabs = [
  { label: "Account", icon: "→" },
  { label: "Subscription", icon: "★" },
  { label: "API Keys", icon: "⊞" },
  { label: "Preferences", icon: "≡" },
];

const recentArtifacts = [
  {
    title: "Architectural Analysis of Vector DBs",
    description:
      "Discussed the performance overhead of HNSW indexing in high-concurrency environments...",
    time: "TODAY, 14:22",
  },
  {
    title: "Synthesizing Neo-Noir Scripts",
    description:
      "Drafted three scenes involving a detective in a rain-soaked megacity using local LLMs...",
    time: "YESTERDAY, 09:15",
  },
  {
    title: "Quantum Cryptography Ethics",
    description:
      "Exploring the philosophical implications of unbreakable encryption on state sovereignty...",
    time: "OCT 24, 2025",
  },
];

export default function SettingsPage() {
  const { logout } = useApp();
  const [activeTab, setActiveTab] = useState("Account");
  const [theme, setTheme] = useState("carbon");
  const [readingDensity, setReadingDensity] = useState(50);
  const [focusMode, setFocusMode] = useState(true);

  return (
    <div className="h-screen flex bg-background" id="settings-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-8 py-4 sticky top-0 bg-background/80 backdrop-blur-xl z-10">
          <Link
            to="/"
            className="font-headline text-lg font-bold text-on-surface tracking-tight"
          >
            StokerAI
          </Link>
          <div className="flex items-center gap-2">
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
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-primary/80 hover:bg-surface-container-highest hover:text-primary">
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

        {/* Page Content */}
        <div className="px-8 pb-16">
          {/* Title */}
          <div className="mb-10">
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
              System Control
            </h1>
            <p className="mt-2 text-sm text-on-surface-variant">
              Manage your computational identity, intelligence parameters, and
              historical session data.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column — Tabs */}
            <div className="lg:col-span-3">
              <nav className="space-y-1">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${
                      activeTab === tab.label
                        ? "bg-surface-container-highest text-primary ghost-border"
                        : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="text-on-surface-variant/30 text-xs">
                      {tab.icon}
                    </span>
                  </button>
                ))}
              </nav>

              {/* User Card */}
              <div className="mt-8 p-5 rounded-xl bg-surface-container-low ghost-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center">
                    <span className="text-sm font-bold text-on-primary">
                      ET
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-on-surface">
                      Elias Thorne
                    </p>
                    <p className="text-[11px] text-on-surface-variant/60">
                      Pro Tier Member
                    </p>
                  </div>
                </div>
                {/* Storage */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] font-label text-on-surface-variant/50 uppercase tracking-wider mb-1.5">
                    <span>Storage: 68% utilized</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: "68%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="mt-4 w-full flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-error/70 hover:bg-error/5 hover:text-error transition-colors"
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
                Logout
              </button>
            </div>

            {/* Center Column — Interface Configuration */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-surface-container-low p-6 ghost-border">
                <h3 className="font-headline text-lg font-bold text-on-surface mb-6">
                  Interface Configuration
                </h3>

                {/* Visual Atmosphere */}
                <div className="mb-8">
                  <label className="text-sm text-on-surface-variant mb-3 block">
                    Visual Atmosphere
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setTheme("carbon")}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
                        theme === "carbon"
                          ? "bg-surface-container-highest text-primary ghost-border border-primary/30"
                          : "ghost-border text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      }`}
                      style={
                        theme === "carbon"
                          ? { borderColor: "rgba(182,160,255,0.3)" }
                          : {}
                      }
                    >
                      <span className="text-xs">🌑</span>
                      Stoker Carbon
                    </button>
                    <button
                      onClick={() => setTheme("light")}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
                        theme === "light"
                          ? "bg-surface-container-highest text-primary ghost-border border-primary/30"
                          : "ghost-border text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      }`}
                    >
                      <span className="text-xs">☀️</span>
                      Ethereal Light
                    </button>
                  </div>
                </div>

                {/* Reading Experience */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm text-on-surface-variant">
                      Reading Experience
                    </label>
                    <span className="text-xs font-mono text-secondary">
                      {readingDensity}px / 1.6lh
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={readingDensity}
                    onChange={(e) => setReadingDensity(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full bg-surface-container-highest appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex items-center justify-between mt-2 text-[10px] font-label text-on-surface-variant/40 uppercase tracking-widest">
                    <span>Minimal</span>
                    <span>Standard</span>
                    <span>Editorial</span>
                  </div>
                </div>

                {/* Focus Mode */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-on-surface">Focus Mode</p>
                    <p className="text-xs text-on-surface-variant/60 mt-0.5">
                      Hide secondary metadata during chat
                    </p>
                  </div>
                  <button
                    onClick={() => setFocusMode(!focusMode)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      focusMode ? "bg-primary" : "bg-surface-container-highest"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-on-surface shadow transition-transform ${
                        focusMode ? "left-[22px]" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column — Recent Artifacts */}
            <div className="lg:col-span-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline text-base font-bold text-on-surface italic">
                  Recent Artifacts
                </h3>
                <button className="text-xs text-primary hover:text-primary-container uppercase tracking-wider">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentArtifacts.map((artifact) => (
                  <div key={artifact.title} className="group cursor-pointer">
                    <p className="text-[10px] font-label text-on-surface-variant/30 uppercase tracking-[0.15em] mb-1.5">
                      {artifact.time}
                    </p>
                    <h4 className="font-headline text-sm font-bold text-on-surface group-hover:text-primary transition-colors mb-1">
                      {artifact.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant/60 leading-relaxed">
                      {artifact.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Decorative Wave */}
          <div className="mt-16 rounded-2xl overflow-hidden h-32 bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-highest relative">
            <div className="absolute inset-0 opacity-20">
              <svg
                viewBox="0 0 1200 200"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,100 C200,20 400,180 600,100 C800,20 1000,180 1200,100 L1200,200 L0,200 Z"
                  fill="rgba(182,160,255,0.1)"
                />
                <path
                  d="M0,130 C300,60 500,200 700,120 C900,40 1100,160 1200,110 L1200,200 L0,200 Z"
                  fill="rgba(110,155,255,0.08)"
                />
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
