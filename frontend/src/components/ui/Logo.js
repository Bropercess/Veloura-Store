export default function Logo({ className = 'h-8' }) {
  return (
    <svg viewBox="0 0 200 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C9A96E" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <path
        d="M10 8 L20 32 L30 8"
        stroke="url(#logoGrad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="38"
        y="28"
        fill="currentColor"
        fontSize="22"
        fontFamily="var(--font-playfair), 'Playfair Display', serif"
        fontWeight="400"
        letterSpacing="6"
      >
        VELOURA
      </text>
      <line x1="38" y1="34" x2="190" y2="34" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}