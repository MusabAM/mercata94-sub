import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import {
    XCircle,
    RefreshCw,
    ShoppingCart,
    HelpCircle,
    ArrowLeft,
} from "lucide-react";

const PaymentCancel = () => {
    return (
        <>
            <Helmet>
                <title>Payment Cancelled — Mercato94</title>
                <meta name="description" content="Your payment was cancelled. Your cart items are still saved." />
            </Helmet>
            <Layout>
                <section className="min-h-screen flex items-center justify-center py-20">
                    <div className="container-luxury max-w-2xl">
                        {/* Cancel Card */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-midnight-light/80 to-midnight/60 border border-sapphire/30 p-8 md:p-12 text-center backdrop-blur-xl">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-sapphire/10 rounded-full blur-3xl" />

                            {/* Content */}
                            <div className="relative z-10 space-y-8">
                                {/* Cancel Icon */}
                                <div className="flex justify-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl" />
                                        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30 flex items-center justify-center">
                                            <XCircle className="w-12 h-12 text-red-400" />
                                        </div>
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="space-y-3">
                                    <p className="text-red-400 text-sm font-medium tracking-widest uppercase">
                                        Payment Cancelled
                                    </p>
                                    <h1 className="heading-large text-cream">
                                        Your Payment Was Cancelled
                                    </h1>
                                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                                        No worries! Your cart items are still saved and you can try again whenever you're ready.
                                    </p>
                                </div>

                                {/* Info Cards */}
                                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                                    <div className="p-5 rounded-xl bg-midnight/50 border border-sapphire/10 text-left">
                                        <ShoppingCart className="w-6 h-6 text-champagne mb-3" />
                                        <p className="text-sm text-cream font-medium mb-1">Cart Preserved</p>
                                        <p className="text-sm text-muted-foreground">
                                            All your items are still in your cart, ready when you are.
                                        </p>
                                    </div>
                                    <div className="p-5 rounded-xl bg-midnight/50 border border-sapphire/10 text-left">
                                        <HelpCircle className="w-6 h-6 text-champagne mb-3" />
                                        <p className="text-sm text-cream font-medium mb-1">Need Help?</p>
                                        <p className="text-sm text-muted-foreground">
                                            Having issues? Contact our support team for assistance.
                                        </p>
                                    </div>
                                </div>

                                {/* Common Reasons */}
                                <div className="p-5 rounded-xl bg-sapphire/5 border border-sapphire/10 text-left">
                                    <p className="text-sm text-cream font-medium mb-3">Common reasons for cancellation:</p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-start gap-2">
                                            <span className="text-champagne mt-0.5">•</span>
                                            Payment method declined or expired
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-champagne mt-0.5">•</span>
                                            Browser or connection issues
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-champagne mt-0.5">•</span>
                                            Clicked cancel or closed the payment window
                                        </li>
                                    </ul>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                    <Button variant="luxury" size="lg" asChild>
                                        <Link to="/cart">
                                            <RefreshCw className="mr-2 h-5 w-5" />
                                            Try Again
                                        </Link>
                                    </Button>
                                    <Button variant="luxury-outline" size="lg" asChild>
                                        <Link to="/products">
                                            <ArrowLeft className="mr-2 h-5 w-5" />
                                            Continue Shopping
                                        </Link>
                                    </Button>
                                </div>

                                {/* Support Link */}
                                <p className="text-sm text-muted-foreground">
                                    Still having issues?{" "}
                                    <Link to="/contact" className="text-champagne hover:underline">
                                        Contact Support
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default PaymentCancel;
