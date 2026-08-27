import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Initials, Rating, Tag } from "@/components/brand";
import { PublicShell } from "@/components/public-shell";
import { Input } from "@/components/ui/input";
import { CATEGORIES, money, obtainers, servicesByObtainer } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/browse/")({
  head: () => ({
    meta: [
      { title: "Browse Obtainers — BoxLead" },
      {
        name: "description",
        content:
          "Find obtainers who take ongoing responsibility for recurring work: design, QA, bookkeeping, marketing, maintenance and automation.",
      },
      { property: "og:title", content: "Browse Obtainers — BoxLead" },
      { property: "og:description", content: "Obtainers offering recurring services with a fixed scope and rhythm." },
    ],
  }),
  component: Browse,
});

function Browse() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return obtainers.filter((o) => {
      const matchesCategory = !category || o.categories.includes(category);
      const matchesQuery =
        !q ||
        o.name.toLowerCase().includes(q) ||
        o.headline.toLowerCase().includes(q) ||
        o.skills.some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <PublicShell>
      <section className="surface-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <h1 className="text-3xl font-extrabold text-ink-foreground sm:text-4xl">Browse obtainers</h1>
          <p className="mt-3 max-w-xl text-ink-muted">
            Everyone here offers recurring services — ongoing responsibility, not one-off projects.
          </p>
          <div className="mt-7 max-w-lg">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, service or skill"
              className="h-12 rounded-full border-ink-border bg-ink-foreground/10 px-5 text-ink-foreground placeholder:text-ink-muted"
            />
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
          {results.length} obtainer{results.length === 1 ? "" : "s"}
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((o) => {
            const svc = servicesByObtainer(o.id)[0];
            return (
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
                  <p>
                    <span className="font-bold">{money(o.fromPrice)}</span>
                    <span className="text-muted-foreground"> / {o.fromFrequency.toLowerCase()}</span>
                  </p>
                  {svc ? <p className="mt-1 text-xs text-muted-foreground">{svc.title}</p> : null}
                  <p className="mt-1 text-xs text-muted-foreground">{o.availability}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {results.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-secondary/40 px-6 py-12 text-center">
            <h3 className="text-base font-semibold">No obtainers match that search</h3>
            <p className="mt-1 text-sm text-muted-foreground">Try a different category or clear the search.</p>
          </div>
        ) : null}
      </section>
    </PublicShell>
  );
}
