import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { SemanticSearchBar } from "@/components/products/SemanticSearchBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import ebookTemplate from "@/assets/products/ebook-template.png";
import uiKit from "@/assets/products/ui-kit.png";
import courseBundle from "@/assets/products/course-bundle.png";

const categories = [
  "All",
  "Templates",
  "UI Kits",
  "Courses",
  "Mockups",
  "Fonts",
  "Icons",
];

const allProducts = [
  {
    id: "1",
    title: "Modern E-Book Template",
    slug: "modern-ebook-template",
    description: "A modern, fully editable e-book layout for Notion, Sketch & Figma.",
    price: 2999,
    currency: "INR",
    seller: {
      name: "DesignPro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=designpro",
    },
    image: ebookTemplate,
    badge: "Featured",
    category: "Templates",
    rating: 4.9,
    sales: 342,
  },
  {
    id: "2",
    title: "Premium UI Kit Collection",
    slug: "premium-ui-kit-collection",
    description: "500+ mobile app UI components with dark mode support.",
    price: 4999,
    currency: "INR",
    seller: {
      name: "UIWorks",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=uiworks",
    },
    image: uiKit,
    badge: "New",
    category: "UI Kits",
    rating: 4.8,
    sales: 189,
  },
  {
    id: "3",
    title: "Creative Course Bundle",
    slug: "creative-course-bundle",
    description: "Complete video course bundle for design professionals.",
    price: 7999,
    currency: "INR",
    seller: {
      name: "CodeMaster",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=codemaster",
    },
    image: courseBundle,
    badge: "Bestseller",
    category: "Courses",
    rating: 5.0,
    sales: 567,
  },
  {
    id: "4",
    title: "Minimal Website Template",
    slug: "minimal-website-template",
    description: "Clean and minimal portfolio website template with smooth animations.",
    price: 3499,
    currency: "INR",
    seller: {
      name: "WebCraft",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=webcraft",
    },
    image: ebookTemplate,
    badge: "New",
    category: "Templates",
    rating: 4.7,
    sales: 156,
  },
  {
    id: "5",
    title: "Dashboard UI Components",
    slug: "dashboard-ui-components",
    description: "Premium dashboard components for SaaS applications.",
    price: 5999,
    currency: "INR",
    seller: {
      name: "SaaSDesign",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=saas",
    },
    image: uiKit,
    badge: "Featured",
    category: "UI Kits",
    rating: 4.9,
    sales: 298,
  },
  {
    id: "6",
    title: "Photography Masterclass",
    slug: "photography-masterclass",
    description: "Learn professional photography techniques from industry experts.",
    price: 9999,
    currency: "INR",
    seller: {
      name: "PhotoAcademy",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=photo",
    },
    image: courseBundle,
    badge: "Bestseller",
    category: "Courses",
    rating: 4.8,
    sales: 421,
  },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = allProducts.filter((product) => {
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
                Showing {filteredProducts.length} products
              </p>
              <Button variant="ghost" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
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
            ) : (
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
