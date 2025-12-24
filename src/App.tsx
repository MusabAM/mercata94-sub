import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AIAssistantWidget } from "@/components/ai/AIAssistantWidget";
import { AuthProvider } from "@/contexts/AuthContext";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Sell from "./pages/Sell";
import SellerOnboarding from "./pages/SellerOnboarding";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import Legal from "./pages/Legal";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminPayouts from "./pages/admin/AdminPayouts";
import AdminDisputes from "./pages/admin/AdminDisputes";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminLogs from "./pages/admin/AdminLogs";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/sell/onboarding" element={<SellerOnboarding />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<SellerDashboard />} />
              <Route path="/purchases" element={<BuyerDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/403" element={<Forbidden />} />
              <Route path="/legal" element={<Legal />} />

              {/* Admin Routes - Protected */}
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminDashboard />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <RequireAdmin>
                    <AdminUsers />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <RequireAdmin>
                    <AdminProducts />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <RequireAdmin>
                    <AdminOrders />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/payouts"
                element={
                  <RequireAdmin>
                    <AdminPayouts />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/disputes"
                element={
                  <RequireAdmin>
                    <AdminDisputes />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <RequireAdmin>
                    <AdminSettings />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/logs"
                element={
                  <RequireAdmin>
                    <AdminLogs />
                  </RequireAdmin>
                }
              />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AIAssistantWidget />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
