import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:shadow-elevated hover:scale-[1.02] active:scale-[0.98] rounded-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow-soft hover:bg-destructive/90 rounded-md",
        outline:
          "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground rounded-md",
        secondary:
          "bg-secondary text-secondary-foreground shadow-subtle hover:bg-secondary/80 rounded-md",
        ghost: 
          "hover:bg-secondary hover:text-secondary-foreground rounded-md",
        link: 
          "text-foreground underline-offset-4 hover:underline",
        // Midnight Sapphire variants
        sapphire:
          "bg-gradient-to-r from-sapphire to-sapphire-glow text-cream shadow-sapphire hover:shadow-elevated relative overflow-hidden rounded-md hover:scale-[1.02] active:scale-[0.98]",
        "sapphire-outline":
          "border border-sapphire/50 bg-sapphire/10 text-sapphire hover:bg-sapphire hover:text-cream transition-colors duration-300 rounded-md backdrop-blur-sm",
        champagne:
          "bg-gradient-to-r from-champagne to-gold text-midnight shadow-soft hover:shadow-elevated hover:scale-[1.02] active:scale-[0.98] rounded-md",
        "champagne-outline":
          "border border-champagne/50 bg-champagne/10 text-champagne hover:bg-champagne hover:text-midnight transition-colors duration-300 rounded-md backdrop-blur-sm",
        // Legacy luxury variants (kept for compatibility)
        luxury:
          "bg-primary text-primary-foreground shadow-soft hover:shadow-elevated relative overflow-hidden rounded-md hover:scale-[1.02] active:scale-[0.98]",
        "luxury-outline":
          "border border-border bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300 rounded-md",
        "luxury-ghost":
          "text-foreground hover:text-accent-foreground rounded-md",
        // Midnight specific
        midnight:
          "bg-midnight-light text-cream border border-sapphire/30 hover:border-sapphire/50 hover:bg-midnight shadow-soft rounded-md backdrop-blur-sm",
        minimal:
          "text-muted-foreground hover:text-foreground transition-colors duration-200",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base font-medium tracking-wide",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };