import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { mockOrders, AdminOrder } from "@/data/mockAdminData";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, RotateCcw, Receipt } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AdminOrders() {
  const handleAction = (action: string, order: AdminOrder) => {
    toast({
      title: `Action: ${action}`,
      description: `Order #${order.id}`,
    });
  };

  const columns = [
    {
      key: "id",
      header: "Order ID",
      render: (order: AdminOrder) => (
        <span className="font-mono text-xs">{order.id}</span>
      ),
    },
    {
      key: "productTitle",
      header: "Product",
      render: (order: AdminOrder) => (
        <div>
          <p className="font-medium">{order.productTitle}</p>
          <p className="text-xs text-cream/50">{order.buyerEmail}</p>
        </div>
      ),
    },
    {
      key: "sellerEmail",
      header: "Seller",
    },
    {
      key: "amount",
      header: "Amount",
      render: (order: AdminOrder) => `$${order.amount}`,
    },
    {
      key: "platformFee",
      header: "Platform Fee",
      render: (order: AdminOrder) => (
        <span className="text-champagne">${order.platformFee.toFixed(2)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (order: AdminOrder) => <StatusBadge status={order.status} />,
    },
    {
      key: "createdAt",
      header: "Date",
      render: (order: AdminOrder) => new Date(order.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "",
      render: (order: AdminOrder) => (
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

  return (
    <AdminLayout title="Orders" subtitle="View and manage orders">
      <DataTable
        data={mockOrders}
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
