"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { timeAgo } from "@/lib/utility/datetime";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import Link from "next/link";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

function ToolTipWrapper({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="border-border">{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
export function CustomTooltipContent({
  title,
  cta,
  href,
  target,
  onClick,
}: {
  title: string;
  cta?: string;
  href?: string;
  target?: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex max-w-xs flex-col items-center space-y-3 p-4 text-center">
      <p className="text-sm ">{title}</p>
      {cta &&
        (href ? (
          <Link
            href={href}
            {...(target ? { target } : {})}
            className="mt-4 w-full rounded-md border border-[#6a7689] bg-gradient-to-b from-[#455062] to-primary  px-3 py-1.5 text-center text-sm text-primary-foreground transition-colors duration-100 hover:from-[#455062]/0 hover:to-primary/0 hover:text-secondary-foreground"
          >
            {cta}
          </Link>
        ) : onClick ? (
          <button
            type="button"
            className="mt-4 w-full rounded-md border border-[#6a7689] bg-gradient-to-b from-[#455062] to-primary  px-3 py-1.5 text-center text-sm text-primary-foreground transition-colors duration-100 hover:from-[#455062]/0 hover:to-primary/0 hover:text-secondary-foreground"
            onClick={onClick}
          >
            {cta}
          </button>
        ) : null)}
    </div>
  );
}

export {
  ToolTipWrapper,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
};

export function InfoTooltip({
  content,
}: {
  content: React.ReactNode | string;
}) {
  return (
    <ToolTipWrapper content={content}>
      <HelpCircle className="h-4 w-4 text-gray-500" />
    </ToolTipWrapper>
  );
}

export function NumberTooltip({
  value,
  unit = "total clicks",
  children,
  lastClicked,
}: {
  value?: number | null;
  unit?: string;
  children: React.ReactNode;
  lastClicked?: Date | null;
}) {
  if ((!value || value < 1000) && !lastClicked) {
    return children;
  }
  return (
    <ToolTipWrapper
      content={
        <div className="block max-w-xs px-4 py-2 text-center text-sm text-secondary-foreground/70">
          <p className="text-sm font-semibold text-secondary-foreground/70">
            {value} {unit}
          </p>
          {lastClicked && (
            <p className="mt-1 text-xs text-gray-500" suppressHydrationWarning>
              Last clicked {timeAgo(lastClicked, { withAgo: true })}
            </p>
          )}
        </div>
      }
    >
      {children}
    </ToolTipWrapper>
  );
}
