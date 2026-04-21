'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden bg-veloura-beige">
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-veloura-cream/90 via-veloura-cream/50 to-transparent" />

      <div className="relative section-padding w-full">
        <div className="container-veloura max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-veloura-gold tracking-[0.3em] uppercase text-sm font-medium mb-4 block">
              New Collection
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-veloura-dark leading-[1.1] mb-6">
              The Art of <br />
              <span className="italic text-veloura-gold">Beautiful</span> Hair
            </h1>
            <p className="text-veloura-muted text-lg mb-8 max-w-md leading-relaxed">
              Discover our premium collection of hair care essentials, crafted with rare botanicals
              and golden silk proteins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="btn-primary inline-flex items-center justify-center gap-2">
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link href="/products?category=Serum" className="btn-outline inline-flex items-center justify-center">
                View Serums
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}