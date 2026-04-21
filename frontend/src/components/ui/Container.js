export default function Container({ children, className = '' }) {
  return (
    <div className={`section-padding ${className}`}>
      <div className="container-veloura">{children}</div>
    </div>
  );
}