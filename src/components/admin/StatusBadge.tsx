import { cn } from "@/lib/utils";

type StatusVariant = "success" | "warning" | "error" | "info" | "neutral";

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
}

const statusVariantMap: Record<string, StatusVariant> = {
  // User status
  active: "success",
  banned: "error",
  pending: "warning",
  
  // Product status
  published: "success",
  draft: "neutral",
  flagged: "error",
  removed: "error",
  
  // Order status
  paid: "success",
  failed: "error",
  refunded: "warning",
  
  // Payout status
  processed: "success",
  
  // Roles
  admin: "info",
  seller: "success",
  buyer: "neutral",
};

const variantStyles: Record<StatusVariant, string> = {
  success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  error: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  info: "bg-sapphire/20 text-sapphire border-sapphire/30",
  neutral: "bg-cream/10 text-cream/60 border-cream/20",
};

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const resolvedVariant = variant || statusVariantMap[status.toLowerCase()] || "neutral";
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize",
        variantStyles[resolvedVariant]
      )}
    >
      {status}
    </span>
  );
}
