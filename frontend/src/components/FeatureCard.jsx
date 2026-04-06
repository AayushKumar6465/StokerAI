export default function FeatureCard({
  icon,
  title,
  description,
  accent = "primary",
  className = "",
}) {
  const accentMap = {
    primary: {
      iconBg: "bg-primary/10",
      iconText: "text-primary",
      hoverGlow: "group-hover:shadow-[0_0_40px_rgba(182,160,255,0.08)]",
    },
    secondary: {
      iconBg: "bg-secondary/10",
      iconText: "text-secondary",
      hoverGlow: "group-hover:shadow-[0_0_40px_rgba(110,155,255,0.08)]",
    },
    tertiary: {
      iconBg: "bg-tertiary/10",
      iconText: "text-tertiary",
      hoverGlow: "group-hover:shadow-[0_0_40px_rgba(255,151,184,0.08)]",
    },
  };

  const colors = accentMap[accent] || accentMap.primary;

  return (
    <div
      className={`group relative bg-surface-container-low/80 rounded-2xl p-7 transition-all duration-300 hover:bg-surface-container border border-outline-variant/10 hover:border-outline-variant/20 ${colors.hoverGlow} ${className}`}
      id={`feature-${title?.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* Subtle corner glow on hover */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full ${colors.iconBg} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      {/* Icon */}
      <div
        className={`relative w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-5`}
      >
        <span className={`${colors.iconText} text-xl`}>{icon}</span>
      </div>

      {/* Content */}
      <h3 className="relative font-headline text-sm font-bold text-on-surface uppercase tracking-wider mb-3">
        {title}
      </h3>
      <p className="relative text-sm text-on-surface-variant/80 leading-relaxed">
        {description}
      </p>

      {/* Bottom accent bar */}
      <div
        className={`mt-5 h-px w-12 rounded-full bg-gradient-to-r from-${accent} to-transparent opacity-40 group-hover:w-20 group-hover:opacity-70 transition-all duration-500`}
      />
    </div>
  );
}
