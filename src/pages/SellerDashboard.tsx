import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  DollarSign,
  Package,
  TrendingUp,
  Eye,
  Plus,
  Download,
  ArrowUpRight,
  Sparkles,
  Wand2,
} from "lucide-react";

// Mock data for demo
const stats = [
  {
    label: "Total Earnings",
    value: "₹1,24,560",
    change: "+12.5%",
    icon: DollarSign,
  },
  {
    label: "Products",
    value: "8",
    change: "+2",
    icon: Package,
  },
  {
    label: "Total Sales",
    value: "156",
    change: "+23",
    icon: TrendingUp,
  },
  {
    label: "Views This Month",
    value: "2,840",
    change: "+18%",
    icon: Eye,
  },
];

const recentSales = [
  {
    id: 1,
    product: "Modern E-Book Template",
    buyer: "john@example.com",
    amount: 29900,
    commission: 3588,
    net: 26312,
    date: "2 hours ago",
  },
  {
    id: 2,
    product: "Premium UI Kit Bundle",
    buyer: "sarah@design.co",
    amount: 49900,
    commission: 5988,
    net: 43912,
    date: "5 hours ago",
  },
  {
    id: 3,
    product: "Course: Design Systems",
    buyer: "mike@startup.io",
    amount: 79900,
    commission: 9588,
    net: 70312,
    date: "1 day ago",
  },
];

const products = [
  {
    id: 1,
    title: "Modern E-Book Template",
    sales: 45,
    earnings: 134550,
    status: "published",
  },
  {
    id: 2,
    title: "Premium UI Kit Bundle",
    sales: 38,
    earnings: 189620,
    status: "published",
  },
  {
    id: 3,
    title: "Course: Design Systems",
    sales: 22,
    earnings: 175780,
    status: "published",
  },
  {
    id: 4,
    title: "Icon Pack Pro",
    sales: 0,
    earnings: 0,
    status: "draft",
  },
];

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount / 100);
};

const SellerDashboard = () => {
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
                  Welcome back, DesignPro. Here's your overview.
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
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-serif font-medium">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Sales */}
              <div className="lg:col-span-2 glass-card-elevated p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl font-medium">Recent Sales</h2>
                  <Button variant="minimal" size="sm">
                    View All
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
                        <th className="text-left py-3">Product</th>
                        <th className="text-left py-3">Buyer</th>
                        <th className="text-right py-3">Amount</th>
                        <th className="text-right py-3">Commission (12%)</th>
                        <th className="text-right py-3">Your Earnings</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {recentSales.map((sale) => (
                        <tr key={sale.id}>
                          <td className="py-4">
                            <p className="font-medium text-sm">{sale.product}</p>
                            <p className="text-xs text-muted-foreground">
                              {sale.date}
                            </p>
                          </td>
                          <td className="py-4 text-sm text-muted-foreground">
                            {sale.buyer}
                          </td>
                          <td className="py-4 text-right text-sm">
                            {formatPrice(sale.amount)}
                          </td>
                          <td className="py-4 text-right text-sm text-taupe">
                            -{formatPrice(sale.commission)}
                          </td>
                          <td className="py-4 text-right text-sm font-medium text-champagne">
                            {formatPrice(sale.net)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                        <Eye className="h-5 w-5 text-champagne" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Enhance Thumbnail</p>
                        <p className="text-xs text-muted-foreground">
                          AI upscale and polish images
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

            {/* Products Table */}
            <div className="glass-card-elevated p-6 mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-medium">Your Products</h2>
                <Button variant="luxury-outline" size="sm" asChild>
                  <Link to="/dashboard/products">
                    Manage All
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
                      <th className="text-left py-3">Product</th>
                      <th className="text-left py-3">Status</th>
                      <th className="text-right py-3">Sales</th>
                      <th className="text-right py-3">Earnings</th>
                      <th className="text-right py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="py-4">
                          <p className="font-medium text-sm">{product.title}</p>
                        </td>
                        <td className="py-4">
                          <Badge
                            variant={
                              product.status === "published" ? "default" : "secondary"
                            }
                            className="capitalize"
                          >
                            {product.status}
                          </Badge>
                        </td>
                        <td className="py-4 text-right text-sm">
                          {product.sales}
                        </td>
                        <td className="py-4 text-right text-sm font-medium">
                          {formatPrice(product.earnings)}
                        </td>
                        <td className="py-4 text-right">
                          <Button variant="minimal" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
