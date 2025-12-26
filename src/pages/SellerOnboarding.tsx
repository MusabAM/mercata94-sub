import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { ThumbnailUploader } from "@/components/ThumbnailUploader";
import { ImageUploader } from "@/components/ImageUploader";
import { TagInput } from "@/components/TagInput";
import { FeatureInput } from "@/components/FeatureInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User,
  CreditCard,
  Upload,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Wand2,
  DollarSign,
  Image,
  Loader2,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

const steps = [
  { id: 1, title: "Profile", icon: User },
  { id: 2, title: "Payout", icon: CreditCard },
  { id: 3, title: "Upload", icon: Upload },
  { id: 4, title: "Complete", icon: Check },
];

// Currency options with flags
const CURRENCIES = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", symbol: "$" },
  { code: "EUR", name: "Euro", flag: "🇪🇺", symbol: "€" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", symbol: "£" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳", symbol: "₹" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", symbol: "د.إ" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", symbol: "¥" },
];

const SellerOnboarding = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, refreshUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    website: "",
    productTitle: "",
    productDescription: "",
    productFullDescription: "",
    productPrice: "",
    productCategory: "Templates",
    productCurrency: "USD",
  });
  const [aiGenerating, setAiGenerating] = useState(false);
  const [productFile, setProductFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Stripe Connect state
  const [stripeStatus, setStripeStatus] = useState<{
    connected: boolean;
    chargesEnabled: boolean;
    payoutsEnabled: boolean;
    detailsSubmitted: boolean;
  } | null>(null);
  const [isLoadingStripe, setIsLoadingStripe] = useState(false);
  const [isConnectingStripe, setIsConnectingStripe] = useState(false);

  // Password confirmation state for seller upgrade
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpgrading, setIsUpgrading] = useState(false);

  // Fetch existing profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoadingProfile(true);
        const response = await api.get('/auth/me');
        const profile = response.data;
        setFormData(prev => ({
          ...prev,
          displayName: profile.display_name || profile.name || '',
          bio: profile.bio || '',
          website: profile.website || '',
        }));
      } catch (err: any) {
        console.error('Error fetching profile:', err);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  // Check Stripe connection status
  const checkStripeStatus = async () => {
    setIsLoadingStripe(true);
    try {
      const response = await api.get('/stripe/connect/status');
      setStripeStatus(response.data);
    } catch (err: any) {
      console.error('Error checking Stripe status:', err);
      setStripeStatus({
        connected: false,
        chargesEnabled: false,
        payoutsEnabled: false,
        detailsSubmitted: false,
      });
    } finally {
      setIsLoadingStripe(false);
    }
  };

  // Handle Stripe return URL parameters
  useEffect(() => {
    const stripeSuccess = searchParams.get('stripe_success');
    const refresh = searchParams.get('refresh');

    if (stripeSuccess === 'true') {
      // Returned from Stripe onboarding
      setCurrentStep(2);
      checkStripeStatus();
      toast({
        title: "Stripe Connected!",
        description: "Your payout account has been set up successfully.",
      });
      // Clear the URL params
      setSearchParams({});
    } else if (refresh === 'true') {
      // User's onboarding link expired, they want to retry
      setCurrentStep(2);
      toast({
        title: "Session Expired",
        description: "Please click the button to continue connecting your Stripe account.",
        variant: "destructive",
      });
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  // Check Stripe status on step 2
  useEffect(() => {
    if (currentStep === 2 && !stripeStatus) {
      checkStripeStatus();
    }
  }, [currentStep, stripeStatus]);

  // Connect with Stripe handler
  const handleConnectStripe = async () => {
    setIsConnectingStripe(true);
    try {
      const response = await api.post('/stripe/connect/create-account');
      const { onboardingUrl } = response.data;
      // Redirect to Stripe's hosted onboarding
      window.location.href = onboardingUrl;
    } catch (err: any) {
      console.error('Error connecting Stripe:', err);
      toast({
        title: "Connection Failed",
        description: err.response?.data?.message || "Failed to start Stripe onboarding.",
        variant: "destructive",
      });
      setIsConnectingStripe(false);
    }
  };

  // Refresh Stripe onboarding link
  const handleRefreshStripeLink = async () => {
    setIsConnectingStripe(true);
    try {
      const response = await api.post('/stripe/connect/refresh-link');
      const { onboardingUrl } = response.data;
      window.location.href = onboardingUrl;
    } catch (err: any) {
      console.error('Error refreshing Stripe link:', err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to refresh onboarding link.",
        variant: "destructive",
      });
      setIsConnectingStripe(false);
    }
  };

  // Save profile to database
  const saveProfile = async () => {
    if (!formData.displayName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a display name.",
        variant: "destructive",
      });
      return false;
    }

    setIsSavingProfile(true);
    try {
      await api.put('/auth/profile', {
        display_name: formData.displayName.trim(),
        bio: formData.bio.trim(),
        website: formData.website.trim() || null,
      });
      toast({
        title: "Profile Saved",
        description: "Your seller profile has been updated.",
      });
      return true;
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to save profile.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (100MB max)
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

  // Create product via API
  const handleCreateProduct = async () => {
    if (!productFile) {
      setUploadError("Please select a product file to upload");
      return;
    }

    if (!formData.productTitle || !formData.productPrice) {
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
        title: formData.productTitle,
        description: formData.productDescription,
        full_description: formData.productFullDescription,
        price: parseInt(formData.productPrice) * 100, // Convert to cents
        currency: formData.productCurrency,
        category: formData.productCategory,
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

      // Move to completion step
      setCurrentStep(4);
    } catch (error: any) {
      console.error('Product creation error:', error);
      setUploadError(
        error.response?.data?.message || "Failed to create product. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleNext = async () => {
    // On step 1, show password confirmation dialog for buyer -> seller upgrade
    if (currentStep === 1) {
      if (!formData.displayName.trim()) {
        toast({
          title: "Error",
          description: "Please enter a display name.",
          variant: "destructive",
        });
        return;
      }
      // If user is already a seller, just save profile and proceed
      if (user?.role === 'seller' || user?.role === 'admin') {
        const saved = await saveProfile();
        if (saved) setCurrentStep(2);
        return;
      }
      // Show password confirmation dialog for role upgrade
      setShowPasswordDialog(true);
      return;
    }
    // On step 3, trigger product creation instead of just advancing
    if (currentStep === 3) {
      handleCreateProduct();
      return;
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle seller upgrade with password confirmation
  const handleUpgradeToSeller = async () => {
    if (!confirmPassword) {
      toast({
        title: "Error",
        description: "Please enter your password to confirm.",
        variant: "destructive",
      });
      return;
    }

    setIsUpgrading(true);
    try {
      const response = await api.post('/auth/upgrade-to-seller', {
        password: confirmPassword,
        display_name: formData.displayName.trim(),
        bio: formData.bio.trim(),
      });

      // Refresh user data in context
      await refreshUser();

      toast({
        title: "Welcome, Seller!",
        description: "Your account has been upgraded to a seller account.",
      });

      setShowPasswordDialog(false);
      setConfirmPassword("");
      setCurrentStep(2);
    } catch (err: any) {
      toast({
        title: "Upgrade Failed",
        description: err.response?.data?.message || "Failed to upgrade account.",
        variant: "destructive",
      });
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAIDescription = () => {
    setAiGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setFormData({
        ...formData,
        productDescription:
          "A meticulously crafted digital product designed for modern creators. Features include high-resolution assets, fully customizable layouts, and comprehensive documentation. Perfect for professionals seeking premium quality and attention to detail.",
      });
      setAiGenerating(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Seller Onboarding — Mercato94</title>
        <meta
          name="description"
          content="Complete your seller profile and start selling on Mercato94. Easy 4-step setup process."
        />
      </Helmet>
      <Layout>
        <section className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-stone/30 to-background">
          <div className="container-luxury">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="heading-large mb-3">Become a Seller</h1>
              <p className="text-muted-foreground">
                Complete these steps to start selling your digital products
              </p>
            </div>

            {/* Progress Steps */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step.id
                          ? "bg-champagne text-foreground"
                          : "bg-secondary text-muted-foreground"
                          }`}
                      >
                        {currentStep > step.id ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </div>
                      <span
                        className={`text-xs mt-2 ${currentStep >= step.id
                          ? "text-foreground"
                          : "text-muted-foreground"
                          }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-24 md:w-32 h-px mx-4 transition-colors ${currentStep > step.id
                          ? "bg-champagne"
                          : "bg-border"
                          }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="max-w-2xl mx-auto">
              <div className="glass-card-elevated p-8">
                {/* Step 1: Profile */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h2 className="font-serif text-2xl font-medium mb-2">
                        Create Your Seller Profile
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        Tell buyers about yourself and your brand.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input
                          id="displayName"
                          placeholder="Your brand or studio name"
                          value={formData.displayName}
                          onChange={(e) =>
                            setFormData({ ...formData, displayName: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell buyers about your work and expertise..."
                          rows={4}
                          value={formData.bio}
                          onChange={(e) =>
                            setFormData({ ...formData, bio: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website (optional)</Label>
                        <Input
                          id="website"
                          type="url"
                          placeholder="https://yoursite.com"
                          value={formData.website}
                          onChange={(e) =>
                            setFormData({ ...formData, website: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Payout */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h2 className="font-serif text-2xl font-medium mb-2">
                        Set Up Payouts
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        Connect your account to receive payments securely via Stripe.
                      </p>
                    </div>

                    {/* Commission Info */}
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-champagne/10 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-champagne" />
                        </div>
                        <div>
                          <p className="font-medium">Platform Commission: 12%</p>
                          <p className="text-sm text-muted-foreground">
                            You keep 88% of every sale
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1 border-t border-border pt-4">
                        <div className="flex justify-between">
                          <span>Example sale price:</span>
                          <span>$100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Platform fee (12%):</span>
                          <span className="text-taupe">-$12</span>
                        </div>
                        <div className="flex justify-between font-medium pt-2 border-t border-border">
                          <span>Your earnings:</span>
                          <span className="text-champagne">$88</span>
                        </div>
                      </div>
                    </div>

                    {/* Stripe Connection Status */}
                    {isLoadingStripe ? (
                      <div className="glass-card p-6 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-champagne mr-3" />
                        <span className="text-muted-foreground">Checking connection status...</span>
                      </div>
                    ) : stripeStatus?.connected && stripeStatus?.detailsSubmitted ? (
                      // Connected state
                      <div className="glass-card p-6 border-green-500/30 bg-green-500/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium text-green-600">Stripe Connected</p>
                            <p className="text-sm text-muted-foreground">
                              Your payout account is ready to receive payments
                            </p>
                          </div>
                        </div>
                        {stripeStatus.chargesEnabled && stripeStatus.payoutsEnabled && (
                          <div className="mt-4 flex gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" /> Charges enabled
                            </span>
                            <span className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" /> Payouts enabled
                            </span>
                          </div>
                        )}
                        <Button
                          variant="luxury-outline"
                          size="sm"
                          className="mt-4 w-full"
                          onClick={async () => {
                            try {
                              const response = await api.post('/stripe/connect/dashboard-link');
                              window.open(response.data.dashboardUrl, '_blank');
                            } catch (err: any) {
                              toast({
                                title: "Error",
                                description: err.response?.data?.message || "Failed to open Stripe dashboard.",
                                variant: "destructive",
                              });
                            }
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Manage Stripe Account
                        </Button>
                      </div>
                    ) : stripeStatus?.connected && !stripeStatus?.detailsSubmitted ? (
                      // Partially connected - needs to complete onboarding
                      <div className="glass-card p-6 border-yellow-500/30 bg-yellow-500/5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                            <RefreshCw className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-medium text-yellow-600">Onboarding Incomplete</p>
                            <p className="text-sm text-muted-foreground">
                              Please complete your Stripe account setup
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="luxury"
                          size="lg"
                          className="w-full"
                          onClick={handleRefreshStripeLink}
                          disabled={isConnectingStripe}
                        >
                          {isConnectingStripe ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Redirecting...
                            </>
                          ) : (
                            <>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Continue Stripe Setup
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      // Not connected state
                      <>
                        <Button
                          variant="luxury-outline"
                          size="lg"
                          className="w-full"
                          onClick={handleConnectStripe}
                          disabled={isConnectingStripe}
                        >
                          {isConnectingStripe ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Connecting...
                            </>
                          ) : (
                            <>
                              <CreditCard className="h-4 w-4 mr-2" />
                              Connect with Stripe
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                          Secure payment processing powered by Stripe. Your banking details
                          are never stored on our servers.
                        </p>
                      </>
                    )}

                    {/* Skip option for optional connection */}
                    {!stripeStatus?.connected && (
                      <p className="text-xs text-muted-foreground text-center pt-2">
                        You can also skip this step and connect your account later from your dashboard.
                      </p>
                    )}
                  </div>
                )}

                {/* Step 3: Upload */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h2 className="font-serif text-2xl font-medium mb-2">
                        Upload Your First Product
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        Add your product details. AI tools can help you create better
                        listings.
                      </p>
                    </div>

                    {/* AI Tools Banner */}
                    <div className="glass-card p-4 border-champagne/20">
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-champagne" />
                        <p className="text-sm">
                          <span className="font-medium">AI Tools Available:</span>{" "}
                          Auto-descriptions, smart pricing, and mockup generation
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="productTitle">Product Title</Label>
                        <Input
                          id="productTitle"
                          placeholder="Modern Portfolio Template"
                          value={formData.productTitle}
                          onChange={(e) =>
                            setFormData({ ...formData, productTitle: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="productDescription">Short Description</Label>
                            <p className="text-xs text-muted-foreground">Brief summary for product cards</p>
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
                          id="productDescription"
                          placeholder="A brief one-liner about your product..."
                          rows={2}
                          value={formData.productDescription}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              productDescription: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* Full Description */}
                      <div className="space-y-2">
                        <Label htmlFor="productFullDescription">Detailed Description</Label>
                        <p className="text-xs text-muted-foreground">Full description for product page</p>
                        <Textarea
                          id="productFullDescription"
                          placeholder="Describe your product in detail..."
                          rows={4}
                          value={formData.productFullDescription}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              productFullDescription: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* Thumbnail */}
                      <div className="space-y-2">
                        <Label>Thumbnail Image</Label>
                        <p className="text-xs text-muted-foreground">Main product image for listings</p>
                        <ThumbnailUploader
                          thumbnail={thumbnail}
                          onThumbnailChange={setThumbnail}
                          maxSizeMB={2}
                        />
                      </div>

                      {/* Gallery Images */}
                      <div className="space-y-2">
                        <Label>Gallery Images</Label>
                        <p className="text-xs text-muted-foreground">Additional product screenshots</p>
                        <ImageUploader
                          images={productImages}
                          onImagesChange={setProductImages}
                          maxImages={5}
                          maxSizeMB={2}
                        />
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        <Label>Features</Label>
                        <FeatureInput
                          features={features}
                          onFeaturesChange={setFeatures}
                          maxFeatures={10}
                        />
                      </div>

                      {/* Tags */}
                      <div className="space-y-2">
                        <Label>Tags</Label>
                        <TagInput
                          tags={tags}
                          onTagsChange={setTags}
                          maxTags={10}
                        />
                      </div>

                      {/* Price, Currency, Category */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="productPrice">Price *</Label>
                          <Input
                            id="productPrice"
                            type="number"
                            placeholder="29"
                            value={formData.productPrice}
                            onChange={(e) =>
                              setFormData({ ...formData, productPrice: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="productCurrency">Currency</Label>
                          <select
                            id="productCurrency"
                            value={formData.productCurrency}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                productCurrency: e.target.value,
                              })
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
                          <Label htmlFor="productCategory">Category</Label>
                          <select
                            id="productCategory"
                            value={formData.productCategory}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                productCategory: e.target.value,
                              })
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
                        <Label>Product Files *</Label>
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
                    </div>
                  </div>
                )}

                {/* Step 4: Complete */}
                {currentStep === 4 && (
                  <div className="text-center space-y-6 py-8 animate-fade-in">
                    <div className="w-20 h-20 rounded-full bg-champagne/20 flex items-center justify-center mx-auto">
                      <Check className="h-10 w-10 text-champagne" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-medium mb-2">
                        You're All Set!
                      </h2>
                      <p className="text-muted-foreground">
                        Your seller account is ready. Start creating and selling your
                        digital products.
                      </p>
                    </div>

                    <div className="glass-card p-4 text-left">
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Remember:</strong> Platform
                        commission is 12% per sale. Your earnings are automatically
                        calculated and available for payout.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Button variant="luxury" size="lg" asChild>
                        <Link to="/dashboard">
                          Go to Dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="luxury-outline" size="lg" asChild>
                        <Link to="/dashboard/upload">Upload Another Product</Link>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                {currentStep < 4 && (
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                    <Button
                      variant="minimal"
                      onClick={handleBack}
                      disabled={currentStep === 1 || isSavingProfile || isUploading}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      variant="luxury"
                      onClick={handleNext}
                      disabled={isUploading || isSavingProfile || isLoadingProfile}
                    >
                      {isSavingProfile ? "Saving..." : isUploading ? "Uploading..." : currentStep === 3 ? "Complete Setup" : "Continue"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>

      {/* Password Confirmation Dialog for Seller Upgrade */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Confirm Your Identity</DialogTitle>
            <DialogDescription>
              To become a seller, please enter your password to confirm this action.
              This is for your account security.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && confirmPassword) {
                    handleUpgradeToSeller();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowPasswordDialog(false);
                setConfirmPassword("");
              }}
              disabled={isUpgrading}
            >
              Cancel
            </Button>
            <Button
              variant="luxury"
              onClick={handleUpgradeToSeller}
              disabled={isUpgrading || !confirmPassword}
            >
              {isUpgrading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Confirming...
                </>
              ) : (
                "Confirm & Continue"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SellerOnboarding;
