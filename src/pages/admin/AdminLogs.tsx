import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { mockLogs, AdminLog } from "@/data/mockAdminData";
import { toast } from "@/hooks/use-toast";
import { FileText, User, Package, Wallet, Settings } from "lucide-react";

const actionTypeIcons: Record<string, typeof FileText> = {
  user_banned: User,
  product_flagged: Package,
  payout_processed: Wallet,
  settings_updated: Settings,
};

export default function AdminLogs() {
  const columns = [
    {
      key: "timestamp",
      header: "Time",
      render: (log: AdminLog) => (
        <span className="text-sm">
          {new Date(log.timestamp).toLocaleString()}
        </span>
      ),
    },
    {
      key: "actionType",
      header: "Action",
      render: (log: AdminLog) => {
        const Icon = actionTypeIcons[log.actionType] || FileText;
        return (
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-sapphire" />
            <span className="capitalize">{log.actionType.replace(/_/g, " ")}</span>
          </div>
        );
      },
    },
    {
      key: "adminEmail",
      header: "Admin",
    },
    {
      key: "targetType",
      header: "Target",
      render: (log: AdminLog) => (
        <div>
          <p className="capitalize">{log.targetType}</p>
          <p className="text-xs text-cream/50 font-mono">{log.targetId}</p>
        </div>
      ),
    },
    {
      key: "details",
      header: "Details",
      render: (log: AdminLog) => (
        <p className="text-sm text-cream/70 max-w-xs truncate">{log.details}</p>
      ),
    },
    {
      key: "ip",
      header: "IP Address",
      render: (log: AdminLog) => (
        <span className="font-mono text-xs text-cream/50">{log.ip}</span>
      ),
    },
  ];

  return (
    <AdminLayout title="Audit Logs" subtitle="Track all admin actions">
      <DataTable
        data={mockLogs}
        columns={columns}
        searchPlaceholder="Search logs..."
        filterOptions={[
          { value: "user_banned", label: "User Banned" },
          { value: "product_flagged", label: "Product Flagged" },
          { value: "payout_processed", label: "Payout Processed" },
          { value: "settings_updated", label: "Settings Updated" },
        ]}
        filterKey="actionType"
        onExport={() => toast({ title: "Export started", description: "CSV download will begin shortly" })}
      />
    </AdminLayout>
  );
}
