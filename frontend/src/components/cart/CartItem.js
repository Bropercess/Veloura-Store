'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-6 py-6 border-b border-veloura-sand">
      <Link
        href={`/products/${item.product.slug}`}
        className="relative w-24 h-32 bg-veloura-beige flex-shrink-0"
      >
        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
      </Link>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <Link href={`/products/${item.product.slug}`}>
              <h3 className="font-serif text-lg text-veloura-dark hover:text-veloura-gold transition-colors">
                {item.product.name}
              </h3>
            </Link>
            <button
              onClick={() => removeFromCart(item.product._id)}
              className="text-veloura-muted hover:text-red-500 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-sm text-veloura-muted mt-1">{item.product.category}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center border border-veloura-sand">
            <button
              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
              className="p-2 hover:bg-veloura-beige transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-10 text-center text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
              className="p-2 hover:bg-veloura-beige transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  );
}