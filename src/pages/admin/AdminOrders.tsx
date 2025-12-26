import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, RotateCcw, Receipt, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { formatPrice } from "@/lib/utils";

interface Order {
  id: number;
  productTitle: string;
  buyerEmail: string;
  buyerName: string;
  amount: number;
  status: string;
  purchasedAt: string;
  itemCount: number;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/admin/orders?limit=100');
        setOrders(response.data.orders || []);
      } catch (err: any) {
        console.error('Error fetching orders:', err);
        toast({
          title: "Error",
          description: "Failed to load orders.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleAction = (action: string, order: Order) => {
    toast({
      title: `Action: ${action}`,
      description: `Order #${order.id}`,
    });
  };

  const columns = [
    {
      key: "id",
      header: "Order ID",
      render: (order: Order) => (
        <span className="font-mono text-xs">#{order.id}</span>
      ),
    },
    {
      key: "productTitle",
      header: "Product",
      render: (order: Order) => (
        <div>
          <p className="font-medium">{order.productTitle}</p>
          <p className="text-xs text-cream/50">{order.buyerEmail}</p>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (order: Order) => formatPrice(order.amount * 100, 'USD'),
    },
    {
      key: "status",
      header: "Status",
      render: (order: Order) => <StatusBadge status={order.status} />,
    },
    {
      key: "purchasedAt",
      header: "Date",
      render: (order: Order) => order.purchasedAt
        ? new Date(order.purchasedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'N/A',
    },
    {
      key: "actions",
      header: "",
      render: (order: Order) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-cream/50 hover:text-cream">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-midnight border-sapphire/20">
            <DropdownMenuItem
              className="text-cream cursor-pointer"
              onClick={() => handleAction("View Details", order)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-cream cursor-pointer"
              onClick={() => handleAction("View Receipt", order)}
            >
              <Receipt className="h-4 w-4 mr-2" />
              View Receipt
            </DropdownMenuItem>
            {order.status === "paid" && (
              <DropdownMenuItem
                className="text-amber-400 cursor-pointer"
                onClick={() => handleAction("Issue Refund", order)}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Issue Refund
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isLoading) {
    return (
      <AdminLayout title="Orders" subtitle="View and manage orders">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-champagne" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Orders" subtitle="View and manage orders">
      <DataTable
        data={orders}
        columns={columns}
        searchPlaceholder="Search orders..."
        filterOptions={[
          { value: "pending", label: "Pending" },
          { value: "paid", label: "Paid" },
          { value: "failed", label: "Failed" },
          { value: "refunded", label: "Refunded" },
        ]}
        filterKey="status"
        onExport={() => toast({ title: "Export started", description: "CSV download will begin shortly" })}
      />
    </AdminLayout>
  );
}
