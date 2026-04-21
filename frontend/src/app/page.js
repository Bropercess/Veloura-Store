import HeroBanner from '@/components/home/HeroBanner';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BrandStory from '@/components/home/BrandStory';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedProducts />
      <BrandStory />
      <Newsletter />
    </>
  );
}