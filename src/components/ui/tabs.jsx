"use client";
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List ref={ref}
    className={cn("inline-flex items-center gap-1 rounded-lg border border-violet-500/15 bg-violet-950/30 p-1", className)}
    {...props} />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref}
    className={cn("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-1.5 text-sm font-medium text-white/40 transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-violet-700/50 data-[state=active]:text-violet-200 data-[state=active]:border data-[state=active]:border-violet-500/30 hover:text-white/70", className)}
    {...props} />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref}
    className={cn("mt-6 focus-visible:outline-none", className)}
    {...props} />
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
