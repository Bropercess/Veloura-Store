import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer className="bg-veloura-charcoal text-white mt-auto">
      <div className="section-padding py-16">
        <div className="container-veloura grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Logo className="h-6 text-white" />
            <p className="text-sm text-gray-400 leading-relaxed">
              Elevating your hair care ritual with luxury ingredients and timeless elegance.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/products" className="hover:text-veloura-gold transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=Shampoo" className="hover:text-veloura-gold transition-colors">
                  Shampoo
                </Link>
              </li>
              <li>
                <Link href="/products?category=Conditioner" className="hover:text-veloura-gold transition-colors">
                  Conditioner
                </Link>
              </li>
              <li>
                <Link href="/products?category=Serum" className="hover:text-veloura-gold transition-colors">
                  Serum
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-veloura-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-veloura-gold transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-veloura-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe for exclusive offers and hair care tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border border-white/20 px-4 py-2 text-sm w-full focus:outline-none focus:border-veloura-gold"
              />
              <button className="bg-veloura-gold px-4 py-2 text-sm hover:bg-veloura-goldDark transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 section-padding py-6">
        <div className="container-veloura flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2024 Veloura. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}