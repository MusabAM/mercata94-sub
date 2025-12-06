import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Wallet,
  Settings,
  FileText,
  AlertTriangle,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const adminNavItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Payouts", href: "/admin/payouts", icon: Wallet },
  { name: "Disputes", href: "/admin/disputes", icon: AlertTriangle },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Audit Logs", href: "/admin/logs", icon: FileText },
];

interface AdminSidebarProps {
  collapsed?: boolean;
  onCollapse?: () => void;
}

export function AdminSidebar({ collapsed = false, onCollapse }: AdminSidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-midnight border-r border-sapphire/20 transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sapphire/20">
          {!collapsed && (
            <Link to="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sapphire to-sapphire-glow flex items-center justify-center">
                <span className="font-serif text-sm font-semibold text-cream">M</span>
              </div>
              <span className="font-serif text-lg text-cream">
                Admin<span className="text-champagne">94</span>
              </span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onCollapse}
            className="text-cream/70 hover:text-cream hover:bg-sapphire/20"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {adminNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-sapphire/20 text-champagne border-l-2 border-champagne"
                    : "text-cream/70 hover:text-cream hover:bg-sapphire/10"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sapphire/20">
          {!collapsed && user && (
            <div className="mb-3 px-2">
              <p className="text-sm font-medium text-cream truncate">{user.name}</p>
              <p className="text-xs text-cream/50 truncate">{user.email}</p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size={collapsed ? "icon" : "sm"}
              className="text-cream/70 hover:text-cream hover:bg-sapphire/20 w-full justify-start"
              asChild
            >
              <Link to="/">
                <ChevronLeft className="h-4 w-4" />
                {!collapsed && <span className="ml-2">Back to Site</span>}
              </Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "sm"}
            onClick={logout}
            className="text-destructive/70 hover:text-destructive hover:bg-destructive/10 w-full justify-start mt-1"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
