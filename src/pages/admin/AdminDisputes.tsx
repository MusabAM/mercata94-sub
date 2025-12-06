import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MessageSquare, CheckCircle, Clock } from "lucide-react";

// Mock disputes data
const mockDisputes = [
  {
    id: "disp-001",
    type: "refund",
    productTitle: "Premium UI Kit Bundle",
    buyerEmail: "unhappy@example.com",
    sellerEmail: "john@example.com",
    reason: "Product files were corrupted and couldn't be opened",
    status: "open",
    createdAt: "2024-12-03T10:00:00Z",
    amount: 79,
  },
  {
    id: "disp-002",
    type: "copyright",
    productTitle: "Suspicious Product",
    buyerEmail: "reporter@example.com",
    sellerEmail: "unknown@example.com",
    reason: "This product appears to be stolen from another creator",
    status: "investigating",
    createdAt: "2024-12-01T14:30:00Z",
    amount: 5,
  },
  {
    id: "disp-003",
    type: "quality",
    productTitle: "Icon Set Collection",
    buyerEmail: "disappointed@example.com",
    sellerEmail: "john@example.com",
    reason: "Icons don't match the preview images",
    status: "resolved",
    createdAt: "2024-11-28T09:00:00Z",
    amount: 29,
  },
];

export default function AdminDisputes() {
  const openDisputes = mockDisputes.filter(d => d.status !== "resolved");

  return (
    <AdminLayout title="Disputes" subtitle="Handle customer disputes and issues">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-4 bg-midnight-light/30 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-500/10">
            <AlertTriangle className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <p className="text-sm text-cream/60">Open Disputes</p>
            <p className="text-2xl font-serif text-cream">{openDisputes.length}</p>
          </div>
        </div>
        <div className="glass-card p-4 bg-midnight-light/30 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-sapphire/10">
            <Clock className="h-6 w-6 text-sapphire" />
          </div>
          <div>
            <p className="text-sm text-cream/60">Avg. Resolution Time</p>
            <p className="text-2xl font-serif text-cream">2.3 days</p>
          </div>
        </div>
        <div className="glass-card p-4 bg-midnight-light/30 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-emerald-500/10">
            <CheckCircle className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-cream/60">Resolved (30d)</p>
            <p className="text-2xl font-serif text-cream">12</p>
          </div>
        </div>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {mockDisputes.map((dispute) => (
          <div key={dispute.id} className="glass-card p-6 bg-midnight-light/30">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  dispute.status === "open" 
                    ? "bg-amber-500/10" 
                    : dispute.status === "investigating"
                    ? "bg-sapphire/10"
                    : "bg-emerald-500/10"
                }`}>
                  <AlertTriangle className={`h-5 w-5 ${
                    dispute.status === "open" 
                      ? "text-amber-400" 
                      : dispute.status === "investigating"
                      ? "text-sapphire"
                      : "text-emerald-400"
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-cream">{dispute.productTitle}</h3>
                    <StatusBadge status={dispute.status} />
                    <span className="text-xs px-2 py-0.5 rounded bg-cream/10 text-cream/60 capitalize">
                      {dispute.type}
                    </span>
                  </div>
                  <p className="text-sm text-cream/70 mb-2">{dispute.reason}</p>
                  <div className="flex items-center gap-4 text-xs text-cream/50">
                    <span>Buyer: {dispute.buyerEmail}</span>
                    <span>Seller: {dispute.sellerEmail}</span>
                    <span>Amount: ${dispute.amount}</span>
                    <span>Opened: {new Date(dispute.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-cream/70 hover:text-cream">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Comment
                </Button>
                {dispute.status !== "resolved" && (
                  <Button variant="sapphire" size="sm">
                    Resolve
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
