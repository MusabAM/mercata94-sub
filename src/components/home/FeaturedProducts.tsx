
import { products } from '@/data/products';
import ProductCard from '../ProductCard';

export default function FeaturedProducts() {
  const featuredProducts = products.filter((product) => product.isFeatured);

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
