"use client";

import * as React from "react";
import { ChevronDown, CircleXIcon, Check } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    viewportClassName?: string;
  }
>(
  (
    { className, children, position = "popper", viewportClassName, ...props },
    ref,
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "bg-popover text-popover-foreground relative z-50 min-w-[180px] overflow-hidden rounded-md border shadow-md",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1.5 data-[side=top]:-translate-y-1.5",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport className={cn("p-1", viewportClassName)}>
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-pointer items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    onReset?: () => void;
  }
>(({ className, children, onReset, ...props }, ref) => {
  const hasValue = !!props.value;

  return (
    <div
      className={cn(
        "placeholder:text-placeholder relative z-0 flex h-12 w-full items-center justify-between rounded-lg text-sm whitespace-nowrap shadow-sm focus:outline-none sm:h-10 [&>span]:line-clamp-1",
        className,
      )}
    >
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          "bg-search flex h-full w-full items-center rounded-lg pr-10 pl-3 text-left focus:ring-0 focus:ring-offset-0 focus:outline-none",
          "disabled:opacity-50",
        )}
        {...props}
      >
        <span
          className={cn(
            `w-full truncate pr-2 pl-1`,
            !hasValue && "text-placeholder text-[13px]",
          )}
        >
          {children}
        </span>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Icon className={cn(`absolute right-2`)}>
        {hasValue && onReset ? (
          <CircleXIcon
            className="h-4 w-4 cursor-pointer opacity-50"
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}
          />
        ) : (
          <ChevronDown className={cn("h-4 w-4 opacity-50")} />
        )}
      </SelectPrimitive.Icon>
    </div>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  onReset?: () => void;
  placeholder?: string;
  options: Option[];
  className?: string;
  scrollThreshold?: number;
  disabled?: boolean; // <-- 1. เพิ่ม prop 'disabled'
}

const CustomSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  CustomSelectProps
>(
  (
    {
      value,
      onValueChange,
      onReset,
      placeholder,
      options,
      className,
      scrollThreshold = 10,
      disabled = false, // <-- 2. รับค่า prop 'disabled'
    },
    ref,
  ) => {
    return (
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled} // <-- 3. ส่ง prop 'disabled' ไปยัง component หลักของ Radix
      >
        <SelectTrigger
          ref={ref}
          className={className}
          value={value}
          onReset={onReset}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          viewportClassName={
            options.length > scrollThreshold
              ? "max-h-[240px] overflow-y-auto pr-1"
              : ""
          }
        >
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
);
CustomSelect.displayName = "CustomSelect";

export { CustomSelect };
