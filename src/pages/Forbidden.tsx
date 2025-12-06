import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldX, Home, ArrowLeft } from "lucide-react";

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-rose-500/10 flex items-center justify-center">
          <ShieldX className="h-10 w-10 text-rose-400" />
        </div>
        <h1 className="font-serif text-4xl text-cream mb-4">403</h1>
        <h2 className="font-serif text-2xl text-cream/80 mb-4">Access Forbidden</h2>
        <p className="text-cream/60 mb-8">
          You don't have permission to access this page. This area is restricted to administrators only.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" className="border-sapphire/30 text-cream hover:bg-sapphire/20" asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button variant="sapphire" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
