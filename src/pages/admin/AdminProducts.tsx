import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, CheckCircle, XCircle, Trash2, Loader2, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { formatPrice } from "@/lib/utils";

// Product type matching backend response
interface Product {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  currency: string;
  category: string | null;
  badge: string | null;
  images: string[];
  status: 'draft' | 'pending' | 'published' | 'rejected' | 'removed' | 'flagged';
  created_at: string;
  updated_at: string;
  seller_id: number;
  seller_name: string;
  seller_email: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from API
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/admin/products');
      setProducts(response.data.products);
    } catch (err: any) {
      console.error('Failed to fetch products:', err);
      setError(err.response?.data?.message || 'Failed to load products');
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Publish or reject a product
  const handleStatusChange = async (productId: number, status: 'published' | 'rejected' | 'pending') => {
    try {
      await api.patch(`/admin/products/${productId}/publish`, { status });
      toast({
        title: "Success",
        description: `Product ${status === 'published' ? 'approved' : status === 'rejected' ? 'rejected' : 'updated'} successfully.`,
      });
      // Refresh the product list
      fetchProducts();
    } catch (err: any) {
      console.error('Failed to update product status:', err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to update product status.",
        variant: "destructive",
      });
    }
  };

  // Delete a product
  const handleDelete = async (productId: number) => {
    try {
      await api.delete(`/products/${productId}`);
      toast({
        title: "Success",
        description: "Product removed successfully.",
      });
      fetchProducts();
    } catch (err: any) {
      console.error('Failed to delete product:', err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to remove product.",
        variant: "destructive",
      });
    }
  };

  // Download product file for validation
  const handleDownloadFile = async (productId: number) => {
    try {
      const response = await api.get(`/admin/products/${productId}/file`);
      const { downloadUrl, fileName } = response.data;

      // Open download URL in new tab
      window.open(downloadUrl, '_blank');

      toast({
        title: "Download Started",
        description: `Downloading ${fileName}...`,
      });
    } catch (err: any) {
      console.error('Failed to get download URL:', err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to download file.",
        variant: "destructive",
      });
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const columns = [
    {
      key: "title",
      header: "Product",
      render: (product: Product) => (
        <div>
          <p className="font-medium">{product.title}</p>
          <p className="text-xs text-cream/50">{product.seller_name}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (product: Product) => product.category || "—",
    },
    {
      key: "price",
      header: "Price",
      render: (product: Product) => formatPrice(product.price, product.currency),
    },
    {
      key: "status",
      header: "Status",
      render: (product: Product) => <StatusBadge status={product.status} />,
    },
    {
      key: "created_at",
      header: "Created",
      render: (product: Product) => formatDate(product.created_at),
    },
    {
      key: "actions",
      header: "",
      render: (product: Product) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-cream/50 hover:text-cream">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-midnight border-sapphire/20">
            <DropdownMenuItem
              className="text-cream cursor-pointer"
              onClick={() => window.open(`/products/${product.slug}`, '_blank')}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-cyan-400 cursor-pointer"
              onClick={() => handleDownloadFile(product.id)}
            >
              <Download className="h-4 w-4 mr-2" />
              Download File
            </DropdownMenuItem>
            {product.status === "pending" && (
              <>
                <DropdownMenuItem
                  className="text-emerald-400 cursor-pointer"
                  onClick={() => handleStatusChange(product.id, 'published')}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-rose-400 cursor-pointer"
                  onClick={() => handleStatusChange(product.id, 'rejected')}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </DropdownMenuItem>
              </>
            )}
            {product.status === "published" && (
              <DropdownMenuItem
                className="text-amber-400 cursor-pointer"
                onClick={() => handleStatusChange(product.id, 'pending')}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Unpublish
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator className="bg-sapphire/20" />
            <DropdownMenuItem
              className="text-rose-400 cursor-pointer"
              onClick={() => handleDelete(product.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isLoading) {
    return (
      <AdminLayout title="Products" subtitle="Manage marketplace products">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-champagne" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Products" subtitle="Manage marketplace products">
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchProducts}>Retry</Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Products" subtitle="Manage marketplace products">
      <DataTable
        data={products}
        columns={columns}
        searchPlaceholder="Search products..."
        filterOptions={[
          { value: "draft", label: "Draft" },
          { value: "pending", label: "Pending" },
          { value: "published", label: "Published" },
          { value: "rejected", label: "Rejected" },
          { value: "removed", label: "Removed" },
        ]}
        filterKey="status"
        onExport={() => toast({ title: "Export started", description: "CSV download will begin shortly" })}
      />
    </AdminLayout>
  );
}
