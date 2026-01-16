import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateChipProps {
  date: string;
  showTime?: boolean;
  showTimezone?: boolean;
  showIcon?: boolean;
  className?: string;
}

export function DateChip({
  date,
  showTime = false,
  showTimezone = false,
  showIcon = true,
  className,
}: DateChipProps) {
  const dateObj = new Date(date);

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(showTime && { hour: "numeric", minute: "numeric" }),
    ...(showTime && showTimezone && { timeZoneName: "short" }),
  };

  // Use browser's default locale (undefined) for locale-aware formatting
  const formatted = dateObj.toLocaleDateString(undefined, formatOptions);

  return (
    <span className={cn("flex items-center gap-2 text-sm", className)}>
      {showIcon && <Calendar size={14} aria-hidden="true" />}
      <time dateTime={date}>{formatted}</time>
    </span>
  );
}
