import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, DollarSign, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Upload,
    title: "Easy Upload",
    description: "List your products in minutes with our intuitive upload flow",
  },
  {
    icon: DollarSign,
    title: "Competitive Commission",
    description: "Generous commission rates for our valued sellers",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Track your performance with detailed insights",
  },
];

export function SellerCTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-sapphire/20 via-midnight to-midnight-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-sapphire/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-champagne/10 rounded-full blur-[120px]" />
      
      <div className="container-luxury relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs tracking-widest uppercase text-champagne">
                For Creators
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight text-cream">
                Turn Your Craft
                <br />
                <span className="gradient-text">Into Revenue</span>
              </h2>
              <p className="text-cream/60 text-lg max-w-md">
                Join our growing community of creators and reach customers looking for premium digital products.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sapphire/30 to-sapphire/10 border border-sapphire/30 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-5 w-5 text-champagne" />
                  </div>
                  <div>
                    <h3 className="font-medium text-cream mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-cream/50">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button variant="champagne" size="xl" asChild>
                <Link to="/sell">
                  Start Selling Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            {/* Decorative cards */}
            <div className="relative space-y-4">
              {/* Stats card */}
              <div className="midnight-glass p-6 max-w-sm ml-auto animate-slide-up">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-cream/60">Your Dashboard</span>
                </div>
                <p className="text-4xl font-serif font-medium text-cream mb-2">
                  Track Your
                </p>
                <p className="text-sm text-cream/50">Earnings & Growth</p>
              </div>

              {/* Recent sale notification */}
              <div className="midnight-glass p-4 max-w-xs animate-slide-up delay-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne/30 to-gold/20 flex items-center justify-center">
                    <span className="text-lg">💰</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cream">New Sale!</p>
                    <p className="text-xs text-cream/50">Get notified instantly</p>
                  </div>
                </div>
              </div>

              {/* Rating card */}
              <div className="midnight-glass p-4 max-w-xs ml-auto animate-slide-up delay-200">
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-champagne fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cream">Build Your Rating</p>
                    <p className="text-xs text-cream/50">Earn customer trust</p>
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