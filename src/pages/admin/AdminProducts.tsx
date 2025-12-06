import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { mockProducts, AdminProduct } from "@/data/mockAdminData";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, CheckCircle, XCircle, Flag, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AdminProducts() {
  const handleAction = (action: string, product: AdminProduct) => {
    toast({
      title: `Action: ${action}`,
      description: `Applied to "${product.title}"`,
    });
  };

  const columns = [
    {
      key: "title",
      header: "Product",
      render: (product: AdminProduct) => (
        <div>
          <p className="font-medium">{product.title}</p>
          <p className="text-xs text-cream/50">{product.seller}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
    },
    {
      key: "price",
      header: "Price",
      render: (product: AdminProduct) => `$${product.price}`,
    },
    {
      key: "status",
      header: "Status",
      render: (product: AdminProduct) => <StatusBadge status={product.status} />,
    },
    {
      key: "sales",
      header: "Sales",
    },
    {
      key: "revenue",
      header: "Revenue",
      render: (product: AdminProduct) => `$${product.revenue.toLocaleString()}`,
    },
    {
      key: "createdAt",
      header: "Created",
    },
    {
      key: "actions",
      header: "",
      render: (product: AdminProduct) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-cream/50 hover:text-cream">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-midnight border-sapphire/20">
            <DropdownMenuItem
              className="text-cream cursor-pointer"
              onClick={() => handleAction("View Details", product)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            {product.status === "pending" && (
              <>
                <DropdownMenuItem
                  className="text-emerald-400 cursor-pointer"
                  onClick={() => handleAction("Approve", product)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-rose-400 cursor-pointer"
                  onClick={() => handleAction("Reject", product)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </DropdownMenuItem>
              </>
            )}
            {product.status === "published" && (
              <DropdownMenuItem
                className="text-amber-400 cursor-pointer"
                onClick={() => handleAction("Unpublish", product)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Unpublish
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator className="bg-sapphire/20" />
            <DropdownMenuItem
              className="text-amber-400 cursor-pointer"
              onClick={() => handleAction("Flag", product)}
            >
              <Flag className="h-4 w-4 mr-2" />
              Flag for Review
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-rose-400 cursor-pointer"
              onClick={() => handleAction("Remove", product)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AdminLayout title="Products" subtitle="Manage marketplace products">
      <DataTable
        data={mockProducts}
        columns={columns}
        searchPlaceholder="Search products..."
        filterOptions={[
          { value: "draft", label: "Draft" },
          { value: "pending", label: "Pending" },
          { value: "published", label: "Published" },
          { value: "flagged", label: "Flagged" },
          { value: "removed", label: "Removed" },
        ]}
        filterKey="status"
        onExport={() => toast({ title: "Export started", description: "CSV download will begin shortly" })}
      />
    </AdminLayout>
  );
}
