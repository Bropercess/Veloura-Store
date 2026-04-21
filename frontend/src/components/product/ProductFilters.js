'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const categories = ['All', 'Shampoo', 'Conditioner', 'Serum', 'Hair Mask', 'Treatment', 'Styling'];
const priceRanges = [
  { label: 'All Prices', min: '', max: '' },
  { label: 'Under $50', min: '0', max: '50' },
  { label: '$50 - $60', min: '50', max: '60' },
  { label: '$60+', min: '60', max: '' },
];

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedPrice, setSelectedPrice] = useState(0);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`/products?${params.toString()}`);
  };

  const handlePriceChange = (index) => {
    setSelectedPrice(index);
    const range = priceRanges[index];
    const params = new URLSearchParams(searchParams);
    if (range.min) params.set('minPrice', range.min);
    else params.delete('minPrice');
    if (range.max) params.set('maxPrice', range.max);
    else params.delete('maxPrice');
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif text-xl mb-4">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`block text-sm w-full text-left py-1 transition-colors ${
                selectedCategory === category
                  ? 'text-veloura-gold font-medium'
                  : 'text-veloura-muted hover:text-veloura-charcoal'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-serif text-xl mb-4">Price</h3>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <button
              key={range.label}
              onClick={() => handlePriceChange(index)}
              className={`block text-sm w-full text-left py-1 transition-colors ${
                selectedPrice === index
                  ? 'text-veloura-gold font-medium'
                  : 'text-veloura-muted hover:text-veloura-charcoal'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}