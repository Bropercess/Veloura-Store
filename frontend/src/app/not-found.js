import Link from 'next/link';
import Container from '@/components/ui/Container';

export default function NotFound() {
  return (
    <div className="py-24 min-h-screen flex items-center">
      <Container className="text-center">
        <h1 className="text-6xl font-serif text-veloura-gold mb-4">404</h1>
        <h2 className="text-2xl font-serif text-veloura-dark mb-4">Page Not Found</h2>
        <p className="text-veloura-muted mb-8">The page you are looking for does not exist.</p>
        <Link href="/" className="btn-primary">
          Return Home
        </Link>
      </Container>
    </div>
  );
}