// A hand-drawn PC tower illustration, recolored per tier.
// Avoids using generic/unrelated stock photos.

const tierColors = {
  Starter: "#4fd1c5",
  Standard: "#ff8a3d",
  Pro: "#ff5c8a",
  Elite: "#c96aff",
};

function PCIllustration({ tier = "Standard" }) {
  const accent = tierColors[tier] || "#ff8a3d";

  return (
    <svg viewBox="0 0 400 260" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`bg-${tier}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1b1e27" />
          <stop offset="100%" stopColor="#12141a" />
        </linearGradient>
        <linearGradient id={`glow-${tier}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.2" />
        </linearGradient>
        <style>{`
          @keyframes fanPulse-${tier} {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          .fan-ring-${tier} { animation: fanPulse-${tier} 2.4s ease-in-out infinite; }
          .fan-ring-${tier}:nth-child(2) { animation-delay: 0.3s; }
          .fan-ring-${tier}:nth-child(3) { animation-delay: 0.6s; }
        `}</style>
      </defs>

      <rect width="400" height="260" fill={`url(#bg-${tier})`} />

      {/* subtle grid */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="260" stroke={accent} strokeOpacity="0.05" />
      ))}

      {/* PC tower body */}
      <rect x="150" y="40" width="100" height="180" rx="8" fill="#0f1015" stroke={accent} strokeOpacity="0.5" strokeWidth="1.5" />

      {/* glass side panel glow */}
      <rect x="158" y="50" width="84" height="160" rx="4" fill={`url(#glow-${tier})`} opacity="0.15" />

      {/* front fans */}
      <circle className={`fan-ring-${tier}`} cx="200" cy="80" r="16" fill="none" stroke={accent} strokeWidth="2" />
      <circle cx="200" cy="80" r="3" fill={accent} />
      <circle className={`fan-ring-${tier}`} cx="200" cy="130" r="16" fill="none" stroke={accent} strokeWidth="2" />
      <circle cx="200" cy="130" r="3" fill={accent} />
      <circle className={`fan-ring-${tier}`} cx="200" cy="180" r="16" fill="none" stroke={accent} strokeWidth="2" />
      <circle cx="200" cy="180" r="3" fill={accent} opacity="0.6" />

      {/* power button */}
      <circle cx="200" cy="52" r="3" fill={accent} />

      {/* base glow reflection */}
      <ellipse cx="200" cy="228" rx="70" ry="8" fill={accent} opacity="0.15" />

      {/* side light strip */}
      <rect x="150" y="40" width="4" height="180" fill={accent} opacity="0.7" />
      <rect x="246" y="40" width="4" height="180" fill={accent} opacity="0.4" />
    </svg>
  );
}

export default PCIllustration;
