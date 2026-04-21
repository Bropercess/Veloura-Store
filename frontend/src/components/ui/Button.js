export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle =
    'px-8 py-3 font-medium tracking-wider uppercase text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-veloura-gold text-white hover:bg-veloura-goldDark',
    outline:
      'border border-veloura-charcoal text-veloura-charcoal hover:bg-veloura-charcoal hover:text-white',
    ghost: 'text-veloura-charcoal hover:text-veloura-gold',
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}