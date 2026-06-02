import * as React from "react";
import { cn } from "@/lib/utils";
const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input type={type} ref={ref}
    className={cn("flex h-9 w-full rounded-md border border-violet-500/20 bg-violet-950/20 px-3 py-1 text-sm text-white placeholder:text-white/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 disabled:opacity-50 transition-colors", className)}
    {...props} />
));
Input.displayName = "Input";
export { Input };
