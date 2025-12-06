import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { mockUsers, AdminUser } from "@/data/mockAdminData";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Ban, UserCog, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AdminUsers() {
  const handleAction = (action: string, user: AdminUser) => {
    toast({
      title: `Action: ${action}`,
      description: `Applied to ${user.name} (${user.email})`,
    });
  };

  const columns = [
    {
      key: "name",
      header: "User",
      render: (user: AdminUser) => (
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-cream/50">{user.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (user: AdminUser) => <StatusBadge status={user.role} />,
    },
    {
      key: "status",
      header: "Status",
      render: (user: AdminUser) => <StatusBadge status={user.status} />,
    },
    {
      key: "verified",
      header: "Verified",
      render: (user: AdminUser) => (
        <span className={user.verified ? "text-emerald-400" : "text-cream/40"}>
          {user.verified ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Joined",
    },
    {
      key: "lastLogin",
      header: "Last Login",
    },
    {
      key: "actions",
      header: "",
      render: (user: AdminUser) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-cream/50 hover:text-cream">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-midnight border-sapphire/20">
            <DropdownMenuItem
              className="text-cream cursor-pointer"
              onClick={() => handleAction("View Details", user)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-cream cursor-pointer"
              onClick={() => handleAction("Change Role", user)}
            >
              <UserCog className="h-4 w-4 mr-2" />
              Change Role
            </DropdownMenuItem>
            {user.role !== "admin" && (
              <>
                <DropdownMenuSeparator className="bg-sapphire/20" />
                {user.status === "active" ? (
                  <DropdownMenuItem
                    className="text-rose-400 cursor-pointer"
                    onClick={() => handleAction("Ban User", user)}
                  >
                    <Ban className="h-4 w-4 mr-2" />
                    Ban User
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="text-emerald-400 cursor-pointer"
                    onClick={() => handleAction("Unban User", user)}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Unban User
                  </DropdownMenuItem>
                )}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AdminLayout title="Users" subtitle="Manage marketplace users">
      <DataTable
        data={mockUsers}
        columns={columns}
        searchPlaceholder="Search users..."
        filterOptions={[
          { value: "admin", label: "Admin" },
          { value: "seller", label: "Seller" },
          { value: "buyer", label: "Buyer" },
        ]}
        filterKey="role"
        onExport={() => toast({ title: "Export started", description: "CSV download will begin shortly" })}
      />
    </AdminLayout>
  );
}
