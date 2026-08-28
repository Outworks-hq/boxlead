import { createFileRoute, Link } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Initials, Rating, Tag } from "@/components/brand";
import { PublicShell } from "@/components/public-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, getObtainer, money, obtainers, services } from "@/lib/data";
import { usePools } from "@/lib/pools-store";
import { serviceTaps } from "@/lib/servicetaps";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search BoxLead — Obtainers, recurring services & Free Pools" },
      {
        name: "description",
        content:
          "Search Obtainers, the recurring services they offer, ServiceTaps and public Free Pools. Browse openly — no account needed until you act.",
      },
      { property: "og:title", content: "Search BoxLead" },
      {
        property: "og:description",
        content: "One place to explore Obtainers, recurring services, ServiceTaps and public Free Pools.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

const TABS = ["All", "Obtainers", "Recurring services", "ServiceTaps", "Free Pools"] as const;
type Tab = (typeof TABS)[number];

function matches(q: string, ...fields: (string | undefined)[]) {
  if (!q) return true;
  return fields.some((f) => (f ?? "").toLowerCase().includes(q));
}

function SearchPage() {
  const session = useSession();
  const pools = usePools();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("All");
  const [category, setCategory] = useState<string | null>(null);

  const q = query.trim().toLowerCase();

  const obtainerResults = useMemo(
    () =>
      obtainers.filter(
        (o) =>
          (!category || o.categories.includes(category)) &&
          matches(q, o.name, o.headline, o.location, ...o.skills, ...o.categories),
      ),
    [q, category],
  );

  const serviceResults = useMemo(
    () =>
      services.filter(
        (s) =>
          (!category || s.category === category) &&
          matches(q, s.title, s.description, s.scope, s.category, getObtainer(s.obtainerId)?.name),
      ),
    [q, category],
  );

  const tapResults = useMemo(
    () =>
      serviceTaps.filter(
        (t) =>
          (!category || t.category === category) &&
          matches(q, t.title, t.summary, t.scope, t.category, getObtainer(t.obtainerId)?.name),
      ),
    [q, category],
  );

  const poolResults = useMemo(
    () => pools.filter((p) => !category && matches(q, p.name, p.description, p.ownerName, p.workDescription)),
    [q, category, pools],
  );

  const total =
    obtainerResults.length + serviceResults.length + tapResults.length + poolResults.length;

  const show = (t: Tab) => tab === "All" || tab === t;

  const authLink = (label: string) =>
    session ? (
      <Button variant="default" size="sm" asChild>
        <Link to={session.role === "company" ? "/company" : "/obtainer"}>{label}</Link>
      </Button>
    ) : (
      <Button variant="default" size="sm" asChild>
        <Link to="/auth" search={{ mode: "signup" }}>
          {label}
        </Link>
      </Button>
    );

  return (
    <PublicShell>
      <section className="surface-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <h1 className="text-3xl font-extrabold text-ink-foreground sm:text-4xl">Search BoxLead</h1>
          <p className="mt-3 max-w-2xl text-ink-muted">
            Obtainers, the recurring services they offer, ServiceTaps and public Free Pools — all in one place.
            Browsing is open; you only need an account when you start something.
          </p>

          <div className="relative mt-7 max-w-2xl">
            <SearchIcon className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search obtainers, services, ServiceTaps or pools"
              className="h-13 rounded-full border-ink-border bg-ink-foreground/10 py-3.5 pl-12 pr-5 text-ink-foreground placeholder:text-ink-muted"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  tab === t
                    ? "border-ink-foreground bg-ink-foreground text-ink"
                    : "border-ink-border text-ink-foreground/85 hover:text-ink-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              category === null ? "border-ink bg-ink text-ink-foreground" : "border-border text-foreground hover:border-primary",
            )}
          >
            All categories
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c === category ? null : c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                category === c ? "border-ink bg-ink text-ink-foreground" : "border-border text-foreground hover:border-primary",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {total} result{total === 1 ? "" : "s"}
          {query ? ` for "${query}"` : ""}
        </p>

        {show("Obtainers") && obtainerResults.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-lg font-bold">Obtainers</h2>
            <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {obtainerResults.map((o) => (
                <Link
                  key={o.id}
                  to="/browse/$obtainerId"
                  params={{ obtainerId: o.id }}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <Initials value={o.initials} tone="primary" />
                    <div className="min-w-0">
                      <p className="truncate font-bold">{o.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {o.location} · {o.remote ? "Remote" : "On-site"}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-medium leading-snug">{o.headline}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {o.categories.map((c) => (
                      <Tag key={c}>{c}</Tag>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Rating value={o.rating} count={o.reviewCount} />
                  </div>
                  <div className="mt-auto border-t border-border pt-4 text-sm">
                    <span className="font-bold">{money(o.fromPrice)}</span>
                    <span className="text-muted-foreground"> / {o.fromFrequency.toLowerCase()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {show("Recurring services") && serviceResults.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-lg font-bold">Recurring services</h2>
            <div className="mt-4 grid gap-5 md:grid-cols-2">
              {serviceResults.map((s) => {
                const o = getObtainer(s.obtainerId);
                return (
                  <div key={s.id} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-bold">{s.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {o?.name} · {s.category}
                        </p>
                      </div>
                      <p className="whitespace-nowrap text-sm font-bold">
                        {money(s.price)}
                        <span className="font-medium text-muted-foreground"> / {s.billing.toLowerCase()}</span>
                      </p>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{s.description}</p>
                    <p className="mt-3 text-sm">
                      <span className="font-semibold">Scope: </span>
                      {s.scope}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Rhythm: {s.serviceFrequency} · {s.availability}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {authLink("Start this service")}
                      {o ? (
                        <Link
                          to="/browse/$obtainerId"
                          params={{ obtainerId: o.id }}
                          className="text-sm font-semibold text-primary hover:underline"
                        >
                          View {o.name.split(" ")[0]}'s profile
                        </Link>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {show("ServiceTaps") && tapResults.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-lg font-bold">ServiceTaps</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Already-scoped, already-priced cycles of an existing service.
            </p>
            <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {tapResults.map((t) => {
                const o = getObtainer(t.obtainerId);
                return (
                  <div key={t.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
                    <p className="font-bold">{t.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {o?.name} · {t.category}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">{t.summary}</p>
                    <p className="mt-3 text-sm">
                      <span className="font-semibold">Scope: </span>
                      {t.scope}
                    </p>
                    <p className="mt-3 text-sm font-bold">
                      {money(t.price)} <span className="font-medium text-muted-foreground">· {t.turnaround}</span>
                    </p>
                    <div className="mt-auto pt-5">{authLink("Purchase tap")}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {show("Free Pools") && poolResults.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-lg font-bold">Public Free Pools</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Workspaces where owners stay connected with people they trust.
            </p>
            <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {poolResults.map((p) => (
                <div key={p.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
                  <p className="font-bold">{p.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {p.ownerName} · {p.ownerType}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {p.members.length} member{p.members.length === 1 ? "" : "s"} · {p.work.length} posted item
                    {p.work.length === 1 ? "" : "s"}
                  </p>
                  <div className="mt-auto pt-5">{authLink("Join pool")}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {total === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-secondary/40 px-6 py-12 text-center">
            <h3 className="text-base font-semibold">Nothing matches that search</h3>
            <p className="mt-1 text-sm text-muted-foreground">Try another word, or clear the category filter.</p>
          </div>
        ) : null}

        {!session ? (
          <p className="mt-10 rounded-2xl border border-border bg-secondary/40 px-6 py-5 text-sm text-muted-foreground">
            Browsing BoxLead is open to everyone. You only need an account to start a recurring service, purchase a
            ServiceTap, join or create a Free Pool, post work or handle payments.
          </p>
        ) : null}
      </section>
    </PublicShell>
  );
}
