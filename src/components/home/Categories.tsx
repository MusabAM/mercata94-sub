import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Templates",
    description: "Website, app & document templates",
    count: 450,
    gradient: "from-sapphire/30 to-sapphire/10",
    href: "/products?category=templates",
  },
  {
    name: "UI Kits",
    description: "Design systems & components",
    count: 320,
    gradient: "from-champagne/30 to-champagne/10",
    href: "/products?category=ui-kits",
  },
  {
    name: "Courses",
    description: "Video tutorials & masterclasses",
    count: 180,
    gradient: "from-sapphire-glow/30 to-sapphire/10",
    href: "/products?category=courses",
  },
  {
    name: "Mockups",
    description: "Device & packaging mockups",
    count: 290,
    gradient: "from-gold/20 to-champagne/10",
    href: "/products?category=mockups",
  },
  {
    name: "Fonts",
    description: "Premium typefaces & font families",
    count: 150,
    gradient: "from-midnight-light to-sapphire/20",
    href: "/products?category=fonts",
  },
  {
    name: "Icons & Graphics",
    description: "Icons, illustrations & vectors",
    count: 520,
    gradient: "from-champagne/20 to-gold/10",
    href: "/products?category=icons",
  },
];

export function Categories() {
  return (
    <section className="section-padding bg-midnight relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sapphire/10 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-champagne/5 rounded-full blur-[120px] -translate-y-1/2" />
      
      <div className="container-luxury relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-widest uppercase text-champagne">
            Explore Categories
          </span>
          <h2 className="heading-large mt-3 mb-4 text-cream">
            Find Your Creative Assets
          </h2>
          <p className="text-cream/60">
            Browse our carefully organized collection of premium digital products
            across multiple categories.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.href}
              className={cn(
                "group relative p-8 rounded-xl overflow-hidden transition-all duration-500",
                "bg-gradient-to-br hover:shadow-sapphire hover:-translate-y-1",
                "border border-sapphire/20 hover:border-sapphire/40",
                category.gradient,
                `animate-fade-up delay-${(index + 1) * 100}`
              )}
            >
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-serif text-xl font-medium text-cream">
                    {category.name}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="h-4 w-4 text-cream" />
                  </div>
                </div>
                <p className="text-sm text-cream/60 mb-4">
                  {category.description}
                </p>
                <p className="text-xs tracking-widest uppercase text-champagne">
                  {category.count} products
                </p>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-cream/5 group-hover:scale-150 transition-transform duration-700" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}