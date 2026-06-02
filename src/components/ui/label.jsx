import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn("text-xs font-medium leading-none text-white/50 uppercase tracking-widest", className)}
    {...props}
  />
));
Label.displayName = "Label";
export { Label };
