import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";

const features = [
  {
    icon: "🧠",
    title: "Intelligent Chat",
    description:
      "Deeply reasoning models designed for complex problem solving and nuanced creative writing. No filters, just raw intelligence.",
    accent: "primary",
  },
  {
    icon: "🎨",
    title: "Image Generation",
    description:
      "Hyper-realistic output at terminal velocity. Create stunning visuals from pure thought.",
    accent: "secondary",
  },
  {
    icon: "🔗",
    title: "Multi-Turn Memory",
    description:
      "The monolith never forgets context, ensuring your threads remain coherent for months.",
    accent: "tertiary",
  },
  {
    icon: "⚡",
    title: "Developer First",
    description:
      "A robust API designed for zero-latency integrations into your existing tech stack.",
    accent: "secondary",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background" id="landing-page">
      <Navbar />

      {/* ──────── Hero Section ──────── */}
      <section
        className="relative pb-20 sm:pb-28 px-6 text-center overflow-hidden"
        style={{ paddingTop: "calc(4rem + 100px)" }}
        id="hero"
      >
        {/* Ambient Background Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-[0.07]"
            style={{
              background:
                "radial-gradient(ellipse, #b6a0ff 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full opacity-[0.04]"
            style={{
              background:
                "radial-gradient(ellipse, #6e9bff 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-[5%] right-[15%] w-[300px] h-[300px] rounded-full opacity-[0.03]"
            style={{
              background:
                "radial-gradient(ellipse, #ff97b8 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-surface-container/80 border border-outline-variant/10 mb-10 backdrop-blur-sm">
            <div className="intelligence-pulse" />
            <span className="text-xs font-label text-on-surface-variant/80 uppercase tracking-[0.2em]">
              AI for the curious mind
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-headline font-extrabold tracking-[-0.04em] leading-[0.95]">
            <span className="text-on-surface block">INTELLIGENT</span>
            <span
              className="block mt-1 bg-clip-text text-transparent italic"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #b6a0ff 0%, #a98fff 30%, #6e9bff 70%, #b6a0ff 100%)",
                backgroundSize: "200% auto",
              }}
            >
              MONOLITH
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-7 text-base sm:text-lg text-on-surface-variant/70 max-w-lg mx-auto leading-relaxed">
            A high-end editorial workspace for the curious mind. Silent,
            powerful, and deeply integrated into your creative workflow.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              to="/auth"
              className="inline-flex items-center justify-center whitespace-nowrap px-8 py-3.5 rounded-full gradient-cta text-sm font-bold tracking-wide shadow-[0_0_30px_rgba(182,160,255,0.2)]"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center whitespace-nowrap px-8 py-3.5 rounded-full border border-outline-variant/20 text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low hover:border-outline-variant/30 transition-all duration-300"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* ──────── Chat Preview Section ──────── */}
      <section className="relative px-6 pb-24 sm:pb-32" id="preview">
        <div className="max-w-2xl mx-auto">
          {/* Label */}
          <p className="text-center text-[11px] font-label text-on-surface-variant/30 uppercase tracking-[0.25em] mb-5">
            Previewing a session
          </p>

          {/* Chat Window Mockup */}
          <div
            className="rounded-2xl overflow-hidden border border-outline-variant/10"
            style={{
              background: "linear-gradient(180deg, #131313 0%, #0e0e0e 100%)",
              boxShadow:
                "0 0 80px rgba(182,160,255,0.04), 0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            {/* Window Chrome */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-surface-container-low/50 border-b border-outline-variant/8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]/70" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/50" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]/50" />
              </div>
              <span className="text-[10px] font-mono text-on-surface-variant/25 uppercase tracking-wider">
                stoker.ai — session
              </span>
              <div className="w-16" />
            </div>

            {/* User Message */}
            <div className="px-5 pt-5 pb-2">
              <div className="flex justify-end">
                <div className="max-w-[85%] bg-surface-container-high/70 rounded-2xl rounded-br-sm px-5 py-3.5 border border-outline-variant/8">
                  <p className="text-[13px] text-on-surface/90 leading-relaxed">
                    Generate a minimalist hero section for a luxury AI product.
                    Use a monochrome palette with a single violet accent.
                  </p>
                  <p className="text-right text-[9px] text-on-surface-variant/25 mt-2 font-mono uppercase tracking-wider">
                    Sent 10:24 AM
                  </p>
                </div>
              </div>
            </div>

            {/* AI Response */}
            <div className="px-5 pb-5">
              <div className="flex items-center gap-2.5 mb-3 mt-4">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #b6a0ff 0%, #7e51ff 100%)",
                  }}
                >
                  <span className="text-[10px] font-bold text-white">S</span>
                </div>
                <span className="text-[11px] font-label font-bold text-on-surface/90 uppercase tracking-[0.15em]">
                  Stoker
                </span>
                <div className="intelligence-pulse" />
              </div>
              <p className="text-[13px] text-on-surface-variant/70 leading-relaxed mb-4 pl-[38px]">
                The monolithic aesthetic evolved. Each element echoes
                double-indirection, modeling an ambient atmosphere through
                geometry & motion.
              </p>

              {/* Generated Image Placeholder */}
              <div
                className="ml-[38px] rounded-xl overflow-hidden border border-outline-variant/8 aspect-[16/9] max-w-[400px] relative"
                style={{
                  background:
                    "linear-gradient(145deg, #1a1a2e 0%, #16161a 50%, #0f0f1a 100%)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(182,160,255,0.12) 0%, rgba(110,155,255,0.08) 100%)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-7 h-7 text-primary/40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                        />
                      </svg>
                    </div>
                    <p className="text-[10px] text-on-surface-variant/25 font-label uppercase tracking-widest">
                      Generated preview
                    </p>
                  </div>
                </div>
                {/* Decorative gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-container-lowest/60 to-transparent" />
              </div>
            </div>

            {/* Mock Input Bar */}
            <div className="px-5 pb-4 pt-1">
              <div
                className="flex items-center gap-3 rounded-xl px-4 py-3 border border-outline-variant/10"
                style={{ background: "rgba(38,38,38,0.5)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-on-surface-variant/20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32"
                  />
                </svg>
                <span className="flex-1 text-[13px] text-on-surface-variant/20">
                  Ask the monolith anything...
                </span>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center gradient-cta">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── Features Section ──────── */}
      <section className="px-6 pb-28 sm:pb-36" id="features">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14">
            <p className="text-[11px] font-label text-primary/60 uppercase tracking-[0.25em] mb-3">
              Capabilities
            </p>
            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              Built for depth, not breadth
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────── CTA Section ──────── */}
      <section className="px-6 pb-28" id="cta">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="rounded-3xl px-8 py-16 sm:px-16 sm:py-20 relative overflow-hidden border border-outline-variant/10"
            style={{
              background:
                "linear-gradient(135deg, #131318 0%, #0e0e14 50%, #0e0e0e 100%)",
            }}
          >
            {/* Background accent */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-[0.06] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse, #b6a0ff 0%, transparent 70%)",
              }}
            />

            <h2 className="relative font-headline text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mb-4">
              Ready to enter the void?
            </h2>
            <p className="relative text-sm text-on-surface-variant/60 max-w-md mx-auto mb-8 leading-relaxed">
              Join professionals who've upgraded their creative and analytical
              workflow with StokerAI.
            </p>
            <Link
              to="/auth"
              className="relative inline-flex items-center justify-center whitespace-nowrap gap-2 px-8 py-3.5 rounded-full gradient-cta text-sm font-bold tracking-wide shadow-[0_0_40px_rgba(182,160,255,0.15)]"
            >
              Start Free Trial
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
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────── Footer ──────── */}
      <Footer />
    </div>
  );
}
