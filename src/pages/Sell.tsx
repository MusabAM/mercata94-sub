import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Upload,
  DollarSign,
  BarChart3,
  Shield,
  Users,
  Zap,
  CheckCircle,
} from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Keep 88% of Sales",
    description:
      "We take only 12% commission — you keep the majority of your earnings. No hidden fees, no surprises.",
  },
  {
    icon: Upload,
    title: "Easy Upload Process",
    description:
      "List your products in minutes with our intuitive upload flow. Drag, drop, and publish.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description:
      "Track your performance with real-time insights. Understand your audience and optimize your listings.",
  },
  {
    icon: Users,
    title: "Global Audience",
    description:
      "Reach thousands of customers worldwide who are actively looking for premium digital products.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description:
      "Get paid securely via Stripe Connect. Automatic payouts directly to your bank account.",
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description:
      "Automated file delivery means your customers get instant access after purchase.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up for free and complete your seller profile in minutes.",
  },
  {
    number: "02",
    title: "Upload Your Products",
    description:
      "Add your digital products with descriptions, previews, and pricing.",
  },
  {
    number: "03",
    title: "Start Earning",
    description:
      "Your products go live instantly. Earn money with every sale.",
  },
];

const Sell = () => {
  return (
    <>
      <Helmet>
        <title>Start Selling — Mercato94</title>
        <meta
          name="description"
          content="Join 850+ verified sellers on Mercato94. Sell your digital products, keep 85% of sales, and reach a global audience of creators."
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-stone/30 to-background overflow-hidden">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-champagne/10 rounded-full mb-8 animate-fade-up">
                <span className="w-2 h-2 rounded-full bg-champagne" />
                <span className="text-xs tracking-widest uppercase text-muted-foreground">
                  For Creators
                </span>
              </span>
              <h1 className="heading-display mb-6 animate-fade-up delay-100">
                Turn Your Craft
                <br />
                <span className="text-taupe">Into Revenue</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up delay-200">
                Join a curated community of 850+ verified sellers. Sell your
                templates, UI kits, courses, and creative assets to thousands of
                customers worldwide.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-up delay-300">
                <Button variant="luxury" size="xl" asChild>
                  <Link to="/sell/onboarding">
                    Start Selling Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="luxury-outline" size="xl" asChild>
                  <Link to="#pricing">View Pricing</Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-8 mt-12 animate-fade-up delay-400">
                <div className="text-center">
                  <p className="text-2xl font-serif font-medium">₹2.4Cr+</p>
                  <p className="text-sm text-muted-foreground">Paid to Sellers</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-serif font-medium">850+</p>
                  <p className="text-sm text-muted-foreground">Active Sellers</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-serif font-medium">12%</p>
                  <p className="text-sm text-muted-foreground">Commission Only</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="section-padding bg-background">
          <div className="container-luxury">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs tracking-widest uppercase text-champagne">
                Why Mercato94
              </span>
              <h2 className="heading-large mt-3 mb-4">
                Built for Creators Like You
              </h2>
              <p className="text-muted-foreground">
                Everything you need to sell your digital products successfully,
                with tools designed specifically for independent creators.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className={`glass-card-elevated p-8 animate-fade-up delay-${
                    (index + 1) * 100
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-champagne/10 flex items-center justify-center mb-6">
                    <benefit.icon className="h-6 w-6 text-champagne" />
                  </div>
                  <h3 className="font-serif text-xl font-medium mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding bg-stone/30">
          <div className="container-luxury">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs tracking-widest uppercase text-champagne">
                Getting Started
              </span>
              <h2 className="heading-large mt-3 mb-4">
                Three Simple Steps
              </h2>
              <p className="text-muted-foreground">
                Start selling in minutes. No complicated setup, no technical
                knowledge required.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative animate-fade-up delay-${(index + 1) * 100}`}
                >
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-border" />
                  )}
                  <div className="relative text-center">
                    <span className="inline-block text-6xl font-serif font-bold text-champagne/20 mb-4">
                      {step.number}
                    </span>
                    <h3 className="font-serif text-xl font-medium mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-padding bg-background">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto">
              <div className="glass-card-elevated p-12 text-center">
                <span className="text-xs tracking-widest uppercase text-champagne">
                  Simple Pricing
                </span>
                <h2 className="heading-large mt-3 mb-4">
                  No Monthly Fees
                </h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  We only make money when you make money. Pay only a 12% commission
                  on each sale — no subscriptions, no hidden fees.
                </p>

                {/* Commission Example */}
                <div className="glass-card p-6 mb-8 text-left max-w-md mx-auto">
                  <p className="text-xs tracking-widest uppercase text-champagne mb-3">Example Sale</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sale Price</span>
                      <span>₹1,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform Fee (12%)</span>
                      <span className="text-taupe">-₹120</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-medium">
                      <span>Your Earnings</span>
                      <span className="text-champagne">₹880</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-8 mb-10">
                  <div>
                    <p className="text-5xl font-serif font-bold text-champagne">
                      88%
                    </p>
                    <p className="text-sm text-muted-foreground">Your Earnings</p>
                  </div>
                  <div className="w-px h-16 bg-border" />
                  <div>
                    <p className="text-5xl font-serif font-bold text-taupe">12%</p>
                    <p className="text-sm text-muted-foreground">Our Commission</p>
                  </div>
                </div>

                <ul className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm">
                  {[
                    "Unlimited products",
                    "Secure payments",
                    "Analytics dashboard",
                    "24/7 support",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-champagne" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button variant="luxury" size="xl" asChild>
                  <Link to="/sell/onboarding">
                    Start Selling Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-padding bg-foreground text-background">
          <div className="container-luxury text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
              Ready to Start?
            </h2>
            <p className="text-background/60 text-lg mb-10 max-w-lg mx-auto">
              Join thousands of creators who are already earning with Mercato94.
              Your first sale could be tomorrow.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="champagne"
                size="xl"
                className="text-foreground"
                asChild
              >
                <Link to="/sell/onboarding">
                  Create Seller Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="luxury-outline"
                size="xl"
                className="border-background/20 text-background hover:bg-background hover:text-foreground"
                asChild
              >
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Sell;
