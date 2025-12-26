import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice, CURRENCY_CONFIG } from "@/lib/utils";
import {
  DollarSign,
  Package,
  TrendingUp,
  Eye,
  Plus,
  ExternalLink,
  Download,
  ArrowUpRight,
  Sparkles,
  Wand2,
  Loader2,
  CreditCard,
  Check,
  CheckCircle2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  status: string;
  thumbnail_url: string | null;
  images: string[];
  created_at: string;
  sales_count: number;
  earnings: number;
}

interface Sale {
  order_id: number;
  product: string;
  buyer: string;
  buyer_name: string | null;
  gross_amount: number;
  commission: number;
  net_amount: number;
  sale_date: string;
  quantity: number;
}

const SellerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [commissionRate, setCommissionRate] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [salesLoading, setSalesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Stripe Connect state
  const [stripeStatus, setStripeStatus] = useState<{
    connected: boolean;
    chargesEnabled: boolean;
    payoutsEnabled: boolean;
    detailsSubmitted: boolean;
  } | null>(null);
  const [isLoadingStripe, setIsLoadingStripe] = useState(true);
  const [isConnectingStripe, setIsConnectingStripe] = useState(false);

  // Fetch seller's products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/products/my-products');
        setProducts(response.data.products || []);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.response?.data?.message || 'Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch seller's sales
  useEffect(() => {
    const fetchSales = async () => {
      try {
        setSalesLoading(true);
        const response = await api.get('/orders/my-sales');
        setSales(response.data.sales || []);
        setCommissionRate(response.data.commission_rate || 10);
      } catch (err: any) {
        console.error('Error fetching sales:', err);
      } finally {
        setSalesLoading(false);
      }
    };

    fetchSales();
  }, []);

  // Check Stripe connection status
  useEffect(() => {
    const checkStripeStatus = async () => {
      setIsLoadingStripe(true);
      try {
        const response = await api.get('/stripe/connect/status');
        setStripeStatus(response.data);
      } catch (err: any) {
        console.error('Error checking Stripe status:', err);
        setStripeStatus({
          connected: false,
          chargesEnabled: false,
          payoutsEnabled: false,
          detailsSubmitted: false,
        });
      } finally {
        setIsLoadingStripe(false);
      }
    };

    checkStripeStatus();
  }, []);

  // Stripe handlers
  const handleConnectStripe = async () => {
    setIsConnectingStripe(true);
    try {
      const response = await api.post('/stripe/connect/create-account');
      window.location.href = response.data.onboardingUrl;
    } catch (err: any) {
      toast({
        title: "Connection Failed",
        description: err.response?.data?.message || "Failed to start Stripe onboarding.",
        variant: "destructive",
      });
      setIsConnectingStripe(false);
    }
  };

  const handleOpenStripeDashboard = async () => {
    try {
      const response = await api.post('/stripe/connect/dashboard-link');
      window.open(response.data.dashboardUrl, '_blank');
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to open Stripe dashboard.",
        variant: "destructive",
      });
    }
  };

  // Calculate stats from real data
  const totalEarnings = products.reduce((sum, p) => sum + Number(p.earnings || 0), 0);
  const totalSales = products.reduce((sum, p) => sum + Number(p.sales_count || 0), 0);
  const publishedCount = products.filter(p => p.status === 'published').length;

  const stats = [
    {
      label: "Total Earnings",
      value: formatPrice(totalEarnings, 'USD'),
      change: "+0%",
      icon: DollarSign,
    },
    {
      label: "Products",
      value: products.length.toString(),
      change: `${publishedCount} published`,
      icon: Package,
    },
    {
      label: "Total Sales",
      value: totalSales.toString(),
      change: "+0",
      icon: TrendingUp,
    },
    {
      label: "Views This Month",
      value: "-",
      change: "Coming soon",
      icon: Eye,
    },
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'published':
        return 'default';
      case 'pending':
        return 'outline';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <>
      <Helmet>
        <title>Seller Dashboard — Mercato94</title>
        <meta
          name="description"
          content="Manage your products, track sales, and view earnings on your Mercato94 seller dashboard."
        />
      </Helmet>
      <Layout>
        <section className="pt-28 pb-20 bg-gradient-to-b from-stone/30 to-background min-h-screen">
          <div className="container-luxury">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <h1 className="heading-large">Seller Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {user?.display_name || user?.name || 'Seller'}. Here's your overview.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="luxury-outline" size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Request Payout
                </Button>
                <Button variant="luxury" size="lg" asChild>
                  <Link to="/dashboard/upload">
                    <Plus className="h-4 w-4 mr-2" />
                    New Product
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card-elevated p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-champagne/10 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-champagne" />
                    </div>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-serif font-medium">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Sales */}
            <div className="glass-card-elevated p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-medium">Recent Sales</h2>
                <Badge variant="outline" className="text-xs">
                  {commissionRate}% Platform Fee
                </Badge>
              </div>
              <div className="overflow-x-auto">
                {salesLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-champagne" />
                  </div>
                ) : sales.length === 0 ? (
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No sales yet</p>
                    <p className="text-sm text-muted-foreground/70">Sales will appear here once customers purchase your products</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
                        <th className="text-left py-3">Product</th>
                        <th className="text-left py-3">Buyer</th>
                        <th className="text-right py-3">Amount</th>
                        <th className="text-right py-3">Commission ({commissionRate}%)</th>
                        <th className="text-right py-3">Your Earnings</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {sales.map((sale) => (
                        <tr key={sale.order_id}>
                          <td className="py-4">
                            <p className="font-medium text-sm">{sale.product}</p>
                            <p className="text-xs text-muted-foreground">
                              {sale.sale_date ? new Date(sale.sale_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : `Order #${sale.order_id}`}
                            </p>
                          </td>
                          <td className="py-4 text-sm text-muted-foreground">{sale.buyer}</td>
                          <td className="py-4 text-right text-sm">{formatPrice(sale.gross_amount, 'USD')}</td>
                          <td className="py-4 text-right text-sm text-taupe">-{formatPrice(sale.commission, 'USD')}</td>
                          <td className="py-4 text-right text-sm font-medium text-champagne">{formatPrice(sale.net_amount, 'USD')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Products Summary */}
              <div className="lg:col-span-2 glass-card-elevated p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl font-medium">Your Products</h2>
                  <Button variant="luxury-outline" size="sm" asChild>
                    <Link to="/dashboard/upload">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Product
                    </Link>
                  </Button>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-champagne" />
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500">{error}</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground mb-4">No products yet</p>
                    <Button variant="luxury" size="sm" asChild>
                      <Link to="/dashboard/upload">
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Your First Product
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
                          <th className="text-left py-3">Product</th>
                          <th className="text-left py-3">Status</th>
                          <th className="text-right py-3">Price</th>
                          <th className="text-right py-3">Sales</th>
                          <th className="text-right py-3">Earnings</th>
                          <th className="text-right py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                {product.thumbnail_url ? (
                                  <img
                                    src={product.thumbnail_url}
                                    alt={product.title}
                                    className="w-10 h-10 rounded-lg object-cover"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                                    <Package className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-sm">{product.title}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {product.category}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4">
                              <Badge
                                variant={getStatusBadgeVariant(product.status)}
                                className="capitalize"
                              >
                                {product.status}
                              </Badge>
                            </td>
                            <td className="py-4 text-right text-sm">
                              {formatPrice(product.price, product.currency)}
                            </td>
                            <td className="py-4 text-right text-sm">
                              {product.sales_count}
                            </td>
                            <td className="py-4 text-right text-sm font-medium text-champagne">
                              {formatPrice(product.earnings, product.currency)}
                            </td>
                            <td className="py-4 text-right">
                              <Button variant="minimal" size="sm" asChild>
                                <Link to={`/products/${product.slug}`}>
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  View
                                </Link>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Payouts Panel */}
                <div className="glass-card-elevated p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="h-5 w-5 text-champagne" />
                    <h2 className="font-serif text-xl font-medium">Payouts</h2>
                  </div>

                  {isLoadingStripe ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-champagne" />
                    </div>
                  ) : stripeStatus?.connected && stripeStatus?.detailsSubmitted ? (
                    // Connected state
                    <div className="space-y-4">
                      <div className="glass-card p-4 border-green-500/30 bg-green-500/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium text-green-600 text-sm">Stripe Connected</p>
                            <p className="text-xs text-muted-foreground">
                              Ready to receive payments
                            </p>
                          </div>
                        </div>
                        {stripeStatus.chargesEnabled && stripeStatus.payoutsEnabled && (
                          <div className="mt-3 flex gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" /> Charges
                            </span>
                            <span className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" /> Payouts
                            </span>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="luxury-outline"
                        size="sm"
                        className="w-full"
                        onClick={handleOpenStripeDashboard}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Manage Stripe Account
                      </Button>
                    </div>
                  ) : stripeStatus?.connected && !stripeStatus?.detailsSubmitted ? (
                    // Incomplete onboarding
                    <div className="space-y-4">
                      <div className="glass-card p-4 border-yellow-500/30 bg-yellow-500/5">
                        <p className="font-medium text-yellow-600 text-sm">Onboarding Incomplete</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Complete your Stripe setup to receive payments
                        </p>
                      </div>
                      <Button
                        variant="luxury"
                        size="sm"
                        className="w-full"
                        onClick={handleConnectStripe}
                        disabled={isConnectingStripe}
                      >
                        {isConnectingStripe ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Redirecting...
                          </>
                        ) : (
                          <>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Continue Setup
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    // Not connected
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Connect your Stripe account to receive payouts from your sales.
                      </p>
                      <Button
                        variant="luxury"
                        size="sm"
                        className="w-full"
                        onClick={handleConnectStripe}
                        disabled={isConnectingStripe}
                      >
                        {isConnectingStripe ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <CreditCard className="h-4 w-4 mr-2" />
                            Connect with Stripe
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Secure payments powered by Stripe
                      </p>
                    </div>
                  )}
                </div>

                {/* AI Tools Panel */}
                <div className="glass-card-elevated p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="h-5 w-5 text-champagne" />
                    <h2 className="font-serif text-xl font-medium">AI Tools</h2>
                  </div>
                  <div className="space-y-4">
                    <button className="w-full glass-card p-4 text-left hover:shadow-soft transition-shadow group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-champagne/10 flex items-center justify-center group-hover:bg-champagne/20 transition-colors">
                          <Wand2 className="h-5 w-5 text-champagne" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Auto-Write Description</p>
                          <p className="text-xs text-muted-foreground">
                            Generate polished product copy
                          </p>
                        </div>
                      </div>
                    </button>
                    <button className="w-full glass-card p-4 text-left hover:shadow-soft transition-shadow group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-champagne/10 flex items-center justify-center group-hover:bg-champagne/20 transition-colors">
                          <Package className="h-5 w-5 text-champagne" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Generate Mockup</p>
                          <p className="text-xs text-muted-foreground">
                            Create stylized product previews
                          </p>
                        </div>
                      </div>
                    </button>
                    <button className="w-full glass-card p-4 text-left hover:shadow-soft transition-shadow group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-champagne/10 flex items-center justify-center group-hover:bg-champagne/20 transition-colors">
                          <DollarSign className="h-5 w-5 text-champagne" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Smart Pricing</p>
                          <p className="text-xs text-muted-foreground">
                            AI-suggested price ranges
                          </p>
                        </div>
                      </div>
                    </button>
                    <button className="w-full glass-card p-4 text-left hover:shadow-soft transition-shadow group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-champagne/10 flex items-center justify-center group-hover:bg-champagne/20 transition-colors">
                          <TrendingUp className="h-5 w-5 text-champagne" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Smart Tags</p>
                          <p className="text-xs text-muted-foreground">
                            Auto-generate categories & tags
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Commission Info */}
            <div className="mt-8 glass-card p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Platform commission: <span className="font-medium text-foreground">12%</span> per sale.{" "}
                Your earnings are automatically calculated after each transaction.{" "}
                <Link to="/pricing" className="text-champagne hover:underline">
                  Learn more about fees
                </Link>
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default SellerDashboard;
