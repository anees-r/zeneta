"use client";
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref}
    className={cn("flex h-9 w-full items-center justify-between rounded-md border border-violet-500/20 bg-violet-950/20 px-3 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50 disabled:opacity-50 transition-colors [&>span]:line-clamp-1", className)}
    {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-40" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content ref={ref}
      className={cn("relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-violet-500/20 bg-[#100d1a] text-white shadow-xl shadow-violet-900/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", position === "popper" && "translate-y-1", className)}
      position={position} {...props}>
      <SelectPrimitive.Viewport className={cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]")}>
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref}
    className={cn("relative flex w-full cursor-pointer select-none items-center rounded px-3 py-2 text-sm text-white/70 outline-none hover:bg-violet-800/40 hover:text-white focus:bg-violet-800/40 focus:text-white data-[disabled]:opacity-50 transition-colors", className)}
    {...props}>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref}
    className={cn("py-1.5 pl-3 pr-2 text-xs text-white/30 uppercase tracking-widest", className)} {...props} />
));
SelectLabel.displayName = "SelectLabel";

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem };
