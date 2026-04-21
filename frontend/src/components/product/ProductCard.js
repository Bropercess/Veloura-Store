'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group">
      <Link
        href={`/products/${product.slug}`}
        className="block relative aspect-[3/4] bg-veloura-beige mb-4 overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="absolute bottom-4 right-4 bg-white p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-veloura-gold hover:text-white"
        >
          <ShoppingBag size={18} />
        </motion.button>
      </Link>

      <div className="space-y-2">
        <span className="text-xs text-veloura-muted tracking-wider uppercase">{product.category}</span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-lg text-veloura-dark group-hover:text-veloura-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-veloura-gold text-veloura-gold" />
            <span className="text-sm text-veloura-muted">{product.rating}</span>
          </div>
          <span className="text-veloura-sand">|</span>
          <span className="font-medium">{formatPrice(product.price)}</span>
        </div>
      </div>
    </div>
  );
}