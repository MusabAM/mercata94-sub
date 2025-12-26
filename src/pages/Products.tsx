import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { SemanticSearchBar } from "@/components/products/SemanticSearchBar";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import api from "@/lib/api";

const categories = [
  "All",
  "Templates",
  "UI Kits",
  "Courses",
  "Mockups",
  "Fonts",
  "Icons",
];

interface BackendProduct {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  currency: string;
  category: string | null;
  badge: string | null;
  thumbnail_url: string | null;
  images: string[];
  seller_name: string;
  seller_avatar: string | null;
}

// Map backend product to ProductCard format
const mapProduct = (product: BackendProduct) => ({
  id: product.id.toString(),
  title: product.title,
  slug: product.slug,
  description: product.description || "Premium digital product",
  price: product.price,
  currency: product.currency || "USD",
  seller: {
    name: product.seller_name || "Seller",
    avatar: product.seller_avatar || "", // Empty string triggers default icon in ProductCard
  },
  image: product.thumbnail_url || (product.images && product.images[0]) || "",
  badge: product.badge || undefined,
  category: product.category || "Templates",
  rating: 4.8, // Placeholder - can be computed from reviews later
  sales: 0, // Placeholder - can be fetched from orders later
});

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<ReturnType<typeof mapProduct>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/products');
        const mappedProducts = response.data.map(mapProduct);
        setProducts(mappedProducts);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.response?.data?.message || 'Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Browse Products — Mercato94</title>
        <meta
          name="description"
          content="Explore our curated collection of premium digital products. Templates, UI kits, courses, and more from verified creators."
        />
      </Helmet>
      <Layout>
        {/* Hero section */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-stone/30 to-background">
          <div className="container-luxury">
            <div className="max-w-2xl">
              <h1 className="heading-large mb-4">Browse Products</h1>
              <p className="text-muted-foreground text-lg">
                Discover premium digital products from our curated marketplace.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border sticky top-20 z-40 bg-background/80 backdrop-blur-xl">
          <div className="container-luxury">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* AI-Powered Search */}
              <SemanticSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                className="w-full md:w-96"
              />

              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products grid */}
        <section className="section-padding">
          <div className="container-luxury">
            {/* Results info */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                {isLoading ? "Loading..." : `Showing ${filteredProducts.length} products`}
              </p>
              <Button variant="ghost" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-champagne" />
              </div>
            )}

            {/* Error state */}
            {error && !isLoading && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">{error}</p>
                <Button
                  variant="luxury-outline"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            )}

            {/* Grid */}
            {!isLoading && !error && filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className={`animate-fade-up`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  />
                ))}
              </div>
            ) : !isLoading && !error && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">
                  No products found
                </p>
                <Button
                  variant="luxury-outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Products;
