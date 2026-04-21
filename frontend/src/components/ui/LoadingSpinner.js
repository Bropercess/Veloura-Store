export default function LoadingSpinner({ className = '' }) {
  return (
    <div
      className={`animate-spin w-8 h-8 border-2 border-veloura-gold border-t-transparent rounded-full ${className}`}
    />
  );
}