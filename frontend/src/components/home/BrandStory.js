'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Container from '@/components/ui/Container';

export default function BrandStory() {
  return (
    <section className="py-24 bg-veloura-cream">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] bg-veloura-sand"
          >
            <Image
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
              alt="Veloura Brand"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-veloura-gold tracking-[0.3em] uppercase text-sm font-medium">
              Our Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-veloura-dark leading-tight">
              Luxury in Every <br />
              <span className="italic">Drop</span>
            </h2>
            <p className="text-veloura-muted leading-relaxed">
              Founded on the belief that hair care should be a ritual of self-love, Veloura combines
              ancient botanical wisdom with modern science. Each formula is meticulously crafted in
              small batches, using only the finest sustainably sourced ingredients.
            </p>
            <p className="text-veloura-muted leading-relaxed">
              Our golden standard ensures that every product not only transforms your hair but also
              honors the environment from which we source our precious ingredients.
            </p>
            <div className="grid grid-cols-3 gap-8 pt-6 border-t border-veloura-sand">
              <div>
                <span className="text-3xl font-serif text-veloura-gold">100%</span>
                <p className="text-sm text-veloura-muted mt-1">Vegan</p>
              </div>
              <div>
                <span className="text-3xl font-serif text-veloura-gold">0%</span>
                <p className="text-sm text-veloura-muted mt-1">Sulfates</p>
              </div>
              <div>
                <span className="text-3xl font-serif text-veloura-gold">50+</span>
                <p className="text-sm text-veloura-muted mt-1">Botanicals</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}