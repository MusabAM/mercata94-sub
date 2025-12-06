import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Products", href: "/products" },
  { name: "Sell", href: "/sell" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Admin", href: "/admin" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        isScrolled
          ? "bg-midnight/90 backdrop-blur-xl border-b border-sapphire/20 shadow-sapphire"
          : "bg-transparent"
      )}
    >
      <nav className="container-luxury">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sapphire to-sapphire-glow flex items-center justify-center shadow-sapphire">
              <span className="font-serif text-lg font-semibold text-cream">M</span>
            </div>
            <span className="font-serif text-xl tracking-tight text-cream">
              Mercato<span className="text-champagne">94</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm tracking-wide transition-colors duration-200 elegant-underline",
                  location.pathname === link.href
                    ? "text-champagne"
                    : "text-cream/70 hover:text-cream"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-cream/70 hover:text-cream hover:bg-sapphire/20">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-cream/70 hover:text-cream hover:bg-sapphire/20">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <div className="w-px h-6 bg-sapphire/30 mx-2" />
            <Button variant="champagne-outline" size="sm" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button variant="sapphire" size="sm" asChild>
              <Link to="/sell">Start Selling</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-cream"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-out",
            isMobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-sapphire/20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-base py-2 transition-colors duration-200",
                  location.pathname === link.href
                    ? "text-champagne"
                    : "text-cream/70"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-4 border-t border-sapphire/20">
              <Button variant="champagne-outline" size="sm" className="flex-1" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="sapphire" size="sm" className="flex-1" asChild>
                <Link to="/sell">Start Selling</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}