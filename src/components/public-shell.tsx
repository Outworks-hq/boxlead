import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Search } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Logo } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { LEARN_TOPICS } from "@/lib/learn-more";
import { useSession } from "@/lib/session";

const navItems = [
  { to: "/for-companies", label: "For Companies" },
  { to: "/for-obtainers", label: "For Obtainers" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const session = useSession();

  return (
    <header className="surface-ink relative z-20">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Logo tone="light" />

        <nav className="hidden items-center gap-9 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-ink-foreground/85 transition-colors hover:text-ink-foreground"
              activeProps={{ className: "text-ink-foreground" }}
            >
              {item.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setLearnOpen(true)}
            onMouseLeave={() => setLearnOpen(false)}
          >
            <Link
              to="/learn-more"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-foreground/85 transition-colors hover:text-ink-foreground"
              activeProps={{ className: "text-ink-foreground" }}
            >
              Learn More <ChevronDown className="size-3.5" />
            </Link>
            {learnOpen ? (
              <div className="absolute right-0 top-full w-[22rem] pt-4">
                <div className="rounded-2xl border border-border bg-card p-3 shadow-card">
                  {LEARN_TOPICS.map((t) => (
                    <Link
                      key={t.slug}
                      to="/learn-more/$topic"
                      params={{ topic: t.slug }}
                      className="block rounded-xl px-4 py-3 transition-colors hover:bg-secondary"
                    >
                      <span className="block text-sm font-semibold text-foreground">{t.name}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{t.short}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </nav>


        <div className="hidden items-center gap-5 lg:flex">
          <Link
            to="/search"
            aria-label="Search BoxLead"
            className="inline-flex items-center gap-2 rounded-full border border-ink-border px-4 py-2 text-sm font-medium text-ink-foreground/85 transition-colors hover:text-ink-foreground"
            activeProps={{ className: "text-ink-foreground" }}
          >
            <Search className="size-4" /> Search
          </Link>
          {session ? (
            <Button variant="light" asChild>
              <Link to={session.role === "company" ? "/company" : "/obtainer"}>Go to dashboard</Link>
            </Button>
          ) : (
            <>
              <Link to="/auth" search={{ mode: "login" }} className="text-sm font-medium text-ink-foreground/85 hover:text-ink-foreground">
                Log in
              </Link>
              <Button variant="light" asChild>
                <Link to="/auth" search={{ mode: "signup" }}>
                  Get started
                </Link>
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-full border border-ink-border text-ink-foreground lg:hidden"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {open ? (
        <div className="border-t border-ink-border px-5 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-ink-foreground/85 hover:bg-ink-foreground/10"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/search"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-medium text-ink-foreground/85 hover:bg-ink-foreground/10"
            >
              <Search className="size-4" /> Search
            </Link>
            <Link
              to="/learn-more"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-ink-foreground/85 hover:bg-ink-foreground/10"
            >
              Learn More
            </Link>
            <div className="ml-3 flex flex-col gap-1 border-l border-ink-border pl-3">
              {LEARN_TOPICS.map((t) => (
                <Link
                  key={t.slug}
                  to="/learn-more/$topic"
                  params={{ topic: t.slug }}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 hover:bg-ink-foreground/10"
                >
                  <span className="block text-sm font-medium text-ink-foreground/85">{t.name}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">{t.short}</span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="mt-4 flex flex-col gap-3">
            {session ? (
              <Button variant="light" size="lg" asChild>
                <Link to={session.role === "company" ? "/company" : "/obtainer"}>Go to dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="onInk" size="lg" asChild>
                  <Link to="/auth" search={{ mode: "login" }}>
                    Log in
                  </Link>
                </Button>
                <Button variant="light" size="lg" asChild>
                  <Link to="/auth" search={{ mode: "signup" }}>
                    Get started
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="surface-ink">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              Work that repeats.
              <br />
              Relationships that last.
            </p>
          </div>
          <FooterColumn
            title="Platform"
            links={[
              { to: "/for-companies", label: "For Companies" },
              { to: "/for-obtainers", label: "For Obtainers" },
              { to: "/pricing", label: "Pricing" },
            ]}
          />
          <FooterColumn
            title="Resources"
            links={[
              { to: "/how-it-works", label: "How It Works" },
              { to: "/browse", label: "Browse Obtainers" },
              { to: "/needs", label: "Recurring needs" },
            ]}
          />
          <FooterColumn
            title="Account"
            links={[
              { to: "/auth", label: "Log in" },
              { to: "/auth", label: "Get started" },
            ]}
          />
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-ink-border pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BoxLead. All rights reserved.</p>
          <p>Demo build — sample content shown throughout.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-widest text-ink-muted">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-ink-foreground/85 hover:text-ink-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
