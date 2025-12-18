import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Shield,
  Download,
  Clock,
  Check,
  ChevronRight,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import ebookTemplate from "@/assets/products/ebook-template.png";
import uiKit from "@/assets/products/ui-kit.png";
import courseBundle from "@/assets/products/course-bundle.png";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const products: Record<string, any> = {
  "modern-ebook-template": {
    id: "1",
    title: "Modern E-Book Template",
    slug: "modern-ebook-template",
    description:
      "A modern, fully editable e-book layout perfect for authors, coaches, and content creators. This template includes 50+ unique pages designed in Figma, Sketch, and Notion formats.",
    fullDescription: `
      Create stunning e-books with our professionally designed template. Perfect for:
      • Authors publishing digital books
      • Coaches creating course materials
      • Marketers building lead magnets
      • Content creators monetizing their knowledge
      
      The template includes chapter layouts, content pages, callout boxes, image galleries, and more. All elements are fully customizable to match your brand.
    `,
    price: 2999,
    currency: "INR",
    seller: {
      name: "DesignPro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=designpro",
      verified: true,
      products: 24,
      sales: 1200,
    },
    images: [ebookTemplate],
    badge: "Featured",
    category: "Templates",
    rating: 4.9,
    sales: 342,
    reviews: 128,
    reviewsData: [
        {
            id: 1,
            author: "Alice",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
            rating: 5,
            comment: "This template is amazing! Saved me so much time and the design is top-notch.",
            date: "2 weeks ago"
        },
        {
            id: 2,
            author: "Bob",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
            rating: 4,
            comment: "Great starting point for my e-book. A few more color options would have been nice, but overall very happy with it.",
            date: "1 month ago"
        }
    ],
    includes: [
      "50+ Unique Page Layouts",
      "Figma, Sketch & Notion Files",
      "Free Updates",
      "Commercial License",
      "24/7 Support",
    ],
    tags: ["ebook", "template", "figma", "notion", "design"],
  },
  "premium-ui-kit-collection": {
    id: "2",
    title: "Premium UI Kit Collection",
    slug: "premium-ui-kit-collection",
    description:
      "500+ mobile app UI components with dark mode support. Built with auto-layout in Figma for easy customization.",
    fullDescription: `
      The ultimate UI kit for mobile app designers. Includes:
      • 500+ unique components
      • Dark & light mode variants
      • Auto-layout support
      • iOS & Android guidelines compliance
      • Design system documentation
      
      Save hundreds of hours with pre-built components for login flows, dashboards, e-commerce, social features, and more.
    `,
    price: 4999,
    currency: "INR",
    seller: {
      name: "UIWorks",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=uiworks",
      verified: true,
      products: 18,
      sales: 890,
    },
    images: [uiKit],
    badge: "New",
    category: "UI Kits",
    rating: 4.8,
    sales: 189,
    reviews: 67,
    reviewsData: [
        {
            id: 1,
            author: "Charlie",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=charlie",
            rating: 5,
            comment: "Absolutely essential for any Figma designer. The components are well-organized and easy to adapt.",
            date: "3 days ago"
        }
    ],
    includes: [
      "500+ UI Components",
      "Dark & Light Modes",
      "Figma Source Files",
      "Design Tokens",
      "Lifetime Updates",
    ],
    tags: ["ui-kit", "mobile", "figma", "components", "design-system"],
  },
  "creative-course-bundle": {
    id: "3",
    title: "Creative Course Bundle",
    slug: "creative-course-bundle",
    description:
      "Complete video course bundle for design professionals. Learn UI/UX design, branding, and product design from industry experts.",
    fullDescription: `
      Master creative design with our comprehensive course bundle:
      • 40+ hours of video content
      • Project-based learning
      • Industry expert instructors
      • Certificate of completion
      • Private community access
      
      Courses include UI/UX fundamentals, advanced Figma techniques, branding masterclass, and portfolio building.
    `,
    price: 7999,
    currency: "INR",
    seller: {
      name: "CodeMaster",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=codemaster",
      verified: true,
      products: 12,
      sales: 2100,
    },
    images: [courseBundle],
    badge: "Bestseller",
    category: "Courses",
    rating: 5.0,
    sales: 567,
    reviews: 234,
    reviewsData: [],
    includes: [
      "40+ Hours of Content",
      "Project Files",
      "Certificate",
      "Community Access",
      "Lifetime Access",
    ],
    tags: ["course", "design", "ui-ux", "learning", "professional"],
  },
};

const ProductDetailSkeleton = () => {
    return (
      <Layout>
        {/* Breadcrumb skeleton */}
        <nav className="pt-24 pb-4 border-b border-border bg-stone/20">
          <div className="container-luxury">
            <div className="flex items-center gap-2 text-sm">
              <Skeleton className="h-4 w-16" />
              <ChevronRight className="h-4 w-4 text-muted" />
              <Skeleton className="h-4 w-20" />
              <ChevronRight className="h-4 w-4 text-muted" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </nav>
  
        {/* Product content skeleton */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left - Image skeleton */}
              <div className="space-y-4">
                <Skeleton className="aspect-square rounded-xl" />
              </div>
  
              {/* Right - Info skeleton */}
              <div className="space-y-8">
                {/* Header skeleton */}
                <div className="space-y-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-6 w-4/5" />
                </div>
  
                {/* Rating & Stats skeleton */}
                <div className="flex items-center gap-6 py-4 border-y border-border">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-20" />
                </div>
  
                {/* Price & CTA skeleton */}
                <div className="space-y-4">
                  <Skeleton className="h-10 w-40" />
                  <div className="flex gap-3">
                    <Skeleton className="h-14 flex-1" />
                    <Skeleton className="h-14 w-14" />
                    <Skeleton className="h-14 w-14" />
                  </div>
                </div>
  
                {/* What's included skeleton */}
                <div className="space-y-4 p-6 rounded-xl bg-secondary/30">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
  
                {/* Seller info skeleton */}
                <div className="flex items-center justify-between p-6 rounded-xl border border-border">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-24 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  };

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const addItem = useCartStore((state) => state.addItem);
  
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // Simulate fetching data from a backend
    setTimeout(() => {
      const productData = slug ? products[slug] : null;
      setProduct(productData);
      setLoading(false);
    }, 1500); // 1.5-second delay to showcase the skeleton
  }, [slug]);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const itemToAdd = {
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.images[0],
    };
    
    addItem(itemToAdd);
    
    toast.success("Added to cart", {
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    const newWishlistedState = !isWishlisted;
    setIsWishlisted(newWishlistedState);
    toast.success(newWishlistedState ? "Added to wishlist" : "Removed from wishlist", {
      description: `${product.title} has been ${newWishlistedState ? "added to" : "removed from"} your wishlist.`,
    });
  };
  
  const handleShare = () => {
    if (!product) return;
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied!", {
        description: "Product link copied to your clipboard.",
      });
    });
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-large mb-4">Product Not Found</h1>
            <Button variant="luxury-outline" asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.title} — Mercato94</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: product.images[0],
            offers: {
              "@type": "Offer",
              price: product.price / 100,
              priceCurrency: product.currency,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviews,
            },
          })}
        </script>
      </Helmet>
      <Layout>
        {/* Breadcrumb */}
        <nav className="pt-24 pb-4 border-b border-border bg-stone/20">
          <div className="container-luxury">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                to="/products"
                className="hover:text-foreground transition-colors"
              >
                Products
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{product.title}</span>
            </div>
          </div>
        </nav>

        {/* Product content */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left - Images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-stone">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.badge && (
                  <Badge
                    variant="outline"
                    className="bg-champagne/20 text-foreground border-champagne/30"
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Right - Info */}
              <div className="space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <span className="text-sm text-muted-foreground tracking-widest uppercase">
                    {product.category}
                  </span>
                  <h1 className="heading-large">{product.title}</h1>
                  <p className="text-muted-foreground text-lg">
                    {product.description}
                  </p>
                </div>

                {/* Rating & Stats */}
                <div className="flex items-center gap-6 py-4 border-y border-border">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "text-champagne fill-current"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-muted-foreground">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {product.sales} sales
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif font-medium">
                      {formatPrice(product.price, product.currency)}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="luxury"
                      size="xl"
                      className="flex-1"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="luxury-outline" size="icon" className="h-14 w-14" onClick={handleAddToWishlist}>
                      <Heart 
                        className={`h-5 w-5 transition-colors ${isWishlisted ? "text-red-500" : "text-foreground"}`}
                        fill={isWishlisted ? "currentColor" : "none"}
                      />
                    </Button>
                    <Button variant="luxury-outline" size="icon" className="h-14 w-14" onClick={handleShare}>
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* What's included */}
                <div className="space-y-4 p-6 rounded-xl bg-secondary/30">
                  <h3 className="font-medium">What's Included</h3>
                  <ul className="space-y-3">
                    {product.includes.map((item: string) => (
                      <li key={item} className="flex items-center gap-3 text-sm">
                        <Check className="h-4 w-4 text-champagne" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Seller info */}
                <div className="flex items-center justify-between p-6 rounded-xl border border-border">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.seller.avatar}
                      alt={product.seller.name}
                      className="w-12 h-12 rounded-full bg-secondary"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{product.seller.name}</span>
                        {product.seller.verified && (
                          <Shield className="h-4 w-4 text-champagne" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {product.seller.products} products · {product.seller.sales}{" "}
                        sales
                      </p>
                    </div>
                  </div>
                  <Button variant="luxury-outline" size="sm">
                    View Profile
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Secure Payment
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Instant Download
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    24/7 Support
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-16 pt-16 border-t border-border">
              <h2 className="heading-medium mb-6">Description</h2>
              <div className="prose prose-neutral max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-muted-foreground">
                  {product.fullDescription}
                </pre>
              </div>
            </div>
            
            {/* Reviews Section */}
            {product.reviewsData && product.reviewsData.length > 0 && (
                <div className="mt-16 pt-16 border-t border-border">
                <h2 className="heading-medium mb-6">Reviews ({product.reviews})</h2>
                <div className="space-y-8">
                    {product.reviewsData.map((review: any) => (
                    <div key={review.id} className="flex gap-4">
                        <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-12 h-12 rounded-full bg-secondary"
                        />
                        <div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{review.author}</span>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${
                                i < review.rating
                                    ? "text-champagne fill-current"
                                    : "text-muted"
                                }`}
                            />
                            ))}
                        </div>
                        <p className="mt-2 text-muted-foreground">{review.comment}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            )}

            {/* Tags */}
            <div className="mt-12 flex items-center gap-3 flex-wrap">
              <span className="text-sm text-muted-foreground">Tags:</span>
              {product.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ProductDetail;
