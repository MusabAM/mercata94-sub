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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontal, Eye, Ban, UserCog, Shield, Loader2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";

// Type matching the expected frontend format
interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "seller" | "buyer";
  verified: boolean;
  createdAt: string;
  lastLogin: string;
  status: "active" | "banned" | "pending";
  balance?: number;
}

// Type for backend response
interface BackendUser {
  id: number;
  display_name: string;
  email: string;
  role: "admin" | "seller" | "buyer";
  is_verified: boolean;
  balance: number;
  created_at: string;
  status?: "active" | "banned" | "pending";
  last_login?: string;
}

// Type for detailed user info
interface UserDetails {
  id: number;
  email: string;
  display_name: string;
  name: string;
  bio: string;
  avatar_url: string;
  role: string;
  is_verified: boolean;
  balance: number;
  status: string;
  created_at: string;
  last_login: string;
  product_count: number;
  order_count: number;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [detailsModal, setDetailsModal] = useState(false);
  const [roleModal, setRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [newRole, setNewRole] = useState<string>("");

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      const backendUsers: BackendUser[] = response.data.users;

      // Map backend data to frontend format
      const mappedUsers: AdminUser[] = backendUsers.map(user => ({
        id: String(user.id),
        email: user.email,
        name: user.display_name || user.email.split('@')[0],
        role: user.role,
        verified: user.is_verified,
        createdAt: new Date(user.created_at).toLocaleDateString(),
        lastLogin: user.last_login ? new Date(user.last_login).toLocaleDateString() : "-",
        status: (user.status as "active" | "banned" | "pending") || "active",
        balance: user.balance,
      }));

      setUsers(mappedUsers);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch users:', err);
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  // View Details handler
  const handleViewDetails = async (user: AdminUser) => {
    setSelectedUser(user);
    setDetailsModal(true);
    setLoadingDetails(true);

    try {
      const response = await api.get(`/admin/users/${user.id}`);
      setUserDetails(response.data.user);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Could not load user details.",
        variant: "destructive",
      });
    } finally {
      setLoadingDetails(false);
    }
  };

  // Change Role handler
  const handleOpenRoleModal = (user: AdminUser) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setRoleModal(true);
  };

  const handleChangeRole = async () => {
    if (!selectedUser || !newRole) return;

    try {
      await api.patch(`/admin/users/${selectedUser.id}/role`, { role: newRole });

      // Update local state
      setUsers(prev => prev.map(u =>
        u.id === selectedUser.id ? { ...u, role: newRole as "admin" | "seller" | "buyer" } : u
      ));

      toast({
        title: "Role Updated",
        description: `${selectedUser.name} is now a ${newRole}.`,
      });
      setRoleModal(false);
    } catch (err: any) {
      toast({
        title: "Action Failed",
        description: err.response?.data?.message || "Could not change user role.",
        variant: "destructive",
      });
    }
  };

  // Toggle user verification status
  const handleVerifyToggle = async (user: AdminUser) => {
    const newStatus = !user.verified;

    try {
      await api.post(`/admin/verify-seller/${user.id}`, { status: newStatus });

      // Update local state
      setUsers(prev => prev.map(u =>
        u.id === user.id ? { ...u, verified: newStatus } : u
      ));

      toast({
        title: newStatus ? "User Verified" : "Verification Removed",
        description: `${user.name} is now ${newStatus ? 'verified' : 'unverified'}.`,
      });
    } catch (err: any) {
      toast({
        title: "Action Failed",
        description: err.response?.data?.message || "Could not update verification status.",
        variant: "destructive",
      });
    }
  };

  // Ban/Unban user
  const handleBanToggle = async (user: AdminUser) => {
    const newStatus = user.status === "active" ? "banned" : "active";

    try {
      await api.patch(`/admin/users/${user.id}/status`, { status: newStatus });

      // Update local state
      setUsers(prev => prev.map(u =>
        u.id === user.id ? { ...u, status: newStatus as "active" | "banned" } : u
      ));

      toast({
        title: newStatus === "banned" ? "User Banned" : "User Unbanned",
        description: `${user.name} has been ${newStatus === "banned" ? "banned" : "unbanned"}.`,
      });
    } catch (err: any) {
      toast({
        title: "Action Failed",
        description: err.response?.data?.message || "Could not update user status.",
        variant: "destructive",
      });
    }
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
      key: "balance",
      header: "Balance",
      render: (user: AdminUser) => (
        <span className="text-champagne font-medium">
          ${user.balance?.toFixed(2) || "0.00"}
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
              onClick={() => handleViewDetails(user)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-cream cursor-pointer"
              onClick={() => handleOpenRoleModal(user)}
            >
              <UserCog className="h-4 w-4 mr-2" />
              Change Role
            </DropdownMenuItem>

            {/* Verification Toggle */}
            <DropdownMenuSeparator className="bg-sapphire/20" />
            {user.verified ? (
              <DropdownMenuItem
                className="text-amber-400 cursor-pointer"
                onClick={() => handleVerifyToggle(user)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Remove Verification
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="text-emerald-400 cursor-pointer"
                onClick={() => handleVerifyToggle(user)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Verify User
              </DropdownMenuItem>
            )}

            {user.role !== "admin" && (
              <>
                <DropdownMenuSeparator className="bg-sapphire/20" />
                {user.status === "active" ? (
                  <DropdownMenuItem
                    className="text-rose-400 cursor-pointer"
                    onClick={() => handleBanToggle(user)}
                  >
                    <Ban className="h-4 w-4 mr-2" />
                    Ban User
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="text-emerald-400 cursor-pointer"
                    onClick={() => handleBanToggle(user)}
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

  if (isLoading) {
    return (
      <AdminLayout title="Users" subtitle="Manage marketplace users">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-champagne" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Users" subtitle="Manage marketplace users">
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Users" subtitle="Manage marketplace users">
      <DataTable
        data={users}
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

      {/* User Details Modal */}
      <Dialog open={detailsModal} onOpenChange={setDetailsModal}>
        <DialogContent className="bg-midnight border-sapphire/20 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-cream">User Details</DialogTitle>
            <DialogDescription className="text-cream/60">
              Full information for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>

          {loadingDetails ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-champagne" />
            </div>
          ) : userDetails ? (
            <div className="space-y-4 text-cream">
              <div className="flex items-center gap-4">
                {userDetails.avatar_url ? (
                  <img src={userDetails.avatar_url} alt="" className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-sapphire/20 flex items-center justify-center text-xl font-medium">
                    {userDetails.display_name?.charAt(0) || "U"}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">{userDetails.display_name}</h3>
                  <p className="text-cream/60 text-sm">{userDetails.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-stone/30 p-3 rounded">
                  <span className="text-cream/50">Role</span>
                  <p className="font-medium capitalize">{userDetails.role}</p>
                </div>
                <div className="bg-stone/30 p-3 rounded">
                  <span className="text-cream/50">Status</span>
                  <p className="font-medium capitalize">{userDetails.status || "active"}</p>
                </div>
                <div className="bg-stone/30 p-3 rounded">
                  <span className="text-cream/50">Verified</span>
                  <p className="font-medium">{userDetails.is_verified ? "Yes" : "No"}</p>
                </div>
                <div className="bg-stone/30 p-3 rounded">
                  <span className="text-cream/50">Balance</span>
                  <p className="font-medium text-champagne">${(userDetails.balance / 100).toFixed(2)}</p>
                </div>
                <div className="bg-stone/30 p-3 rounded">
                  <span className="text-cream/50">Products</span>
                  <p className="font-medium">{userDetails.product_count}</p>
                </div>
                <div className="bg-stone/30 p-3 rounded">
                  <span className="text-cream/50">Orders</span>
                  <p className="font-medium">{userDetails.order_count}</p>
                </div>
                <div className="bg-stone/30 p-3 rounded col-span-2">
                  <span className="text-cream/50">Bio</span>
                  <p className="font-medium">{userDetails.bio || "No bio"}</p>
                </div>
                <div className="bg-stone/30 p-3 rounded">
                  <span className="text-cream/50">Joined</span>
                  <p className="font-medium">{new Date(userDetails.created_at).toLocaleDateString()}</p>
                </div>
                <div className="bg-stone/30 p-3 rounded">
                  <span className="text-cream/50">Last Login</span>
                  <p className="font-medium">{userDetails.last_login ? new Date(userDetails.last_login).toLocaleDateString() : "-"}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-cream/60 text-center py-4">No details available</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Change Role Modal */}
      <Dialog open={roleModal} onOpenChange={setRoleModal}>
        <DialogContent className="bg-midnight border-sapphire/20 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-cream">Change User Role</DialogTitle>
            <DialogDescription className="text-cream/60">
              Update role for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Select value={newRole} onValueChange={setNewRole}>
              <SelectTrigger className="bg-stone/30 border-sapphire/20 text-cream">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-midnight border-sapphire/20">
                <SelectItem value="buyer" className="text-cream">Buyer</SelectItem>
                <SelectItem value="seller" className="text-cream">Seller</SelectItem>
                <SelectItem value="admin" className="text-cream">Admin</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setRoleModal(false)}>Cancel</Button>
              <Button onClick={handleChangeRole} disabled={newRole === selectedUser?.role}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
