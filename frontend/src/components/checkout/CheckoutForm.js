'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';
import { CreditCard, Truck, Check } from 'lucide-react';

export default function CheckoutForm() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'Credit Card',
  });

  const shipping = cartTotal > 100 ? 0 : 10;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push('/login?redirect=/checkout');
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/orders', {
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
      });
      clearCart();
      setOrderPlaced(true);
    } catch (error) {
      console.error('Order error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="text-green-600" size={32} />
        </div>
        <h2 className="text-3xl font-serif text-veloura-dark mb-4">Order Confirmed</h2>
        <p className="text-veloura-muted mb-8">
          Thank you for your purchase. You will receive a confirmation email shortly.
        </p>
        <button onClick={() => router.push('/products')} className="btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl mb-6 flex items-center gap-2">
            <Truck size={24} className="text-veloura-gold" />
            Shipping Address
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-veloura-muted mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border border-veloura-sand px-4 py-3 focus:outline-none focus:border-veloura-gold transition-colors bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-veloura-muted mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border border-veloura-sand px-4 py-3 focus:outline-none focus:border-veloura-gold transition-colors bg-white"
                />
              </div>
              <div>
                <label className="block text-sm text-veloura-muted mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full border border-veloura-sand px-4 py-3 focus:outline-none focus:border-veloura-gold transition-colors bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-veloura-muted mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full border border-veloura-sand px-4 py-3 focus:outline-none focus:border-veloura-gold transition-colors bg-white"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl mb-6 flex items-center gap-2">
            <CreditCard size={24} className="text-veloura-gold" />
            Payment Method
          </h2>
          <div className="space-y-2">
            {['Credit Card', 'PayPal', 'Apple Pay'].map((method) => (
              <label
                key={method}
                className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${
                  formData.paymentMethod === method
                    ? 'border-veloura-gold bg-veloura-gold/5'
                    : 'border-veloura-sand hover:border-veloura-gold/50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={formData.paymentMethod === method}
                  onChange={handleChange}
                  className="text-veloura-gold"
                />
                <span className="text-sm">{method}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || cartItems.length === 0}
          className="btn-primary w-full disabled:opacity-50"
        >
          {loading ? 'Processing...' : `Place Order - ${formatPrice(total)}`}
        </button>
      </form>

      <div className="bg-veloura-beige/50 p-8 border border-veloura-sand h-fit">
        <h3 className="font-serif text-xl mb-6">Order Items</h3>
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div key={item.product._id} className="flex justify-between text-sm">
              <span className="text-veloura-muted">
                {item.product.name} x {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-veloura-sand pt-4 space-y-2 text-sm">
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
          <div className="flex justify-between font-medium text-veloura-dark pt-2">
            <span>Total</span>
            <span className="text-xl font-serif text-veloura-gold">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}