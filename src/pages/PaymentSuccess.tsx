import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import {
    CheckCircle2,
    Package,
    Download,
    ArrowRight,
    Sparkles,
    Mail,
    Loader2,
    Receipt,
    FileText,
    ExternalLink,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/utils";
import api from "@/lib/api";
import confetti from "canvas-confetti";
import { toast } from "sonner";

interface OrderItem {
    productId: number;
    title: string;
    quantity: number;
    priceInCents: number;
    thumbnail?: string;
    slug?: string;
    hasFile: boolean;
}

interface OrderDetails {
    id: number;
    sessionId: string;
    status: string;
    amountTotal: number;
    purchasedAt: string;
    items: OrderItem[];
}

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const { user } = useAuth();
    const clearCart = useCartStore((state) => state.clearCart);
    const [hasCleared, setHasCleared] = useState(false);
    const [order, setOrder] = useState<OrderDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState<number | null>(null);

    // Clear cart and fetch order on successful payment
    useEffect(() => {
        if (sessionId && !hasCleared) {
            clearCart();
            setHasCleared(true);

            // Trigger confetti celebration
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.6 },
                    colors: ["#C9A962", "#6B8AFD", "#ffffff"],
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.6 },
                    colors: ["#C9A962", "#6B8AFD", "#ffffff"],
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        }
    }, [sessionId, hasCleared, clearCart]);

    // Fetch order details
    useEffect(() => {
        const fetchOrder = async () => {
            if (!sessionId || !user) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await api.get(`/orders/session/${sessionId}`);
                setOrder(response.data);
            } catch (error) {
                console.error("Error fetching order:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [sessionId, user]);

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

    const handleViewInvoice = async () => {
        if (!order) return;

        try {
            const response = await api.get(`/orders/${order.id}/invoice`);
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
                `).join('')}
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

    return (
        <>
            <Helmet>
                <title>Payment Successful — Mercato94</title>
                <meta name="description" content="Your payment was successful. Thank you for your purchase!" />
            </Helmet>
            <Layout>
                <section className="min-h-screen flex items-center justify-center py-20">
                    <div className="container-luxury max-w-3xl">
                        {/* Success Card */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-midnight-light/80 to-midnight/60 border border-sapphire/30 p-8 md:p-12 backdrop-blur-xl">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-champagne/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-sapphire/10 rounded-full blur-3xl" />

                            {/* Content */}
                            <div className="relative z-10 space-y-8">
                                {/* Success Icon & Title */}
                                <div className="text-center space-y-4">
                                    <div className="flex justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-champagne/20 rounded-full blur-xl animate-pulse" />
                                            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-champagne/30 to-champagne/10 border border-champagne/40 flex items-center justify-center">
                                                <CheckCircle2 className="w-10 h-10 text-champagne" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 text-champagne text-sm font-medium tracking-widest uppercase">
                                        <Sparkles className="w-4 h-4" />
                                        Payment Successful
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-serif font-medium text-cream">
                                        Thank You for Your Purchase!
                                    </h1>
                                    <p className="text-muted-foreground max-w-md mx-auto">
                                        Your order has been confirmed. Download your files below.
                                    </p>
                                </div>

                                {/* Order Items with Downloads */}
                                {isLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <Loader2 className="h-8 w-8 animate-spin text-champagne" />
                                    </div>
                                ) : order && order.items.length > 0 ? (
                                    <div className="space-y-4">
                                        <h2 className="text-sm font-medium text-cream/80 uppercase tracking-wide">Your Items</h2>
                                        <div className="space-y-3">
                                            {order.items.map((item) => (
                                                <div
                                                    key={item.productId}
                                                    className="flex items-center justify-between gap-4 p-4 rounded-xl bg-midnight/50 border border-sapphire/10"
                                                >
                                                    <div className="flex items-center gap-4 min-w-0">
                                                        {item.thumbnail && (
                                                            <img
                                                                src={item.thumbnail}
                                                                alt={item.title}
                                                                className="w-12 h-12 rounded-lg object-cover"
                                                            />
                                                        )}
                                                        <div className="min-w-0">
                                                            <p className="font-medium text-cream truncate">{item.title}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {formatPrice(item.priceInCents, "USD")} × {item.quantity}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
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
                                                        <Button variant="luxury-outline" size="sm" asChild>
                                                            <Link to={`/products/${item.slug}`}>
                                                                <ExternalLink className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Order Summary */}
                                        <div className="flex items-center justify-between pt-4 border-t border-sapphire/20">
                                            <span className="text-muted-foreground">Order Total</span>
                                            <span className="text-xl font-medium text-champagne">
                                                {formatPrice(order.amountTotal, "USD")}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    /* Fallback info cards if order not loaded */
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <div className="p-4 rounded-xl bg-midnight/50 border border-sapphire/10 text-center">
                                            <Mail className="w-6 h-6 text-champagne mb-2 mx-auto" />
                                            <p className="text-sm text-cream font-medium">Email Sent</p>
                                            <p className="text-xs text-muted-foreground mt-1">Check your inbox</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-midnight/50 border border-sapphire/10 text-center">
                                            <Download className="w-6 h-6 text-champagne mb-2 mx-auto" />
                                            <p className="text-sm text-cream font-medium">Ready to Download</p>
                                            <p className="text-xs text-muted-foreground mt-1">Access your files</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-midnight/50 border border-sapphire/10 text-center">
                                            <Package className="w-6 h-6 text-champagne mb-2 mx-auto" />
                                            <p className="text-sm text-cream font-medium">In Purchases</p>
                                            <p className="text-xs text-muted-foreground mt-1">View order details</p>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                    {order && (
                                        <Button variant="luxury-outline" size="lg" onClick={handleViewInvoice}>
                                            <Receipt className="h-5 w-5 mr-2" />
                                            View Invoice
                                        </Button>
                                    )}
                                    <Button variant="luxury" size="lg" asChild>
                                        <Link to="/purchases">
                                            View My Purchases
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                </div>

                                {/* Order Reference */}
                                {sessionId && (
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">
                                            Order Reference: <code className="text-champagne/70 font-mono">{sessionId.slice(0, 24)}...</code>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default PaymentSuccess;
