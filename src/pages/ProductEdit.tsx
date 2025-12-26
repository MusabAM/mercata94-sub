import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { CURRENCY_CONFIG } from "@/lib/utils";
import { ThumbnailUploader } from "@/components/ThumbnailUploader";
import { ImageUploader } from "@/components/ImageUploader";
import { TagInput } from "@/components/TagInput";
import { FeatureInput } from "@/components/FeatureInput";
import {
    ArrowLeft,
    Save,
    Loader2,
    Eye,
} from "lucide-react";

// Currency options with flags
const CURRENCIES = Object.entries(CURRENCY_CONFIG).map(([code, config]) => ({
    code,
    name: code,
    flag: config.flag,
    symbol: config.symbol,
}));

interface Product {
    id: number;
    title: string;
    slug: string;
    description: string;
    full_description: string;
    price: number;
    currency: string;
    category: string;
    status: string;
    thumbnail_url: string | null;
    images: string[];
    features: string[];
    tags: string[];
}

const ProductEdit = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        full_description: "",
        price: "",
        currency: "USD",
        category: "Templates",
    });
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [productImages, setProductImages] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [features, setFeatures] = useState<string[]>([]);
    const [productSlug, setProductSlug] = useState<string>("");

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;

            try {
                setIsLoading(true);
                const response = await api.get(`/products/edit/${productId}`);
                const product = response.data;

                setFormData({
                    title: product.title || "",
                    description: product.description || "",
                    full_description: product.full_description || "",
                    price: product.price ? (product.price / 100).toString() : "",
                    currency: product.currency || "USD",
                    category: product.category || "Templates",
                });
                setThumbnail(product.thumbnail_url || null);
                setProductImages(product.images || []);
                setTags(product.tags || []);
                setFeatures(product.features || []);
                setProductSlug(product.slug || "");
            } catch (err: any) {
                console.error('Error fetching product:', err);
                setError(err.response?.data?.message || 'Failed to load product');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.price) {
            toast({
                title: "Error",
                description: "Please fill in product title and price.",
                variant: "destructive",
            });
            return;
        }

        setIsSaving(true);

        try {
            await api.put(`/products/${productId}`, {
                title: formData.title,
                description: formData.description,
                full_description: formData.full_description,
                price: parseInt(formData.price) * 100, // Convert to cents
                currency: formData.currency,
                category: formData.category,
                thumbnail_url: thumbnail,
                images: productImages,
                features: features,
                tags: tags,
            });

            toast({
                title: "Product Updated!",
                description: "Your changes have been saved.",
            });

            // Navigate back to dashboard
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Product update error:', error);
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to update product.",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <Layout>
                <section className="min-h-screen pt-28 pb-20 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-champagne" />
                </section>
            </Layout>
        );
    }

    // Error state
    if (error) {
        return (
            <Layout>
                <section className="min-h-screen pt-28 pb-20 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="heading-large mb-4">Error</h1>
                        <p className="text-muted-foreground mb-6">{error}</p>
                        <Button variant="luxury-outline" asChild>
                            <Link to="/dashboard">Back to Dashboard</Link>
                        </Button>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <>
            <Helmet>
                <title>Edit Product — Mercato94</title>
                <meta name="description" content="Edit your product on Mercato94." />
            </Helmet>
            <Layout>
                <section className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-stone/30 to-background">
                    <div className="container-luxury">
                        {/* Header */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Button variant="minimal" size="icon" asChild>
                                        <Link to="/dashboard">
                                            <ArrowLeft className="h-5 w-5" />
                                        </Link>
                                    </Button>
                                    <div>
                                        <h1 className="heading-large">Edit Product</h1>
                                        <p className="text-muted-foreground">
                                            Update your product details
                                        </p>
                                    </div>
                                </div>
                                {productSlug && (
                                    <Button variant="luxury-outline" size="sm" asChild>
                                        <Link to={`/product/${productSlug}`}>
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Product
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Form */}
                        <div className="max-w-2xl mx-auto">
                            <form onSubmit={handleSubmit} className="glass-card-elevated p-8 space-y-6">
                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Product Title *</Label>
                                    <Input
                                        id="title"
                                        placeholder="Modern Portfolio Template"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                {/* Thumbnail */}
                                <div className="space-y-2">
                                    <Label>Thumbnail Image</Label>
                                    <p className="text-xs text-muted-foreground">Main product image shown in listings</p>
                                    <ThumbnailUploader
                                        thumbnail={thumbnail}
                                        onThumbnailChange={setThumbnail}
                                        maxSizeMB={2}
                                    />
                                </div>

                                {/* Gallery Images */}
                                <div className="space-y-2">
                                    <Label>Gallery Images</Label>
                                    <p className="text-xs text-muted-foreground">Additional product screenshots or previews</p>
                                    <ImageUploader
                                        images={productImages}
                                        onImagesChange={setProductImages}
                                        maxImages={5}
                                        maxSizeMB={2}
                                    />
                                </div>

                                {/* Short Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Short Description</Label>
                                    <p className="text-xs text-muted-foreground">Brief summary shown in product cards</p>
                                    <Textarea
                                        id="description"
                                        placeholder="A brief one-liner about your product..."
                                        rows={2}
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Detailed Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="full_description">Detailed Description</Label>
                                    <p className="text-xs text-muted-foreground">Full product description shown on product page</p>
                                    <Textarea
                                        id="full_description"
                                        placeholder="Describe your product in detail..."
                                        rows={6}
                                        value={formData.full_description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, full_description: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Features */}
                                <div className="space-y-2">
                                    <Label>Features</Label>
                                    <p className="text-xs text-muted-foreground">Key features and benefits of your product</p>
                                    <FeatureInput
                                        features={features}
                                        onFeaturesChange={setFeatures}
                                        maxFeatures={10}
                                        placeholder="e.g., Fully responsive design"
                                    />
                                </div>

                                {/* Tags */}
                                <div className="space-y-2">
                                    <Label>Tags</Label>
                                    <p className="text-xs text-muted-foreground">Help buyers find your product</p>
                                    <TagInput
                                        tags={tags}
                                        onTagsChange={setTags}
                                        maxTags={10}
                                        placeholder="e.g., template, portfolio, react"
                                    />
                                </div>

                                {/* Price, Currency, Category */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="price">Price *</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            placeholder="29"
                                            min="1"
                                            value={formData.price}
                                            onChange={(e) =>
                                                setFormData({ ...formData, price: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="currency">Currency</Label>
                                        <select
                                            id="currency"
                                            value={formData.currency}
                                            onChange={(e) =>
                                                setFormData({ ...formData, currency: e.target.value })
                                            }
                                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                                        >
                                            {CURRENCIES.map((currency) => (
                                                <option key={currency.code} value={currency.code}>
                                                    {currency.flag} {currency.code} ({currency.symbol})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <select
                                            id="category"
                                            value={formData.category}
                                            onChange={(e) =>
                                                setFormData({ ...formData, category: e.target.value })
                                            }
                                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                                        >
                                            <option>Templates</option>
                                            <option>UI Kits</option>
                                            <option>Courses</option>
                                            <option>Mockups</option>
                                            <option>Icons</option>
                                            <option>Fonts</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center justify-between pt-6 border-t border-border">
                                    <Button variant="minimal" type="button" asChild>
                                        <Link to="/dashboard">
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Cancel
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="luxury"
                                        type="submit"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4 mr-2" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default ProductEdit;
