export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-block bg-veloura-gold/10 text-veloura-gold text-xs tracking-wider uppercase px-3 py-1 ${className}`}
    >
      {children}
    </span>
  );
}