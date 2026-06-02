import * as React from "react";
import { cn } from "@/lib/utils";
const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "flex h-9 w-full rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm text-white placeholder:text-white/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lime-400/50 focus-visible:border-lime-400/40 disabled:opacity-50 transition-colors",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
export { Input };
