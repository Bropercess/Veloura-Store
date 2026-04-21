'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Container from '@/components/ui/Container';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems } = useCart();

  return (
    <div className="py-12 min-h-screen">
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-serif text-veloura-dark mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingBag size={48} className="mx-auto text-veloura-sand mb-4" />
              <h2 className="text-2xl font-serif text-veloura-dark mb-2">Your cart is empty</h2>
              <p className="text-veloura-muted mb-8">Discover our luxury hair care collection.</p>
              <Link href="/products" className="btn-primary">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                {cartItems.map((item) => (
                  <CartItem key={item.product._id} item={item} />
                ))}
              </div>
              <div>
                <CartSummary />
              </div>
            </div>
          )}
        </motion.div>
      </Container>
    </div>
  );
}