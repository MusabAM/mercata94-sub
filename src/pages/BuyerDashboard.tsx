import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Download, Eye, Package, Receipt, ArrowRight, Loader2, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/utils";
import api from "@/lib/api";
import { toast } from "sonner";

interface OrderItem {
  productId: number;
  title: string;
  quantity: number;
  priceInCents: number;
  thumbnail?: string;
  slug?: string;
  sellerName?: string;
  hasFile: boolean;
}

interface Order {
  id: number;
  sessionId: string;
  status: string;
  amountTotal: number;
  purchasedAt: string;
  items: OrderItem[];
}

const BuyerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState<number | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch purchases
  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user) return;

      try {
        const response = await api.get("/orders/my-purchases");
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching purchases:", error);
        toast.error("Failed to load purchases");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchases();
  }, [user]);

  // Calculate stats
  const totalPurchases = orders.length;
  const totalItems = orders.reduce((sum, order) => sum + order.items.length, 0);
  // PostgreSQL numeric type returns strings, so we need to parse them
  const totalSpent = orders.reduce((sum, order) => sum + (parseFloat(String(order.amountTotal)) || 0), 0);
  const downloadableItems = orders.reduce(
    (sum, order) => sum + order.items.filter((item) => item.hasFile).length,
    0
  );

  const handleDownload = async (productId: number) => {
    setIsDownloading(productId);
    try {
      const response = await api.get(`/products/${productId}/download`);
      if (response.data.downloadUrl) {
        window.open(response.data.downloadUrl, "_blank");
        toast.success("Download started!");
      }
    } catch (error: any) {
      toast.error("Download failed", {
        description: error.response?.data?.message || "Please try again.",
      });
    } finally {
      setIsDownloading(null);
    }
  };

  const handleViewInvoice = async (orderId: number) => {
    try {
      const response = await api.get(`/orders/${orderId}/invoice`);
      const invoice = response.data;

      // Create a printable invoice window
      const invoiceWindow = window.open("", "_blank");
      if (invoiceWindow) {
        invoiceWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Invoice ${invoice.invoiceNumber}</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
              .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
              .logo { font-size: 24px; font-weight: bold; color: #1a1a2e; }
              .invoice-details { text-align: right; color: #666; }
              .invoice-number { font-size: 20px; color: #1a1a2e; margin-bottom: 8px; }
              .section { margin-bottom: 30px; }
              .section-title { font-size: 14px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
              th { text-align: left; padding: 12px; border-bottom: 2px solid #eee; color: #888; font-weight: 500; }
              td { padding: 12px; border-bottom: 1px solid #eee; }
              .amount { text-align: right; }
              .total-row { font-weight: bold; font-size: 18px; }
              .total-row td { border-bottom: none; padding-top: 20px; }
              .footer { margin-top: 40px; text-align: center; color: #888; font-size: 12px; }
              .status { display: inline-block; padding: 4px 12px; background: #22c55e20; color: #22c55e; border-radius: 4px; font-weight: 500; }
              @media print { body { padding: 20px; } }
            </style>
          </head>
          <body>
            <div class="header">
              <div>
                <div class="logo">Mercato94</div>
                <p style="color: #888; margin-top: 4px;">Digital Marketplace</p>
              </div>
              <div class="invoice-details">
                <div class="invoice-number">${invoice.invoiceNumber}</div>
                <div class="status">${invoice.status}</div>
                <p>Date: ${new Date(invoice.date).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Bill To</div>
              <p style="margin: 0; font-weight: 500;">${invoice.buyer.name}</p>
              <p style="margin: 4px 0; color: #666;">${invoice.buyer.email}</p>
            </div>
            
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th class="amount">Unit Price</th>
                  <th class="amount">Total</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.items.map((item: any) => `
                  <tr>
                    <td>${item.title}<br><span style="color: #888; font-size: 12px;">by ${item.seller}</span></td>
                    <td>${item.quantity}</td>
                    <td class="amount">$${(item.unitPrice / 100).toFixed(2)}</td>
                    <td class="amount">$${(item.totalPrice / 100).toFixed(2)}</td>
                  </tr>
                `).join("")}
                <tr class="total-row">
                  <td colspan="3">Total</td>
                  <td class="amount">$${(invoice.total / 100).toFixed(2)} ${invoice.currency}</td>
                </tr>
              </tbody>
            </table>
            
            <div class="footer">
              <p>${invoice.platform.name} • ${invoice.platform.email}</p>
              <p>${invoice.platform.website}</p>
            </div>
          </body>
          </html>
        `);
        invoiceWindow.document.close();
      }
    } catch (error: any) {
      toast.error("Failed to load invoice", {
        description: error.response?.data?.message || "Please try again.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
                <p className="text-2xl font-serif font-medium">
                  {isLoading ? "-" : totalPurchases}
                </p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
              <div className="glass-card-elevated p-6 text-center">
                <Download className="h-6 w-6 text-champagne mx-auto mb-2" />
                <p className="text-2xl font-serif font-medium">
                  {isLoading ? "-" : downloadableItems}
                </p>
                <p className="text-sm text-muted-foreground">Available Downloads</p>
              </div>
              <div className="glass-card-elevated p-6 text-center">
                <Receipt className="h-6 w-6 text-champagne mx-auto mb-2" />
                <p className="text-2xl font-serif font-medium">
                  {isLoading ? "-" : formatPrice(totalSpent, "USD")}
                </p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-champagne" />
              </div>
            )}

            {/* Purchases List */}
            {!isLoading && (
              <div className="glass-card-elevated p-6">
                <h2 className="font-serif text-xl font-medium mb-6">
                  Purchase History
                </h2>

                {orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-border rounded-xl overflow-hidden"
                      >
                        {/* Order Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-midnight/30 border-b border-border">
                          <div className="flex items-center gap-4">
                            <Badge variant="secondary" className="font-mono text-xs">
                              Order #{order.id}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(order.purchasedAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-champagne">
                              {formatPrice(order.amountTotal, "USD")}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewInvoice(order.id)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Invoice
                            </Button>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="divide-y divide-border">
                          {order.items.map((item) => (
                            <div
                              key={`${order.id}-${item.productId}`}
                              className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-lg bg-stone overflow-hidden flex-shrink-0">
                                  {item.thumbnail ? (
                                    <img
                                      src={item.thumbnail}
                                      alt={item.title}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-midnight">
                                      <Package className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-medium">{item.title}</h3>
                                  {item.sellerName && (
                                    <p className="text-sm text-muted-foreground">
                                      by {item.sellerName}
                                    </p>
                                  )}
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {formatPrice(item.priceInCents, "USD")} × {item.quantity}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {item.slug && (
                                  <Button variant="luxury-outline" size="sm" asChild>
                                    <Link to={`/products/${item.slug}`}>
                                      <Eye className="h-4 w-4 mr-1" />
                                      View
                                    </Link>
                                  </Button>
                                )}
                                {item.hasFile && (
                                  <Button
                                    variant="luxury"
                                    size="sm"
                                    onClick={() => handleDownload(item.productId)}
                                    disabled={isDownloading === item.productId}
                                  >
                                    {isDownloading === item.productId ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <>
                                        <Download className="h-4 w-4 mr-1" />
                                        Download
                                      </>
                                    )}
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
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
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default BuyerDashboard;
