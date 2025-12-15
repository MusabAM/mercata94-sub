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

// Define a type for mock users that includes a password
type MockUser = User & { password?: string };

// Mock users for development
const mockUsers: Record<string, MockUser> = {
  admin: {
    id: "admin-001",
    email: "outbrix94@gmail.com",
    name: "Admin User",
    role: "admin",
    password: "jeroen",
  },
  seller: {
    id: "seller-001",
    email: "seller@mercato94.com",
    name: "Seller User",
    role: "seller",
    password: "password123",
  },
  buyer: {
    id: "buyer-001",
    email: "buyer@mercato94.com",
    name: "Buyer User",
    role: "buyer",
    password: "password123",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null); // Default to no user logged in

  const isAdmin = user?.role === "admin";

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - now checks email and password
    const userToLogin = Object.values(mockUsers).find(
      (u) => u.email === email && u.password === password
    );

    if (userToLogin) {
      const { password, ...userWithoutPassword } = userToLogin;
      setUser(userWithoutPassword);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const setMockUser = (role: UserRole) => {
    const mockUserToSet = mockUsers[role];
    if(mockUserToSet) {
      const { password, ...userWithoutPassword } = mockUserToSet;
      setUser(userWithoutPassword);
    }
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
