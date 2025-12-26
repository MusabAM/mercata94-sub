import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { mockKPIs } from "@/data/mockAdminData";
import { DollarSign, ShoppingCart, Users, AlertTriangle, Package, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/admin/StatusBadge";
import api from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface DashboardStats {
  totalRevenue: number;
  revenueChange: string;
  totalOrders: number;
  ordersChange: string;
  newSellers: number;
  sellersChange: string;
}

interface PendingProduct {
  id: number;
  title: string;
  price: number;
  currency: string;
  seller_name: string;
  status: string;
}

interface RecentOrder {
  id: number;
  productTitle: string;
  buyerEmail: string;
  amount: number;
  status: string;
}

export default function AdminDashboard() {
  const [pendingProducts, setPendingProducts] = useState<PendingProduct[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  // Fetch pending products
  useEffect(() => {
    const fetchPendingProducts = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/admin/products');
        const allProducts = response.data.products || [];
        // Filter only pending products
        const pending = allProducts.filter((p: any) => p.status === 'pending');
        setPendingProducts(pending);
      } catch (err: any) {
        console.error('Error fetching pending products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingProducts();
  }, []);

  // Fetch recent orders
  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        setOrdersLoading(true);
        const response = await api.get('/admin/orders?limit=5');
        setRecentOrders(response.data.orders || []);
      } catch (err: any) {
        console.error('Error fetching orders:', err);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const response = await api.get('/admin/stats');
        setStats(response.data);
      } catch (err: any) {
        console.error('Error fetching stats:', err);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Handle approve/reject
  const handleApprove = async (productId: number) => {
    try {
      await api.patch(`/admin/products/${productId}/publish`, { status: 'published' });
      setPendingProducts(prev => prev.filter(p => p.id !== productId));
      toast({
        title: "Success",
        description: "Product approved and published.",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to approve product.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (productId: number) => {
    try {
      await api.patch(`/admin/products/${productId}/publish`, { status: 'rejected' });
      setPendingProducts(prev => prev.filter(p => p.id !== productId));
      toast({
        title: "Rejected",
        description: "Product has been rejected.",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to reject product.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout title="Dashboard" subtitle="Overview of your marketplace">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue (30d)"
          value={statsLoading ? '...' : `$${(stats?.totalRevenue || 0).toLocaleString()}`}
          change={stats?.revenueChange || 'No data yet'}
          icon={DollarSign}
          iconColor="text-champagne"
        />
        <StatCard
          title="Orders (30d)"
          value={statsLoading ? '...' : (stats?.totalOrders || 0).toString()}
          change={stats?.ordersChange || 'No data yet'}
          icon={ShoppingCart}
          iconColor="text-sapphire"
        />
        <StatCard
          title="New Sellers"
          value={statsLoading ? '...' : (stats?.newSellers || 0).toString()}
          change={stats?.sellersChange || 'No data yet'}
          icon={Users}
          iconColor="text-emerald-400"
        />
        <StatCard
          title="Open Disputes"
          value={mockKPIs.openDisputes}
          change={mockKPIs.disputesChange}
          icon={AlertTriangle}
          iconColor="text-amber-400"
        />
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6 bg-midnight-light/30 mb-8">
        <h2 className="font-serif text-lg text-cream mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="sapphire" size="sm" asChild>
            <Link to="/admin/products?status=pending">
              <Package className="h-4 w-4 mr-2" />
              Approve Pending ({pendingProducts.length})
            </Link>
          </Button>
          <Button variant="champagne-outline" size="sm" asChild>
            <Link to="/admin/payouts">
              <Clock className="h-4 w-4 mr-2" />
              Process Payouts
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="border-sapphire/30 text-cream hover:bg-sapphire/20" asChild>
            <Link to="/admin/settings">
              View Settings
            </Link>
          </Button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Products */}
        <div className="glass-card p-6 bg-midnight-light/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg text-cream">Pending Approval</h2>
            <Button variant="ghost" size="sm" className="text-champagne hover:text-champagne/80" asChild>
              <Link to="/admin/products?status=pending">View All</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-champagne" />
              </div>
            ) : pendingProducts.length === 0 ? (
              <p className="text-cream/50 text-sm py-4">No products pending approval</p>
            ) : (
              pendingProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-midnight/50">
                  <div>
                    <p className="text-sm text-cream font-medium">{product.title}</p>
                    <p className="text-xs text-cream/50">{product.seller_name} • {formatPrice(product.price, product.currency || 'USD')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="sapphire"
                      className="h-7 text-xs"
                      onClick={() => handleApprove(product.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs text-cream/60"
                      onClick={() => handleReject(product.id)}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="glass-card p-6 bg-midnight-light/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg text-cream">Recent Orders</h2>
            <Button variant="ghost" size="sm" className="text-champagne hover:text-champagne/80" asChild>
              <Link to="/admin/orders">View All</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {ordersLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-champagne" />
              </div>
            ) : recentOrders.length === 0 ? (
              <p className="text-cream/50 text-sm py-4">No orders yet</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-midnight/50">
                  <div>
                    <p className="text-sm text-cream font-medium">{order.productTitle}</p>
                    <p className="text-xs text-cream/50">{order.buyerEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-cream">{formatPrice(order.amount * 100, 'USD')}</p>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
