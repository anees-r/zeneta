import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:     "bg-violet-700 text-white hover:bg-violet-600",
        ghost:       "hover:bg-violet-900/30 text-white/50 hover:text-white",
        outline:     "border border-violet-500/25 bg-transparent hover:bg-violet-900/30 text-white/70 hover:text-white",
        destructive: "bg-red-900/40 text-red-400 border border-red-500/20 hover:bg-red-900/60",
        lime:        "bg-lime-400 text-black font-semibold hover:bg-lime-300",
        "lime-outline": "border border-lime-400/40 text-lime-400 hover:bg-lime-400/10",
        purple:      "bg-violet-700 text-white hover:bg-violet-600",
        "purple-outline": "border border-violet-500/30 text-violet-300 hover:bg-violet-900/30",
        secondary:   "bg-violet-900/40 text-violet-200 border border-violet-500/20 hover:bg-violet-900/60",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm:   "h-7 rounded px-2.5 text-xs",
        lg:   "h-11 px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";
export { Button, buttonVariants };
