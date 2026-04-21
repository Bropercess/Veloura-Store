import api from '@/lib/api';
import Container from '@/components/ui/Container';
import ProductDetails from '@/components/product/ProductDetails';
import RelatedProducts from '@/components/product/RelatedProducts';

export async function generateMetadata({ params }) {
  try {
    const { data } = await api.get(`/api/products/${params.slug}`);
    return {
      title: `${data.name} | Veloura`,
      description: data.description,
    };
  } catch {
    return {
      title: 'Product | Veloura',
      description: 'Premium hair care product',
    };
  }
}

export default async function ProductPage({ params }) {
  const { data: product } = await api.get(`/api/products/${params.slug}`);

  const { data: relatedData } = await api.get(`/api/products?category=${product.category}`);
  const relatedProducts = relatedData.products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="py-12 min-h-screen">
      <Container>
        <ProductDetails product={product} />
      </Container>
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}