// Mock data for admin panel development

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "seller" | "buyer";
  verified: boolean;
  createdAt: string;
  lastLogin: string;
  status: "active" | "banned" | "pending";
  salesCount?: number;
  totalRevenue?: number;
}

export interface AdminProduct {
  id: string;
  title: string;
  seller: string;
  sellerId: string;
  price: number;
  status: "draft" | "pending" | "published" | "flagged" | "removed";
  category: string;
  createdAt: string;
  sales: number;
  revenue: number;
}

export interface AdminOrder {
  id: string;
  productTitle: string;
  buyerEmail: string;
  sellerEmail: string;
  amount: number;
  platformFee: number;
  status: "pending" | "paid" | "failed" | "refunded";
  createdAt: string;
  paymentIntentId: string;
}

export interface AdminPayout {
  id: string;
  sellerEmail: string;
  sellerName: string;
  amount: number;
  status: "pending" | "processed" | "failed";
  requestedAt: string;
  processedAt?: string;
}

export interface AdminLog {
  id: string;
  adminEmail: string;
  actionType: string;
  targetId: string;
  targetType: string;
  details: string;
  timestamp: string;
  ip: string;
}

export const mockUsers: AdminUser[] = [
  {
    id: "usr-001",
    email: "john@example.com",
    name: "John Designer",
    role: "seller",
    verified: true,
    createdAt: "2024-01-15",
    lastLogin: "2024-12-04",
    status: "active",
    salesCount: 156,
    totalRevenue: 12450,
  },
  {
    id: "usr-002",
    email: "sarah@example.com",
    name: "Sarah Creative",
    role: "seller",
    verified: true,
    createdAt: "2024-02-20",
    lastLogin: "2024-12-03",
    status: "active",
    salesCount: 89,
    totalRevenue: 8920,
  },
  {
    id: "usr-003",
    email: "mike@example.com",
    name: "Mike Buyer",
    role: "buyer",
    verified: true,
    createdAt: "2024-03-10",
    lastLogin: "2024-12-01",
    status: "active",
  },
  {
    id: "usr-004",
    email: "flagged@spam.com",
    name: "Suspicious User",
    role: "buyer",
    verified: false,
    createdAt: "2024-11-28",
    lastLogin: "2024-11-29",
    status: "banned",
  },
  {
    id: "usr-005",
    email: "admin@94mercato.com",
    name: "Admin User",
    role: "admin",
    verified: true,
    createdAt: "2024-01-01",
    lastLogin: "2024-12-05",
    status: "active",
  },
];

export const mockProducts: AdminProduct[] = [
  {
    id: "prod-001",
    title: "Premium UI Kit Bundle",
    seller: "John Designer",
    sellerId: "usr-001",
    price: 79,
    status: "published",
    category: "UI Kits",
    createdAt: "2024-06-15",
    sales: 234,
    revenue: 18486,
  },
  {
    id: "prod-002",
    title: "E-commerce Template Pack",
    seller: "Sarah Creative",
    sellerId: "usr-002",
    price: 49,
    status: "published",
    category: "Templates",
    createdAt: "2024-07-20",
    sales: 156,
    revenue: 7644,
  },
  {
    id: "prod-003",
    title: "Icon Set Collection",
    seller: "John Designer",
    sellerId: "usr-001",
    price: 29,
    status: "pending",
    category: "Icons",
    createdAt: "2024-12-01",
    sales: 0,
    revenue: 0,
  },
  {
    id: "prod-004",
    title: "Suspicious Product",
    seller: "Unknown Seller",
    sellerId: "usr-006",
    price: 5,
    status: "flagged",
    category: "Other",
    createdAt: "2024-11-30",
    sales: 0,
    revenue: 0,
  },
  {
    id: "prod-005",
    title: "Draft Design System",
    seller: "Sarah Creative",
    sellerId: "usr-002",
    price: 129,
    status: "draft",
    category: "Design Systems",
    createdAt: "2024-12-03",
    sales: 0,
    revenue: 0,
  },
];

export const mockOrders: AdminOrder[] = [
  {
    id: "ord-001",
    productTitle: "Premium UI Kit Bundle",
    buyerEmail: "mike@example.com",
    sellerEmail: "john@example.com",
    amount: 79,
    platformFee: 9.48,
    status: "paid",
    createdAt: "2024-12-04T10:30:00Z",
    paymentIntentId: "pi_3ABC123",
  },
  {
    id: "ord-002",
    productTitle: "E-commerce Template Pack",
    buyerEmail: "buyer2@example.com",
    sellerEmail: "sarah@example.com",
    amount: 49,
    platformFee: 5.88,
    status: "paid",
    createdAt: "2024-12-03T15:45:00Z",
    paymentIntentId: "pi_3DEF456",
  },
  {
    id: "ord-003",
    productTitle: "Premium UI Kit Bundle",
    buyerEmail: "refund@example.com",
    sellerEmail: "john@example.com",
    amount: 79,
    platformFee: 9.48,
    status: "refunded",
    createdAt: "2024-12-02T09:00:00Z",
    paymentIntentId: "pi_3GHI789",
  },
  {
    id: "ord-004",
    productTitle: "Icon Set Collection",
    buyerEmail: "pending@example.com",
    sellerEmail: "john@example.com",
    amount: 29,
    platformFee: 3.48,
    status: "pending",
    createdAt: "2024-12-05T08:00:00Z",
    paymentIntentId: "pi_3JKL012",
  },
];

export const mockPayouts: AdminPayout[] = [
  {
    id: "pay-001",
    sellerEmail: "john@example.com",
    sellerName: "John Designer",
    amount: 5420,
    status: "pending",
    requestedAt: "2024-12-04T12:00:00Z",
  },
  {
    id: "pay-002",
    sellerEmail: "sarah@example.com",
    sellerName: "Sarah Creative",
    amount: 2890,
    status: "pending",
    requestedAt: "2024-12-03T14:00:00Z",
  },
  {
    id: "pay-003",
    sellerEmail: "oldSeller@example.com",
    sellerName: "Old Seller",
    amount: 1500,
    status: "processed",
    requestedAt: "2024-11-28T10:00:00Z",
    processedAt: "2024-11-30T16:00:00Z",
  },
];

export const mockLogs: AdminLog[] = [
  {
    id: "log-001",
    adminEmail: "admin@94mercato.com",
    actionType: "user_banned",
    targetId: "usr-004",
    targetType: "user",
    details: "Banned user for spam activity",
    timestamp: "2024-12-04T16:30:00Z",
    ip: "192.168.1.1",
  },
  {
    id: "log-002",
    adminEmail: "admin@94mercato.com",
    actionType: "product_flagged",
    targetId: "prod-004",
    targetType: "product",
    details: "Flagged product for review - suspicious pricing",
    timestamp: "2024-12-04T14:20:00Z",
    ip: "192.168.1.1",
  },
  {
    id: "log-003",
    adminEmail: "admin@94mercato.com",
    actionType: "payout_processed",
    targetId: "pay-003",
    targetType: "payout",
    details: "Processed payout of $1500",
    timestamp: "2024-11-30T16:00:00Z",
    ip: "192.168.1.1",
  },
  {
    id: "log-004",
    adminEmail: "admin@94mercato.com",
    actionType: "settings_updated",
    targetId: "commission",
    targetType: "settings",
    details: "Updated platform commission from 10% to 12%",
    timestamp: "2024-11-25T09:00:00Z",
    ip: "192.168.1.1",
  },
];

export const mockKPIs = {
  totalRevenue: 45890,
  totalOrders: 542,
  newSellers: 23,
  openDisputes: 3,
  revenueChange: 12.5,
  ordersChange: 8.2,
  sellersChange: 15.0,
  disputesChange: -25.0,
};

export const mockSettings = {
  platformCommission: 0.12,
  siteTitle: "94mercato",
  featuredCollections: ["UI Kits", "Templates", "Icons"],
  maintenanceMode: false,
  allowNewSignups: true,
  requireEmailVerification: true,
};
