import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Initials, Logo } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { companies, DEMO_COMPANY_ID, DEMO_OBTAINER_ID, obtainers } from "@/lib/data";
import { signOut, useSession, type Role } from "@/lib/session";
import { cn } from "@/lib/utils";

const companyNav = [
  { to: "/company", label: "Overview", exact: true },
  { to: "/company/needs", label: "Recurring Needs" },
  { to: "/company/obtainers", label: "Obtainers" },
  { to: "/company/services", label: "Active Services" },
  { to: "/company/pools", label: "Free Pools" },
  { to: "/company/messages", label: "Messages" },
  { to: "/company/payments", label: "Payments" },
  { to: "/company/settings", label: "Settings" },
] as const;

const obtainerNav = [
  { to: "/obtainer", label: "Overview", exact: true },
  { to: "/obtainer/find-work", label: "Find Work" },
  { to: "/obtainer/services", label: "My Services" },
  { to: "/obtainer/relationships", label: "Active Relationships" },
  { to: "/obtainer/pools", label: "Free Pools" },
  { to: "/obtainer/links", label: "Private Links" },
  { to: "/obtainer/messages", label: "Messages" },
  { to: "/obtainer/earnings", label: "Earnings" },
  { to: "/obtainer/profile", label: "Profile" },
] as const;

export function AppShell({ role, children }: { role: Role; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const session = useSession();
  const nav = role === "company" ? companyNav : obtainerNav;

  const account =
    role === "company"
      ? companies.find((c) => c.id === DEMO_COMPANY_ID)!
      : obtainers.find((o) => o.id === DEMO_OBTAINER_ID)!;
  const displayName = session?.name ?? account.name;

  const sidebar = (
    <div className="flex h-full flex-col gap-8 px-5 py-7">
      <Logo tone="light" />
      <nav className="flex flex-1 flex-col gap-1">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setOpen(false)}
            activeOptions={{ exact: "exact" in item ? item.exact : false }}
            className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-ink-foreground/10 hover:text-ink-foreground"
            activeProps={{ className: "bg-ink-foreground/12 text-ink-foreground" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="rounded-2xl border border-ink-border p-4">
        <div className="flex min-w-0 items-center gap-3">
          <Initials value={account.initials} size="sm" tone="primary" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-foreground">{displayName}</p>
            <p className="truncate text-xs capitalize text-ink-muted">{role} account</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            signOut();
            navigate({ to: "/" });
          }}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-border px-3 py-2 text-xs font-semibold text-ink-foreground hover:bg-ink-foreground/10"
        >
          <LogOut className="size-3.5" /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="surface-ink hidden w-72 shrink-0 lg:sticky lg:top-0 lg:block lg:h-screen">{sidebar}</aside>

      <div className="surface-ink flex h-16 items-center justify-between px-5 lg:hidden">
        <Logo tone="light" />
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="grid size-10 place-items-center rounded-full border border-ink-border text-ink-foreground"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/70" onClick={() => setOpen(false)} />
          <div className="surface-ink absolute inset-y-0 left-0 w-[86%] max-w-xs overflow-y-auto">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-6 grid size-9 place-items-center rounded-full border border-ink-border text-ink-foreground"
            >
              <X className="size-4" />
            </button>
            {sidebar}
          </div>
        </div>
      ) : null}

      <main className={cn("min-w-0 flex-1 px-5 py-8 sm:px-8 lg:py-10")}>
        <div className="mx-auto max-w-5xl space-y-8">{children}</div>
      </main>
    </div>
  );
}

export function AppTopActions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}

export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Button variant="ghost" size="sm" asChild>
      <Link to={to}>← {label}</Link>
    </Button>
  );
}
