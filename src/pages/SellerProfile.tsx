import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import api from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import {
    Shield,
    Package,
    ShoppingBag,
    Calendar,
    Loader2,
    ArrowLeft,
    Star,
    Globe,
    ExternalLink,
} from "lucide-react";

interface Seller {
    display_name: string;
    bio: string | null;
    avatar_url: string | null;
    website: string | null;
    is_verified: boolean;
    member_since: string;
    product_count: number;
    total_sales: number;
}

interface Product {
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
}

const SellerProfile = () => {
    const { displayName } = useParams<{ displayName: string }>();
    const [seller, setSeller] = useState<Seller | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSellerProfile = async () => {
            if (!displayName) return;

            try {
                setIsLoading(true);
                const response = await api.get(`/auth/seller/${encodeURIComponent(displayName)}`);
                setSeller(response.data.seller);
                setProducts(response.data.products);
            } catch (err: any) {
                console.error('Error fetching seller profile:', err);
                setError(err.response?.data?.message || 'Seller not found');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSellerProfile();
    }, [displayName]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-champagne" />
                </div>
            </Layout>
        );
    }

    // Error state
    if (error || !seller) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="heading-large mb-4">Seller Not Found</h1>
                        <p className="text-muted-foreground mb-6">{error}</p>
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
                <title>{seller.display_name} — Seller Profile | Mercato94</title>
                <meta name="description" content={seller.bio || `View products from ${seller.display_name} on Mercato94`} />
            </Helmet>
            <Layout>
                {/* Back Button */}
                <div className="pt-24 pb-4 border-b border-border bg-stone/20">
                    <div className="container-luxury">
                        <Button variant="ghost" size="sm" asChild>
                            <Link to="/products">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Products
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Seller Header */}
                <section className="py-12 bg-gradient-to-b from-stone/30 to-background">
                    <div className="container-luxury">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                            {/* Avatar */}
                            {seller.avatar_url ? (
                                <img
                                    src={seller.avatar_url}
                                    alt={seller.display_name}
                                    className="w-32 h-32 rounded-full bg-secondary object-cover border-4 border-champagne/20"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center border-4 border-champagne/20">
                                    <span className="text-4xl font-serif font-medium text-muted-foreground">
                                        {seller.display_name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="heading-large">{seller.display_name}</h1>
                                    {seller.is_verified && (
                                        <Badge variant="outline" className="bg-champagne/20 text-champagne border-champagne/30">
                                            <Shield className="h-3 w-3 mr-1" />
                                            Verified Seller
                                        </Badge>
                                    )}
                                </div>

                                {seller.bio && (
                                    <p className="text-muted-foreground text-lg mb-4 max-w-2xl">{seller.bio}</p>
                                )}

                                {/* Stats */}
                                <div className="flex flex-wrap gap-6 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Package className="h-4 w-4" />
                                        <span><strong className="text-foreground">{seller.product_count}</strong> Products</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <ShoppingBag className="h-4 w-4" />
                                        <span><strong className="text-foreground">{seller.total_sales}</strong> Sales</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>Member since {formatDate(seller.member_since)}</span>
                                    </div>
                                    {seller.website && (
                                        <a
                                            href={seller.website.startsWith('http') ? seller.website : `https://${seller.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-champagne hover:text-champagne/80 transition-colors"
                                        >
                                            <Globe className="h-4 w-4" />
                                            <span>Website</span>
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section className="section-padding">
                    <div className="container-luxury">
                        <h2 className="heading-medium mb-8">Products by {seller.display_name}</h2>

                        {products.length === 0 ? (
                            <div className="text-center py-16 bg-secondary/20 rounded-xl">
                                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">No products published yet.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <Link
                                        key={product.id}
                                        to={`/products/${product.slug}`}
                                        className="group bg-midnight-light/50 backdrop-blur-xl border border-sapphire/20 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-sapphire hover:border-sapphire/40"
                                    >
                                        {/* Image */}
                                        <div className="aspect-square overflow-hidden bg-midnight">
                                            {product.thumbnail_url || (product.images && product.images[0]) ? (
                                                <img
                                                    src={product.thumbnail_url || product.images[0]}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                    <Package className="h-12 w-12" />
                                                </div>
                                            )}
                                            {product.badge && (
                                                <Badge variant="outline" className="absolute top-4 left-4 bg-champagne/20 text-champagne border-champagne/30">
                                                    {product.badge}
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 space-y-3 bg-midnight-light/30">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-cream/50 tracking-wide uppercase">
                                                    {product.category || "Product"}
                                                </span>
                                                <div className="flex items-center gap-1 text-champagne">
                                                    <Star className="h-3 w-3 fill-current" />
                                                    <span className="text-cream">4.8</span>
                                                </div>
                                            </div>
                                            <h3 className="font-serif text-lg font-medium text-cream group-hover:text-champagne transition-colors">
                                                {product.title}
                                            </h3>
                                            {product.description && (
                                                <p className="text-sm text-cream/50 line-clamp-2">{product.description}</p>
                                            )}
                                            <p className="font-medium text-champagne">
                                                {formatPrice(product.price, product.currency)}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default SellerProfile;
