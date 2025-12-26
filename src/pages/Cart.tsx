import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import {
    ShoppingBag,
    Trash2,
    Plus,
    Minus,
    ArrowRight,
    ShoppingCart,
    Loader2,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/utils";
import api from "@/lib/api";
import { toast } from "sonner";

const Cart = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { items, removeItem, updateQuantity, clearCart } = useCartStore();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    // Calculate totals
    const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            removeItem(itemId);
        } else {
            updateQuantity(itemId, newQuantity);
        }
    };

    const handleCheckout = async () => {
        if (!user) {
            toast.error("Please login to checkout", {
                description: "You need to be logged in to complete your purchase.",
            });
            navigate("/login");
            return;
        }

        if (items.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        setIsCheckingOut(true);

        try {
            // Format items for the API
            const checkoutItems = items.map((item) => ({
                productId: parseInt(item.id),
                quantity: item.quantity,
            }));

            const response = await api.post("/orders/checkout", {
                items: checkoutItems,
            });

            // Redirect to Stripe checkout
            if (response.data.checkoutUrl) {
                window.location.href = response.data.checkoutUrl;
            } else {
                throw new Error("No checkout URL received");
            }
        } catch (error: any) {
            console.error("Checkout error:", error);
            toast.error("Checkout failed", {
                description:
                    error.response?.data?.message || "Please try again later.",
            });
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Shopping Cart — Mercato94</title>
                <meta
                    name="description"
                    content="Review your cart and proceed to checkout."
                />
            </Helmet>
            <Layout>
                <section className="pt-32 pb-20 min-h-screen">
                    <div className="container-luxury">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h1 className="heading-large mb-2">Shopping Cart</h1>
                                <p className="text-muted-foreground">
                                    {items.length === 0
                                        ? "Your cart is empty"
                                        : `${items.length} item${items.length > 1 ? "s" : ""} in your cart`}
                                </p>
                            </div>
                            {items.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        clearCart();
                                        toast.success("Cart cleared");
                                    }}
                                    className="text-muted-foreground hover:text-destructive"
                                >
                                    Clear Cart
                                </Button>
                            )}
                        </div>

                        {items.length === 0 ? (
                            /* Empty Cart State */
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-24 h-24 rounded-full bg-sapphire/10 flex items-center justify-center mb-6">
                                    <ShoppingBag className="h-12 w-12 text-sapphire/50" />
                                </div>
                                <h2 className="text-2xl font-serif font-medium mb-4">
                                    Your cart is empty
                                </h2>
                                <p className="text-muted-foreground mb-8 max-w-md">
                                    Looks like you haven't added any products yet. Browse our
                                    collection to find something you love.
                                </p>
                                <Button variant="luxury" size="lg" asChild>
                                    <Link to="/products">
                                        <ShoppingCart className="h-5 w-5 mr-2" />
                                        Browse Products
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            /* Cart Items */
                            <div className="grid lg:grid-cols-3 gap-12">
                                {/* Items List */}
                                <div className="lg:col-span-2 space-y-6">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-6 p-6 rounded-xl bg-midnight-light/30 border border-sapphire/20"
                                        >
                                            {/* Image */}
                                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-midnight flex-shrink-0">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                        <ShoppingBag className="h-8 w-8" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-cream truncate mb-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-champagne font-medium">
                                                    {formatPrice(item.price, item.currency || "USD")}
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full"
                                                    onClick={() =>
                                                        handleQuantityChange(item.id, item.quantity - 1)
                                                    }
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="w-8 text-center font-medium">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full"
                                                    onClick={() =>
                                                        handleQuantityChange(item.id, item.quantity + 1)
                                                    }
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            {/* Item Total & Remove */}
                                            <div className="flex flex-col items-end justify-between">
                                                <p className="font-medium text-cream">
                                                    {formatPrice(
                                                        item.price * item.quantity,
                                                        item.currency || "USD"
                                                    )}
                                                </p>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                    onClick={() => {
                                                        removeItem(item.id);
                                                        toast.success("Item removed from cart");
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Summary */}
                                <div className="lg:col-span-1">
                                    <div className="sticky top-24 p-6 rounded-xl bg-midnight-light/50 border border-sapphire/20 space-y-6">
                                        <h2 className="text-lg font-medium">Order Summary</h2>

                                        {/* Summary Lines */}
                                        <div className="space-y-4 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Subtotal</span>
                                                <span>{formatPrice(subtotal, "USD")}</span>
                                            </div>
                                            <div className="flex justify-between text-muted-foreground">
                                                <span>Processing Fee</span>
                                                <span>Calculated at checkout</span>
                                            </div>
                                        </div>

                                        <div className="border-t border-sapphire/20 pt-4">
                                            <div className="flex justify-between text-lg font-medium">
                                                <span>Total</span>
                                                <span className="text-champagne">
                                                    {formatPrice(subtotal, "USD")}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Checkout Button */}
                                        <Button
                                            variant="luxury"
                                            size="lg"
                                            className="w-full"
                                            onClick={handleCheckout}
                                            disabled={isCheckingOut || items.length === 0}
                                        >
                                            {isCheckingOut ? (
                                                <>
                                                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Proceed to Checkout
                                                    <ArrowRight className="h-5 w-5 ml-2" />
                                                </>
                                            )}
                                        </Button>

                                        {!user && (
                                            <p className="text-xs text-center text-muted-foreground">
                                                You'll need to{" "}
                                                <Link
                                                    to="/login"
                                                    className="text-champagne hover:underline"
                                                >
                                                    login
                                                </Link>{" "}
                                                to complete your purchase.
                                            </p>
                                        )}

                                        {/* Continue Shopping */}
                                        <Button
                                            variant="ghost"
                                            className="w-full"
                                            asChild
                                        >
                                            <Link to="/products">Continue Shopping</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default Cart;
