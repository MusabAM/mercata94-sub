import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isSeller: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration with Supabase Auth
  };

  return (
    <>
      <Helmet>
        <title>Create Account — Mercato94</title>
        <meta
          name="description"
          content="Join Mercato94 to discover premium digital products or start selling your creative work to thousands of customers."
        />
      </Helmet>
      <Layout>
        <section className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-stone/30 to-background">
          <div className="container-luxury">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-10">
                <h1 className="heading-large mb-3">Create Your Account</h1>
                <p className="text-muted-foreground">
                  Join the premium digital marketplace
                </p>
              </div>

              <div className="glass-card-elevated p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Min 8 characters with uppercase, lowercase, and number
                    </p>
                  </div>

                  {/* Seller Option */}
                  <div className="glass-card p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="seller"
                        checked={formData.isSeller}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, isSeller: checked as boolean })
                        }
                      />
                      <div className="space-y-1">
                        <Label htmlFor="seller" className="font-medium cursor-pointer">
                          I want to sell products
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Get a seller dashboard with only 12% commission on sales
                        </p>
                      </div>
                    </div>
                  </div>

                  {formData.isSeller && (
                    <div className="bg-champagne/10 rounded-lg p-4 space-y-2 animate-fade-in">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-champagne" />
                        Seller Benefits
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                        <li>• Keep 88% of every sale</li>
                        <li>• Detailed analytics dashboard</li>
                        <li>• Secure Stripe Connect payouts</li>
                        <li>• AI-powered tools for listings</li>
                      </ul>
                    </div>
                  )}

                  <Button type="submit" variant="luxury" className="w-full" size="lg">
                    Create Account
                  </Button>
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" size="lg">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-8">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-foreground hover:text-champagne transition-colors font-medium"
                  >
                    Sign in
                  </Link>
                </p>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  By creating an account, you agree to our{" "}
                  <Link to="/terms" className="underline hover:text-foreground">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="underline hover:text-foreground">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Signup;
