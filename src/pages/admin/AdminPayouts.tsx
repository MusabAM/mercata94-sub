import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { mockPayouts, AdminPayout } from "@/data/mockAdminData";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AdminPayouts() {
  const handleAction = (action: string, payout: AdminPayout) => {
    toast({
      title: `Action: ${action}`,
      description: `Payout #${payout.id} for ${payout.sellerName}`,
    });
  };

  const columns = [
    {
      key: "id",
      header: "Payout ID",
      render: (payout: AdminPayout) => (
        <span className="font-mono text-xs">{payout.id}</span>
      ),
    },
    {
      key: "sellerName",
      header: "Seller",
      render: (payout: AdminPayout) => (
        <div>
          <p className="font-medium">{payout.sellerName}</p>
          <p className="text-xs text-cream/50">{payout.sellerEmail}</p>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (payout: AdminPayout) => (
        <span className="text-champagne font-medium">${payout.amount.toLocaleString()}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (payout: AdminPayout) => <StatusBadge status={payout.status} />,
    },
    {
      key: "requestedAt",
      header: "Requested",
      render: (payout: AdminPayout) => new Date(payout.requestedAt).toLocaleDateString(),
    },
    {
      key: "processedAt",
      header: "Processed",
      render: (payout: AdminPayout) =>
        payout.processedAt ? new Date(payout.processedAt).toLocaleDateString() : "—",
    },
    {
      key: "actions",
      header: "",
      render: (payout: AdminPayout) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-cream/50 hover:text-cream">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-midnight border-sapphire/20">
            <DropdownMenuItem
              className="text-cream cursor-pointer"
              onClick={() => handleAction("View Details", payout)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            {payout.status === "pending" && (
              <>
                <DropdownMenuItem
                  className="text-emerald-400 cursor-pointer"
                  onClick={() => handleAction("Mark as Processed", payout)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Processed
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-rose-400 cursor-pointer"
                  onClick={() => handleAction("Reject", payout)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // Summary stats
  const pendingAmount = mockPayouts
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  
  const processedAmount = mockPayouts
    .filter(p => p.status === "processed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <AdminLayout title="Payouts" subtitle="Manage seller payouts">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-4 bg-midnight-light/30">
          <p className="text-sm text-cream/60">Pending Payouts</p>
          <p className="text-2xl font-serif text-amber-400">${pendingAmount.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4 bg-midnight-light/30">
          <p className="text-sm text-cream/60">Processed (30d)</p>
          <p className="text-2xl font-serif text-emerald-400">${processedAmount.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4 bg-midnight-light/30">
          <p className="text-sm text-cream/60">Total Requests</p>
          <p className="text-2xl font-serif text-cream">{mockPayouts.length}</p>
        </div>
      </div>

      <DataTable
        data={mockPayouts}
        columns={columns}
        searchPlaceholder="Search payouts..."
        filterOptions={[
          { value: "pending", label: "Pending" },
          { value: "processed", label: "Processed" },
          { value: "failed", label: "Failed" },
        ]}
        filterKey="status"
        onExport={() => toast({ title: "Export started", description: "CSV download will begin shortly" })}
      />
    </AdminLayout>
  );
}
