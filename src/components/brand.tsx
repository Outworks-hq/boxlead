import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { AgreementStatus } from "@/lib/data";

export function Logo({ tone = "ink", className }: { tone?: "ink" | "light"; className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        "text-2xl font-extrabold tracking-tight",
        tone === "light" ? "text-ink-foreground" : "text-foreground",
        className,
      )}
    >
      BoxLead<span className="text-primary">.</span>
    </Link>
  );
}

export function Initials({
  value,
  size = "md",
  tone = "muted",
}: {
  value: string;
  size?: "sm" | "md" | "lg";
  tone?: "muted" | "primary" | "ink";
}) {
  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full font-bold",
        size === "sm" && "h-9 w-9 text-xs",
        size === "md" && "h-12 w-12 text-sm",
        size === "lg" && "h-20 w-20 text-xl",
        tone === "muted" && "bg-secondary text-secondary-foreground",
        tone === "primary" && "bg-primary-soft text-accent-foreground",
        tone === "ink" && "bg-ink text-ink-foreground",
      )}
    >
      {value}
    </span>
  );
}

const statusStyles: Record<AgreementStatus | string, string> = {
  Active: "bg-primary-soft text-accent-foreground",
  Pending: "bg-secondary text-muted-foreground",
  Paused: "bg-secondary text-foreground",
  Canceled: "bg-secondary text-muted-foreground",
  Ended: "bg-secondary text-muted-foreground",
  Open: "bg-primary-soft text-accent-foreground",
  Accepted: "bg-secondary text-foreground",
  Submitted: "bg-secondary text-foreground",
  Approved: "bg-primary-soft text-accent-foreground",
  Paid: "bg-secondary text-foreground",
  Failed: "bg-destructive/10 text-destructive",
};

export function StatusPill({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        statusStyles[status] ?? "bg-secondary text-foreground",
        className,
      )}
    >
      {status}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
      {children}
    </span>
  );
}

export function Rating({ value, count }: { value: number; count: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <Star className="size-4 fill-primary text-primary" />
      <span className="font-semibold text-foreground">{value.toFixed(1)}</span>
      <span>({count} reviews)</span>
    </span>
  );
}

export function DemoNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-border bg-secondary/60 px-4 py-3 text-xs text-muted-foreground">
      {children}
    </p>
  );
}

export function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </header>
  );
}

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section className={cn("rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6", className)}>
      {children}
    </section>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-secondary/40 px-6 py-12 text-center">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border py-3 last:border-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm font-semibold">{value}</dd>
    </div>
  );
}
