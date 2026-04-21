'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Star, Truck, Shield, Leaf } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative aspect-square bg-veloura-beige"
      >
        <Image src={product.image} alt={product.name} fill className="object-cover" priority />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col justify-center"
      >
        <Badge className="mb-4 w-fit">{product.category}</Badge>

        <h1 className="text-4xl md:text-5xl font-serif text-veloura-dark mb-4">{product.name}</h1>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(product.rating)
                    ? 'fill-veloura-gold text-veloura-gold'
                    : 'text-veloura-sand'
                }
              />
            ))}
            <span className="ml-2 text-sm text-veloura-muted">
              {product.rating} ({product.numReviews} reviews)
            </span>
          </div>
        </div>

        <p className="text-3xl font-serif text-veloura-gold mb-6">{formatPrice(product.price)}</p>

        <p className="text-veloura-muted leading-relaxed mb-8">{product.description}</p>

        <div className="grid grid-cols-3 gap-4 mb-8 text-sm">
          <div className="flex items-center gap-2 text-veloura-muted">
            <Truck size={18} className="text-veloura-gold" />
            <span>Free shipping over $100</span>
          </div>
          <div className="flex items-center gap-2 text-veloura-muted">
            <Shield size={18} className="text-veloura-gold" />
            <span>30-day guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-veloura-muted">
            <Leaf size={18} className="text-veloura-gold" />
            <span>Clean ingredients</span>
          </div>
        </div>

        {product.ingredients && (
          <div className="mb-8 p-4 bg-veloura-beige/50 border border-veloura-sand">
            <span className="text-xs tracking-wider uppercase text-veloura-muted block mb-2">
              Key Ingredients
            </span>
            <p className="text-sm text-veloura-charcoal">{product.ingredients}</p>
          </div>
        )}

        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center border border-veloura-sand">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-3 hover:bg-veloura-beige transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="w-12 text-center text-sm font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-3 hover:bg-veloura-beige transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          <button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2">
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        </div>

        {product.size && (
          <p className="text-sm text-veloura-muted">
            Size: <span className="text-veloura-charcoal">{product.size}</span>
          </p>
        )}
      </motion.div>
    </div>
  );
}