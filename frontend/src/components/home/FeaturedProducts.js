'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import Container from '@/components/ui/Container';

const featuredProducts = [
  {
    _id: '1',
    name: 'Silk Renewal Shampoo',
    slug: 'silk-renewal-shampoo',
    price: 48,
    category: 'Shampoo',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
  },
  {
    _id: '2',
    name: 'Hydrating Conditioner',
    slug: 'hydrating-conditioner',
    price: 46,
    category: 'Conditioner',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
  },
  {
    _id: '3',
    name: 'Golden Elixir Serum',
    slug: 'golden-elixir-serum',
    price: 68,
    category: 'Serum',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
  },
  {
    _id: '4',
    name: 'Repair Hair Mask',
    slug: 'repair-hair-mask',
    price: 56,
    category: 'Hair Mask',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-veloura-gold tracking-[0.3em] uppercase text-sm font-medium mb-4 block">
            Curated Selection
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-veloura-dark mb-4">
            Bestselling Essentials
          </h2>
          <p className="text-veloura-muted max-w-lg mx-auto">
            Our most loved formulas, trusted by thousands for transformative results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}