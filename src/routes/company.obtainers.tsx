import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { DemoNote, Initials, PageHeading, Rating, Tag } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, money, obtainers } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/company/obtainers")({
  head: () => ({
    meta: [
      { title: "Find obtainers — BoxLead" },
      { name: "description", content: "Search obtainers who take ongoing responsibility for recurring work." },
      { property: "og:title", content: "Find obtainers — BoxLead" },
      { property: "og:description", content: "Search obtainers offering recurring services." },
    ],
  }),
  component: CompanyObtainers,
});

function CompanyObtainers() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return obtainers.filter(
      (o) =>
        (!category || o.categories.includes(category)) &&
        (!q || o.name.toLowerCase().includes(q) || o.headline.toLowerCase().includes(q)),
    );
  }, [query, category]);

  return (
    <>
      <PageHeading title="Obtainers" description="People offering recurring services you can build a relationship with." />

      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search obtainers" className="h-11 rounded-full px-5" />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium",
            category === null ? "border-ink bg-ink text-ink-foreground" : "border-border",
          )}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c === category ? null : c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium",
              category === c ? "border-ink bg-ink text-ink-foreground" : "border-border",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {results.map((o) => (
          <div key={o.id} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-3">
              <Initials value={o.initials} tone="primary" />
              <div className="min-w-0">
                <p className="truncate font-bold">{o.name}</p>
                <p className="truncate text-xs text-muted-foreground">{o.location}</p>
              </div>
            </div>
            <p className="mt-3 text-sm">{o.headline}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {o.categories.map((c) => (
                <Tag key={c}>{c}</Tag>
              ))}
            </div>
            <div className="mt-3">
              <Rating value={o.rating} count={o.reviewCount} />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
              <p className="text-sm font-bold">
                {money(o.fromPrice)}
                <span className="font-normal text-muted-foreground"> / {o.fromFrequency.toLowerCase()}</span>
              </p>
              <Button variant="ink" size="sm" asChild>
                <Link to="/browse/$obtainerId" params={{ obtainerId: o.id }}>
                  View profile
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <DemoNote>Demo build — obtainer profiles are sample content.</DemoNote>
    </>
  );
}
