'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems } = useCart();

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems, router]);

  return (
    <div className="py-12 min-h-screen">
      <Container>
        <h1 className="text-4xl md:text-5xl font-serif text-veloura-dark mb-8">Checkout</h1>
        <CheckoutForm />
      </Container>
    </div>
  );
}