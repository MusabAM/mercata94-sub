import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroMockup from "@/assets/hero-mockup.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-midnight">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight-light/50 to-midnight" />
      <div className="absolute inset-0 bg-gradient-to-br from-sapphire/10 via-transparent to-champagne/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-sapphire/20 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-champagne/10 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sapphire/5 rounded-full blur-[150px]" />
      
      <div className="container-luxury relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sapphire/20 border border-sapphire/30 rounded-full animate-fade-up backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-champagne" />
              <span className="text-xs tracking-widest uppercase text-champagne/90">
                Premium Digital Marketplace
              </span>
            </div>
            
            {/* Headline */}
            <h1 className="heading-display text-balance animate-fade-up delay-100">
              <span className="text-cream">
                Where Digital Craft
              </span>
              <br />
              <span className="gradient-text">Becomes Timeless</span>
            </h1>
            
            {/* Subtext */}
            <p className="text-lg leading-relaxed text-cream/60 max-w-lg animate-fade-up delay-200">
              94mercato curates high-end digital assets for creators who value excellence. 
              Premium templates, UI kits, courses, and creative resources — built to stand out.
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 animate-fade-up delay-300">
              <Button variant="sapphire" size="xl" asChild>
                <Link to="/sell">
                  Start Selling
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="champagne-outline" size="xl" asChild>
                <Link to="/products">
                  Explore Marketplace
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 animate-fade-up delay-400">
              <div>
                <p className="text-3xl font-serif font-medium text-cream">Curated</p>
                <p className="text-sm text-cream/50">Premium Products</p>
              </div>
              <div className="w-px h-12 bg-sapphire/30" />
              <div>
                <p className="text-3xl font-serif font-medium text-cream">Select</p>
                <p className="text-sm text-cream/50">Verified Sellers</p>
              </div>
              <div className="w-px h-12 bg-sapphire/30" />
              <div>
                <p className="text-3xl font-serif font-medium text-cream">Growing</p>
                <p className="text-sm text-cream/50">Community</p>
              </div>
            </div>
          </div>
          
          {/* Right column - Hero image */}
          <div className="relative animate-fade-up delay-200">
            <div className="relative animate-float">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-sapphire/30 to-champagne/20 rounded-2xl blur-2xl scale-95" />
              
              <img
                src={heroMockup}
                alt="Premium digital products showcase featuring elegant device mockups"
                className="relative w-full h-auto rounded-2xl shadow-float border border-sapphire/20"
              />
              
              {/* Floating card 1 */}
              <div className="absolute -left-8 top-1/4 midnight-glass p-4 animate-slide-up delay-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sapphire to-sapphire-glow flex items-center justify-center">
                    <span className="text-lg">✨</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cream">New This Week</p>
                    <p className="text-xs text-cream/50">Fresh products weekly</p>
                  </div>
                </div>
              </div>
              
              {/* Floating card 2 */}
              <div className="absolute -right-4 bottom-1/4 midnight-glass p-4 animate-slide-up delay-400">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne to-gold flex items-center justify-center">
                    <span className="text-lg">🏆</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cream">Top Rated</p>
                    <p className="text-xs text-cream/50">Quality focus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}