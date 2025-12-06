import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { mockKPIs, mockOrders, mockProducts } from "@/data/mockAdminData";
import { DollarSign, ShoppingCart, Users, AlertTriangle, Package, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default function AdminDashboard() {
  const pendingProducts = mockProducts.filter(p => p.status === "pending");
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <AdminLayout title="Dashboard" subtitle="Overview of your marketplace">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue (30d)"
          value={`$${mockKPIs.totalRevenue.toLocaleString()}`}
          change={mockKPIs.revenueChange}
          icon={DollarSign}
          iconColor="text-champagne"
        />
        <StatCard
          title="Orders (30d)"
          value={mockKPIs.totalOrders}
          change={mockKPIs.ordersChange}
          icon={ShoppingCart}
          iconColor="text-sapphire"
        />
        <StatCard
          title="New Sellers"
          value={mockKPIs.newSellers}
          change={mockKPIs.sellersChange}
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
            <Link to="/admin/logs">
              View Audit Logs
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
            {pendingProducts.length === 0 ? (
              <p className="text-cream/50 text-sm">No products pending approval</p>
            ) : (
              pendingProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-midnight/50">
                  <div>
                    <p className="text-sm text-cream font-medium">{product.title}</p>
                    <p className="text-xs text-cream/50">{product.seller} • ${product.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="sapphire" className="h-7 text-xs">
                      Approve
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs text-cream/60">
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
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-midnight/50">
                <div>
                  <p className="text-sm text-cream font-medium">{order.productTitle}</p>
                  <p className="text-xs text-cream/50">{order.buyerEmail}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-cream">${order.amount}</p>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
