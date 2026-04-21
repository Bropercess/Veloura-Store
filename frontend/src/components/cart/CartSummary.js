'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export default function CartSummary() {
  const { cartItems, cartTotal } = useCart();
  const shipping = cartTotal > 100 ? 0 : 10;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  return (
    <div className="bg-veloura-beige/50 p-8 border border-veloura-sand h-fit">
      <h2 className="font-serif text-2xl mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6 text-sm">
        <div className="flex justify-between text-veloura-muted">
          <span>Subtotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <div className="flex justify-between text-veloura-muted">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-veloura-muted">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="border-t border-veloura-sand pt-4 flex justify-between font-medium text-veloura-dark">
          <span>Total</span>
          <span className="text-xl font-serif text-veloura-gold">{formatPrice(total)}</span>
        </div>
      </div>

      <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
        Proceed to Checkout <ArrowRight size={16} />
      </Link>

      <p className="text-xs text-veloura-muted text-center mt-4">Free shipping on orders over $100</p>
    </div>
  );
}