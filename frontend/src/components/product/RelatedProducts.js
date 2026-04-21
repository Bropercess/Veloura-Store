import ProductCard from './ProductCard';
import Container from '@/components/ui/Container';

export default function RelatedProducts({ products }) {
  if (!products?.length) return null;

  return (
    <section className="py-16 border-t border-veloura-sand">
      <Container>
        <h2 className="text-3xl font-serif text-veloura-dark mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}