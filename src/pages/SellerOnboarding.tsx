import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
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
} from "lucide-react";

const steps = [
  { id: 1, title: "Profile", icon: User },
  { id: 2, title: "Payout", icon: CreditCard },
  { id: 3, title: "Upload", icon: Upload },
  { id: 4, title: "Complete", icon: Check },
];

const SellerOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    website: "",
    productTitle: "",
    productDescription: "",
    productPrice: "",
    productCategory: "Templates",
  });
  const [aiGenerating, setAiGenerating] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
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
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          currentStep >= step.id
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
                        className={`text-xs mt-2 ${
                          currentStep >= step.id
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-24 md:w-32 h-px mx-4 transition-colors ${
                          currentStep > step.id
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
                          <span>₹1,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Platform fee (12%):</span>
                          <span className="text-taupe">-₹120</span>
                        </div>
                        <div className="flex justify-between font-medium pt-2 border-t border-border">
                          <span>Your earnings:</span>
                          <span className="text-champagne">₹880</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="luxury-outline" size="lg" className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Connect with Stripe
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Secure payment processing powered by Stripe. Your banking details
                      are never stored on our servers.
                    </p>
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
                          <Label htmlFor="productDescription">Description</Label>
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
                          placeholder="Describe your product..."
                          rows={4}
                          value={formData.productDescription}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              productDescription: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="productPrice">Price (₹)</Label>
                          <Input
                            id="productPrice"
                            type="number"
                            placeholder="499"
                            value={formData.productPrice}
                            onChange={(e) =>
                              setFormData({ ...formData, productPrice: e.target.value })
                            }
                          />
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
                        <Label>Product Files</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-champagne/50 transition-colors cursor-pointer">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                          <p className="text-sm font-medium">
                            Drag & drop your files here
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            ZIP, PDF, or individual files up to 100MB
                          </p>
                        </div>
                      </div>

                      {/* AI Mockup Button */}
                      <Button variant="luxury-outline" className="w-full" type="button">
                        <Image className="h-4 w-4 mr-2" />
                        Generate AI Mockup
                      </Button>
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
                      disabled={currentStep === 1}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button variant="luxury" onClick={handleNext}>
                      {currentStep === 3 ? "Complete Setup" : "Continue"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default SellerOnboarding;
