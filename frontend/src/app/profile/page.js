'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Package, Calendar, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Container from '@/components/ui/Container';
import { formatPrice } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/profile');
      return;
    }
    if (user) {
      fetchOrders();
    }
  }, [user, authLoading, router]);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/api/orders');
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="py-12 min-h-screen">
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-12">
            <h1 className="text-4xl font-serif text-veloura-dark mb-2">My Account</h1>
            <p className="text-veloura-muted">{user.email}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="bg-white p-6 border border-veloura-sand">
                <h2 className="font-serif text-xl mb-4">Account Details</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-veloura-muted block">Name</span>
                    <span className="text-veloura-dark">{user.name}</span>
                  </div>
                  <div>
                    <span className="text-veloura-muted block">Email</span>
                    <span className="text-veloura-dark">{user.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl mb-6 flex items-center gap-2">
                <Package size={24} className="text-veloura-gold" />
                Order History
              </h2>

              {orders.length === 0 ? (
                <div className="bg-veloura-beige/50 p-12 text-center border border-veloura-sand">
                  <p className="text-veloura-muted">No orders yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-white p-6 border border-veloura-sand hover:border-veloura-gold transition-colors"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs text-veloura-muted tracking-wider uppercase block mb-1">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </span>
                          <div className="flex items-center gap-2 text-sm text-veloura-muted">
                            <Calendar size={14} />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <span
                          className={`text-xs px-3 py-1 ${
                            order.status === 'Delivered'
                              ? 'bg-green-50 text-green-600'
                              : 'bg-veloura-gold/10 text-veloura-gold'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        {order.orderItems.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-veloura-muted">
                              {item.name} x {item.quantity}
                            </span>
                            <span>{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-veloura-sand pt-4 flex justify-between items-center">
                        <span className="font-medium">{formatPrice(order.totalPrice)}</span>
                        <button className="text-sm text-veloura-gold flex items-center gap-1 hover:underline">
                          View Details <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}