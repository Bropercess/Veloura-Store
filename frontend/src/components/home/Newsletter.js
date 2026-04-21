'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <section className="py-24 bg-veloura-charcoal text-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-veloura-gold tracking-[0.3em] uppercase text-sm font-medium mb-4 block">
            Join the Inner Circle
          </span>
          <h2 className="text-4xl font-serif mb-6">The Veloura Journal</h2>
          <p className="text-gray-400 mb-8">
            Receive exclusive access to new launches, beauty rituals, and member-only offers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/20 px-6 py-3 text-sm focus:outline-none focus:border-veloura-gold transition-colors"
              required
            />
            <button type="submit" className="btn-primary inline-flex items-center justify-center gap-2">
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        </motion.div>
      </Container>
    </section>
  );
}