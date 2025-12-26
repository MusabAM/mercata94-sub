import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      toast.success("Thank you for subscribing!", {
        description: "You\'ll receive our curated picks weekly.",
      });
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-midnight to-sapphire/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-sapphire/10 rounded-full blur-[150px]" />
      
      <div className="container-luxury relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Content */}
          <span className="text-xs tracking-widest uppercase text-champagne">
            Stay Inspired
          </span>
          <h2 className="heading-large mt-3 mb-4 text-cream">
            Get Curated Picks Weekly
          </h2>
          <p className="text-cream/60 mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter for handpicked digital products, creator 
            spotlights, and exclusive early access to new releases.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 px-5 bg-midnight-light/50 border-sapphire/30 text-cream placeholder:text-cream/40 focus:border-champagne focus:ring-champagne/20"
              required
            />
            <Button
              type="submit"
              variant={isSubmitted ? "midnight" : "sapphire"}
              size="lg"
              className="h-12 min-w-[140px]"
              disabled={isSubmitted}
            >
              {isSubmitted ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Subscribed
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Trust indicators */}
          <p className="text-xs text-cream/40 mt-6">
            Join 12,000+ creators and buyers. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
