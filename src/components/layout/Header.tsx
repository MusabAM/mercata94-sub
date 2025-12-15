import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ShoppingBag, Menu, X, User, LogIn, Crown, LayoutDashboard } from 'lucide-react';

// Mock user data - replace with actual auth context
const mockUser = {
  name: 'Alex Rivera',
  role: 'seller', // 'buyer', 'admin', 'guest'
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
};

const Logo = ({ scrolled, isHomePage }) => (
  <Link to="/" className="flex items-center gap-2">
    <svg 
      className={`h-8 w-auto transition-all duration-300 ${scrolled ? 'h-7' : 'h-8'}`}
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="34" height="34" rx="8" fill="url(#paint0_linear_1_2)"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="18" fill="white">94</text>
      <defs>
        <linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A68B6E"/>
          <stop offset="1" stopColor="#7A634B"/>
        </linearGradient>
      </defs>
    </svg>
    <span className={`font-serif text-xl font-bold transition-colors ${!isHomePage || scrolled ? 'text-black' : 'text-cream'}`}>94mercato</span>
  </Link>
);

const Navigation = ({ links, scrolled, isHomePage }) => (
  <nav className="hidden lg:flex items-center gap-6">
    {links.map((link) => (
      <NavLink
        key={link.to}
        to={link.to}
        className={({ isActive }) =>
          `relative text-sm font-medium transition-colors after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-full after:scale-x-0 after:origin-center after:bg-current after:transition-transform hover:after:scale-x-100 ${isActive ? 'after:scale-x-100' : ''} ${!isHomePage || scrolled ? 'text-black' : 'text-cream/80 hover:text-cream'}`
        }
      >
        {link.label}
      </NavLink>
    ))}
  </nav>
);

const HeaderActions = ({ user, scrolled, isHomePage }) => (
  <div className="flex items-center gap-3">
    <Button variant="ghost" size="icon" className={`transition-colors ${!isHomePage || scrolled ? 'text-black hover:bg-muted' : 'text-cream/80 hover:bg-white/10'}`}>
      <Search className="h-5 w-5" />
    </Button>
    <Button variant="ghost" size="icon" className={`relative transition-colors ${!isHomePage || scrolled ? 'text-black hover:bg-muted' : 'text-cream/80 hover:bg-white/10'}`}>
      <ShoppingBag className="h-5 w-5" />
      <Badge className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs bg-champagne text-black">3</Badge>
    </Button>
    {user ? (
      <Link to="/dashboard" className="flex items-center gap-2 pl-2">
        <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full border-2 border-champagne/50" />
        <div className="hidden md:block">
          <p className={`text-sm font-medium ${!isHomePage || scrolled ? 'text-black' : 'text-cream'}`}>{user.name}</p>
          <p className={`text-xs capitalize ${!isHomePage || scrolled ? 'text-muted-foreground' : 'text-cream/60'}`}>{user.role}</p>
        </div>
      </Link>
    ) : (
      <Button asChild variant="champagne" className="hidden lg:flex">
        <Link to="/login">
          <LogIn className="h-4 w-4 mr-2" />
          Login
        </Link>
      </Button>
    )}
    <div className="lg:hidden">
      {/* Mobile Menu Toggle will be handled in the main component */}
    </div>
  </div>
);

const MobileNavLink = ({ to, children, closeMenu }) => (
  <Link 
    to={to} 
    onClick={closeMenu}
    className="flex items-center gap-4 rounded-lg p-3 text-lg font-medium text-cream transition-colors hover:bg-white/10"
  >
    {children}
  </Link>
);

const getNavigationLinks = (user) => [
  { to: '/products', label: 'Products' },
  { to: '/sell', label: 'Sell' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  ...(user?.role === 'admin' ? [{ to: '/admin', label: 'Admin' }] : []),
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false); // Close mobile menu on route change
  }, [location.pathname]);

  const user = mockUser; // Replace with auth context logic
  const navLinks = getNavigationLinks(user);

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${!isHomePage || scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm' : 'bg-transparent'}
  `;

  const containerClasses = `
    container-luxury flex items-center justify-between transition-all duration-300
    ${!isHomePage || scrolled ? 'h-16' : 'h-20'}
  `;
// minor change
  return (
    <header className={headerClasses}>
      <div className={containerClasses}>
        <Logo scrolled={scrolled} isHomePage={isHomePage} />
        <Navigation links={navLinks} scrolled={scrolled} isHomePage={isHomePage} />
        <div className="flex items-center gap-2">
          <HeaderActions user={user} scrolled={scrolled} isHomePage={isHomePage} />
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden transition-colors ${!isHomePage || scrolled ? 'text-black' : 'text-cream'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className={`fixed inset-0 z-40 bg-midnight/90 backdrop-blur-xl animate-fade-in lg:hidden ${!isHomePage || scrolled ? 'top-16' : 'top-20'}`}
        >
          <div className="container-luxury pt-8 space-y-4">
            {user ? (
              <div className="flex items-center gap-3 border-b border-white/10 pb-6 mb-6">
                <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full" />
                <div>
                  <p className="text-lg font-medium text-cream">{user.name}</p>
                  <p className="text-sm capitalize text-cream/60">{user.role}</p>
                </div>
              </div>
            ) : null}
            
            <MobileNavLink to="/dashboard" closeMenu={() => setMobileMenuOpen(false)}>
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </MobileNavLink>

            {navLinks.map(link => (
              <MobileNavLink key={link.to} to={link.to} closeMenu={() => setMobileMenuOpen(false)}>
                 {/* A simple switch for icons, can be improved */}
                {link.label === 'Products' && <Crown className="h-5 w-5" />}
                {link.label === 'Sell' && <LogIn className="h-5 w-5" />}
                {link.label === 'About' && <User className="h-5 w-5" />}
                {link.label === 'Contact' && <User className="h-5 w-5" />}
                {link.label}
              </MobileNavLink>
            ))}

            <div className="border-t border-white/10 pt-6 mt-6 space-y-4">
              {!user && (
                <MobileNavLink to="/login" closeMenu={() => setMobileMenuOpen(false)}>
                  <LogIn className="h-5 w-5" />
                  Login / Signup
                </MobileNavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
