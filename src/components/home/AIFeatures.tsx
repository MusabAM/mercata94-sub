import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Wand2,
  Search,
  Image,
  MessageSquare,
  Zap,
  ArrowRight,
} from "lucide-react";

const aiFeatures = [
  {
    icon: Wand2,
    title: "Auto-Write Descriptions",
    description:
      "AI generates polished product descriptions, marketing copy, and SEO-optimized content in seconds.",
    tag: "For Sellers",
  },
  {
    icon: Search,
    title: "Semantic Search",
    description:
      "Find exactly what you need with natural language queries like 'minimal portfolio template for designers'.",
    tag: "For Buyers",
  },
  {
    icon: Image,
    title: "Mockup Generator",
    description:
      "Create stunning product mockups automatically. Choose device styles and get professional previews.",
    tag: "For Sellers",
  },
  {
    icon: Zap,
    title: "Smart Pricing",
    description:
      "AI analyzes similar products to suggest optimal price ranges that maximize sales and revenue.",
    tag: "For Sellers",
  },
  {
    icon: MessageSquare,
    title: "Ask Mercato",
    description:
      "Get instant answers about products, licenses, and more with our AI-powered assistant.",
    tag: "For Everyone",
  },
  {
    icon: Sparkles,
    title: "Smart Tags",
    description:
      "Automatically generate relevant tags and categories based on your product content.",
    tag: "For Sellers",
  },
];

export function AIFeatures() {
  return (
    <section className="section-padding bg-gradient-to-b from-midnight-light via-sapphire/10 to-midnight relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sapphire/20 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-champagne/10 rounded-full blur-[100px]" />

      <div className="container-luxury relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sapphire/20 border border-sapphire/30 rounded-full mb-8 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-champagne" />
            <span className="text-xs tracking-widest uppercase text-champagne">
              AI-Powered Platform
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 text-cream">
            Intelligence Built In
          </h2>
          <p className="text-cream/60 text-lg">
            Mercato94 uses AI to help sellers create better listings and buyers
            discover perfect products. All features work seamlessly in the background.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {aiFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-sapphire/20 bg-midnight/50 backdrop-blur-sm hover:bg-sapphire/10 hover:border-sapphire/40 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sapphire/30 to-sapphire/10 flex items-center justify-center group-hover:from-sapphire/40 group-hover:to-sapphire/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-champagne" />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-champagne/10 text-champagne/80 border border-champagne/20">
                  {feature.tag}
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium mb-2 text-cream">
                {feature.title}
              </h3>
              <p className="text-cream/50 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-cream/50 mb-6">
            Ready to experience the future of digital marketplaces?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="champagne" size="xl" asChild>
              <Link to="/sell">
                Start Selling with AI
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="sapphire-outline" size="xl" asChild>
              <Link to="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}