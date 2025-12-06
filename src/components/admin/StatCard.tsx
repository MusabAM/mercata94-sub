import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({ title, value, change, icon: Icon, iconColor = "text-sapphire" }: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="glass-card-elevated p-6 bg-midnight-light/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-cream/60 mb-1">{title}</p>
          <p className="text-3xl font-serif text-cream">{value}</p>
          {change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-sm",
              isPositive && "text-emerald-400",
              isNegative && "text-rose-400",
              !isPositive && !isNegative && "text-cream/50"
            )}>
              {isPositive && <TrendingUp className="h-4 w-4" />}
              {isNegative && <TrendingDown className="h-4 w-4" />}
              <span>{isPositive ? "+" : ""}{change}%</span>
              <span className="text-cream/40">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-lg bg-sapphire/10", iconColor)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
