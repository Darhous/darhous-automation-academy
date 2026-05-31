import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
}

function BaseIcon({
  className,
  children,
  viewBox = "0 0 24 24",
}: IconProps & { children: ReactNode; viewBox?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5 shrink-0", className)}
    >
      {children}
    </svg>
  );
}

export function SparkIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2Z" />
      <path d="M5 18l.9 2.1L8 21l-2.1.9L5 24l-.9-2.1L2 21l2.1-.9L5 18Z" />
    </BaseIcon>
  );
}

export function ArrowUpLeftIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M7 7h10v10" />
      <path d="M17 7 7 17" />
    </BaseIcon>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </BaseIcon>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </BaseIcon>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="m5 12 4.5 4.5L19 7" />
    </BaseIcon>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="m8 6 10 6-10 6V6Z" fill="currentColor" stroke="none" />
    </BaseIcon>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </BaseIcon>
  );
}

export function RefreshIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M21 12a9 9 0 1 1-3.2-6.9" />
      <path d="M21 4v6h-6" />
    </BaseIcon>
  );
}

export function SaveIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M5 5h11l3 3v11H5V5Z" />
      <path d="M9 5v5h6V5" />
      <path d="M9 19v-5h6v5" />
    </BaseIcon>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.2-4.2" />
    </BaseIcon>
  );
}

export function FilterIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </BaseIcon>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19c1.6-3 4-4.5 7-4.5S17.4 16 19 19" />
    </BaseIcon>
  );
}

export function LayersIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </BaseIcon>
  );
}

export function ChartIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M5 19V8" />
      <path d="M12 19V5" />
      <path d="M19 19v-9" />
    </BaseIcon>
  );
}

export function BotIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <rect x="5" y="8" width="14" height="10" rx="4" />
      <path d="M12 4v4" />
      <circle cx="9.5" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13" r="1" fill="currentColor" stroke="none" />
    </BaseIcon>
  );
}

export function NetworkIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="7" r="2.5" />
      <circle cx="18" cy="17" r="2.5" />
      <path d="M8.2 11l7.4-3" />
      <path d="M8.2 13l7.4 3" />
    </BaseIcon>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="m5 8 7 5 7-5" />
    </BaseIcon>
  );
}

export function FormIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
      <path d="M8 17h8" />
    </BaseIcon>
  );
}

export function BrandIcon({
  name,
  className,
}: {
  name: "instagram" | "linkedin" | "facebook" | "whatsapp";
  className?: string;
}) {
  const common = "h-4 w-4";

  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={cn(common, className)} aria-hidden="true">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5A3.95 3.95 0 0 0 7.75 20.2h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.55a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={cn(common, className)} aria-hidden="true">
        <path d="M5.5 8.5H2.8V21h2.7V8.5ZM4.15 3A1.58 1.58 0 1 0 4.2 6.16 1.58 1.58 0 0 0 4.15 3Zm17.05 10.37c0-3.8-2.03-5.57-4.74-5.57-2.18 0-3.15 1.2-3.69 2.05v-1.76h-2.7c.04 1.17 0 12.91 0 12.91h2.7v-7.21c0-.39.03-.78.14-1.06.31-.77 1.03-1.56 2.24-1.56 1.58 0 2.2 1.18 2.2 2.9V21h2.7v-7.63Z" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={cn(common, className)} aria-hidden="true">
        <path d="M13.3 21v-7.6h2.56l.38-2.96H13.3V8.56c0-.86.24-1.44 1.47-1.44h1.57V4.46A21.76 21.76 0 0 0 14.05 4c-2.27 0-3.82 1.39-3.82 3.94v2.5H7.66v2.96h2.57V21h3.07Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn(common, className)} aria-hidden="true">
      <path d="M17.47 14.38c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.15-.19.29-.73.94-.9 1.13-.16.19-.33.22-.62.07-.29-.14-1.2-.44-2.29-1.4-.85-.76-1.42-1.7-1.59-1.99-.16-.29-.02-.45.12-.6.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.56-.88-2.14-.23-.55-.47-.47-.64-.47h-.55c-.19 0-.5.07-.76.36s-1 1-1 2.44 1.02 2.83 1.17 3.02c.14.19 2 3.05 4.84 4.28.68.29 1.22.47 1.63.6.69.22 1.32.19 1.82.11.56-.08 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.36-.07-.12-.26-.19-.55-.33ZM12.01 2C6.49 2 2 6.48 2 12c0 1.94.55 3.75 1.5 5.28L2 22l4.85-1.47A9.95 9.95 0 0 0 12.01 22C17.52 22 22 17.52 22 12S17.52 2 12.01 2Zm0 18.16c-1.63 0-3.2-.44-4.57-1.27l-.33-.2-2.88.87.94-2.8-.21-.35A8.1 8.1 0 0 1 3.86 12a8.15 8.15 0 1 1 8.15 8.16Z" />
    </svg>
  );
}
