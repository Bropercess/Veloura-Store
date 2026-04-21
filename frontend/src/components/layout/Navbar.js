'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Logo from '@/components/ui/Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/products?category=Shampoo', label: 'Shampoo' },
    { href: '/products?category=Conditioner', label: 'Conditioner' },
    { href: '/products?category=Serum', label: 'Serum' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-veloura-cream/95 backdrop-blur-sm border-b border-veloura-sand">
      <div className="section-padding">
        <div className="container-veloura flex items-center justify-between h-20">
          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none"
          >
            <Logo className="h-6 text-veloura-charcoal" />
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-widest uppercase transition-colors ${
                  pathname === link.href
                    ? 'text-veloura-gold'
                    : 'text-veloura-charcoal hover:text-veloura-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <button className="p-2 hover:text-veloura-gold transition-colors">
                  <User size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-veloura-sand opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/profile"
                    className="block px-4 py-3 text-sm hover:bg-veloura-cream"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-veloura-cream flex items-center gap-2"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="p-2 hover:text-veloura-gold transition-colors">
                <User size={20} />
              </Link>
            )}

            <Link href="/cart" className="p-2 hover:text-veloura-gold transition-colors relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-veloura-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-veloura-sand">
          <div className="section-padding py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm tracking-widest uppercase py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}