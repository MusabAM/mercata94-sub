import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "seller" | "buyer";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setMockUser: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const mockUsers: Record<string, User> = {
  admin: {
    id: "admin-001",
    email: "admin@mercato94.com",
    name: "Admin User",
    role: "admin",
  },
  seller: {
    id: "seller-001",
    email: "seller@mercato94.com",
    name: "Seller User",
    role: "seller",
  },
  buyer: {
    id: "buyer-001",
    email: "buyer@mercato94.com",
    name: "Buyer User",
    role: "buyer",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUsers.admin); // Default to admin for dev

  const isAdmin = user?.role === "admin";

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call an API
    if (email.includes("admin")) {
      setUser(mockUsers.admin);
      return true;
    } else if (email.includes("seller")) {
      setUser(mockUsers.seller);
      return true;
    } else {
      setUser(mockUsers.buyer);
      return true;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const setMockUser = (role: UserRole) => {
    setUser(mockUsers[role]);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, setMockUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
