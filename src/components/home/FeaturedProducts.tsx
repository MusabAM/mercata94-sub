import { Link } from "react-router-dom";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ebookTemplate from "@/assets/products/ebook-template.png";
import uiKit from "@/assets/products/ui-kit.png";
import courseBundle from "@/assets/products/course-bundle.png";

const featuredProducts = [
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
];

export function FeaturedProducts() {
  return (
    <section className="section-padding bg-midnight-light relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sapphire/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-champagne/5 rounded-full blur-[100px]" />
      
      <div className="container-luxury relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-xs tracking-widest uppercase text-champagne">
              Handpicked Collection
            </span>
            <h2 className="heading-large text-cream">Featured Products</h2>
            <p className="text-cream/60 max-w-md">
              Discover our curated selection of premium digital products from top creators.
            </p>
          </div>
          <Button variant="champagne-outline" asChild className="group">
            <Link to="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              className={`animate-fade-up delay-${(index + 1) * 100}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}