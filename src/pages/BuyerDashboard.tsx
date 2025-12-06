import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Download, Eye, Package, Receipt, ArrowRight } from "lucide-react";

// Mock data for demo
const purchases = [
  {
    id: "ORD-001",
    product: {
      title: "Modern E-Book Template",
      image: "/placeholder.svg",
      seller: "DesignPro",
    },
    price: 29900,
    date: "Dec 1, 2024",
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: "ORD-002",
    product: {
      title: "Premium UI Kit Bundle",
      image: "/placeholder.svg",
      seller: "UIWorks",
    },
    price: 49900,
    date: "Nov 28, 2024",
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: "ORD-003",
    product: {
      title: "Course: Design Systems Mastery",
      image: "/placeholder.svg",
      seller: "CodeMaster",
    },
    price: 79900,
    date: "Nov 15, 2024",
    status: "completed",
    downloadUrl: "#",
  },
];

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount / 100);
};

const BuyerDashboard = () => {
  return (
    <>
      <Helmet>
        <title>My Purchases — Mercato94</title>
        <meta
          name="description"
          content="View and download your purchased products on Mercato94."
        />
      </Helmet>
      <Layout>
        <section className="pt-28 pb-20 bg-gradient-to-b from-stone/30 to-background min-h-screen">
          <div className="container-luxury">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <h1 className="heading-large">My Purchases</h1>
                <p className="text-muted-foreground">
                  Access and download your purchased products
                </p>
              </div>
              <Button variant="luxury" asChild>
                <Link to="/products">
                  Browse More Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="glass-card-elevated p-6 text-center">
                <Package className="h-6 w-6 text-champagne mx-auto mb-2" />
                <p className="text-2xl font-serif font-medium">3</p>
                <p className="text-sm text-muted-foreground">Total Purchases</p>
              </div>
              <div className="glass-card-elevated p-6 text-center">
                <Download className="h-6 w-6 text-champagne mx-auto mb-2" />
                <p className="text-2xl font-serif font-medium">3</p>
                <p className="text-sm text-muted-foreground">Available Downloads</p>
              </div>
              <div className="glass-card-elevated p-6 text-center">
                <Receipt className="h-6 w-6 text-champagne mx-auto mb-2" />
                <p className="text-2xl font-serif font-medium">
                  {formatPrice(159700)}
                </p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>

            {/* Purchases List */}
            <div className="glass-card-elevated p-6">
              <h2 className="font-serif text-xl font-medium mb-6">
                Purchase History
              </h2>
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-background border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-stone overflow-hidden">
                        <img
                          src={purchase.product.image}
                          alt={purchase.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{purchase.product.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {purchase.product.seller}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {purchase.date}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {purchase.id}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="font-medium">{formatPrice(purchase.price)}</p>
                      <div className="flex items-center gap-2">
                        <Button variant="luxury-outline" size="sm" asChild>
                          <Link to={`/products/${purchase.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button variant="luxury" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {purchases.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-medium mb-2">
                    No purchases yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Browse our curated collection of premium digital products
                  </p>
                  <Button variant="luxury" asChild>
                    <Link to="/products">Explore Products</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Receipt Download */}
            <div className="mt-8 glass-card p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need a receipt for your records?{" "}
                <button className="text-champagne hover:underline">
                  Download all receipts as PDF
                </button>
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default BuyerDashboard;
