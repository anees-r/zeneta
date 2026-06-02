import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:  "border-violet-500/20 bg-violet-900/30 text-violet-300",
        purple:   "border-violet-500/30 bg-violet-900/40 text-violet-300",
        lime:     "border-lime-400/30 bg-lime-400/10 text-lime-400",
        active:   "border-lime-400/40 bg-lime-400/10 text-lime-400",
        ended:    "border-violet-500/15 bg-violet-900/20 text-white/30",
        live:     "border-lime-400/50 bg-lime-400/15 text-lime-300",
      },
    },
    defaultVariants: { variant: "default" },
  }
);
function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
export { Badge, badgeVariants };
