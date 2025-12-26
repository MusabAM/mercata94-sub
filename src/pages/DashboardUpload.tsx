import { useState, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { CURRENCY_CONFIG } from "@/lib/utils";
import { ThumbnailUploader } from "@/components/ThumbnailUploader";
import { ImageUploader } from "@/components/ImageUploader";
import { TagInput } from "@/components/TagInput";
import { FeatureInput } from "@/components/FeatureInput";
import {
    Upload,
    Check,
    ArrowLeft,
    Sparkles,
    Wand2,
    Loader2,
} from "lucide-react";

// Currency options with flags
const CURRENCIES = Object.entries(CURRENCY_CONFIG).map(([code, config]) => ({
    code,
    name: code,
    flag: config.flag,
    symbol: config.symbol,
}));

const DashboardUpload = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        full_description: "",
        price: "",
        currency: "USD",
        category: "Templates",
    });
    const [productFile, setProductFile] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [productImages, setProductImages] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [features, setFeatures] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [aiGenerating, setAiGenerating] = useState(false);

    // Redirect if not a seller/admin
    if (user && user.role !== 'seller' && user.role !== 'admin') {
        return (
            <Layout>
                <section className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-stone/30 to-background">
                    <div className="container-luxury text-center">
                        <h1 className="heading-large mb-4">Access Denied</h1>
                        <p className="text-muted-foreground mb-8">
                            Only sellers can upload products. Please complete seller onboarding first.
                        </p>
                        <Button variant="luxury" asChild>
                            <Link to="/sell/onboarding">Become a Seller</Link>
                        </Button>
                    </div>
                </section>
            </Layout>
        );
    }

    // Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 100 * 1024 * 1024) {
                setUploadError("File size must be less than 100MB");
                return;
            }
            setProductFile(file);
            setUploadError(null);
        }
    };

    // Handle drag and drop
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            if (file.size > 100 * 1024 * 1024) {
                setUploadError("File size must be less than 100MB");
                return;
            }
            setProductFile(file);
            setUploadError(null);
        }
    };

    // Generate AI description
    const handleAIDescription = () => {
        if (!formData.title) {
            setUploadError("Enter a title first to generate a description");
            return;
        }
        setAiGenerating(true);
        setTimeout(() => {
            setFormData({
                ...formData,
                description: `A meticulously crafted ${formData.category.toLowerCase()} designed for modern creators.`,
                full_description: `${formData.title} is a premium ${formData.category.toLowerCase()} designed for modern creators and professionals.\n\nThis product features high-quality assets, fully customizable layouts, and comprehensive documentation. Perfect for professionals seeking premium quality and attention to detail.\n\nWhat's included:\n• All source files\n• Documentation\n• Free updates\n• Premium support`,
            });
            setAiGenerating(false);
        }, 1500);
    };

    // Create product via API
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!productFile) {
            setUploadError("Please select a product file to upload");
            return;
        }

        if (!formData.title || !formData.price) {
            setUploadError("Please fill in product title and price");
            return;
        }

        setIsUploading(true);
        setUploadError(null);

        try {
            // Step 1: Get signed upload URL from backend
            const urlResponse = await api.post('/products/upload-url', {
                fileName: productFile.name
            });
            const { uploadUrl, fileKey } = urlResponse.data;

            // Step 2: Upload file directly to R2 using signed URL
            await fetch(uploadUrl, {
                method: 'PUT',
                body: productFile,
                headers: {
                    'Content-Type': 'application/octet-stream'
                }
            });

            // Step 3: Create product in database
            await api.post('/products', {
                title: formData.title,
                description: formData.description,
                full_description: formData.full_description,
                price: parseInt(formData.price) * 100, // Convert to cents
                currency: formData.currency,
                category: formData.category,
                fileKey,
                thumbnail_url: thumbnail,
                images: productImages,
                features: features,
                tags: tags
            });

            toast({
                title: "Product Created!",
                description: "Your product has been submitted for admin review.",
            });

            // Navigate back to dashboard
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Product creation error:', error);
            setUploadError(
                error.response?.data?.message || "Failed to create product. Please try again."
            );
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Upload Product — Mercato94</title>
                <meta
                    name="description"
                    content="Upload and publish your digital product on Mercato94."
                />
            </Helmet>
            <Layout>
                <section className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-stone/30 to-background">
                    <div className="container-luxury">
                        {/* Header */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="flex items-center gap-4">
                                <Button variant="minimal" size="icon" asChild>
                                    <Link to="/dashboard">
                                        <ArrowLeft className="h-5 w-5" />
                                    </Link>
                                </Button>
                                <div>
                                    <h1 className="heading-large">Upload Product</h1>
                                    <p className="text-muted-foreground">
                                        Add a new product to your store
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="max-w-2xl mx-auto">
                            <form onSubmit={handleSubmit} className="glass-card-elevated p-8 space-y-6">
                                {/* AI Tools Banner */}
                                <div className="glass-card p-4 border-champagne/20">
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="h-5 w-5 text-champagne" />
                                        <p className="text-sm">
                                            <span className="font-medium">AI Tools Available:</span>{" "}
                                            Auto-descriptions and smart pricing suggestions
                                        </p>
                                    </div>
                                </div>

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
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="description">Short Description</Label>
                                            <p className="text-xs text-muted-foreground">Brief summary shown in product cards</p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="minimal"
                                            size="sm"
                                            onClick={handleAIDescription}
                                            disabled={aiGenerating}
                                        >
                                            <Wand2 className="h-4 w-4 mr-1" />
                                            {aiGenerating ? "Generating..." : "AI Write"}
                                        </Button>
                                    </div>
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
                                        placeholder="Describe your product in detail. What's included? Who is it for? What problems does it solve?"
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

                                {/* File Upload Area */}
                                <div className="space-y-2">
                                    <Label>Product File *</Label>
                                    <p className="text-xs text-muted-foreground">The downloadable file buyers will receive</p>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                        className="hidden"
                                        accept=".zip,.pdf,.rar,.7z"
                                    />
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        onDrop={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${productFile
                                            ? "border-champagne bg-champagne/5"
                                            : "border-border hover:border-champagne/50"
                                            }`}
                                    >
                                        {productFile ? (
                                            <>
                                                <Check className="h-8 w-8 mx-auto text-champagne mb-3" />
                                                <p className="text-sm font-medium text-champagne">
                                                    {productFile.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {(productFile.size / (1024 * 1024)).toFixed(2)} MB — Click to change
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                                                <p className="text-sm font-medium">
                                                    Drag & drop your files here
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    ZIP, PDF, or individual files up to 100MB
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    {uploadError && (
                                        <p className="text-sm text-red-500 mt-2">{uploadError}</p>
                                    )}
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
                                        disabled={isUploading}
                                    >
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="h-4 w-4 mr-2" />
                                                Publish Product
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

export default DashboardUpload;
