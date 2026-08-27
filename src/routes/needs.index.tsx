import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Tag } from "@/components/brand";
import { PublicShell } from "@/components/public-shell";
import { CATEGORIES, getCompany, money, needs } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/needs/")({
  head: () => ({
    meta: [
      { title: "Recurring Needs — BoxLead" },
      {
        name: "description",
        content:
          "Companies looking for someone to take ongoing responsibility for recurring work, with a defined scope and billing rhythm.",
      },
      { property: "og:title", content: "Recurring Needs — BoxLead" },
      { property: "og:description", content: "Ongoing work companies want covered — not one-off projects." },
    ],
  }),
  component: Needs,
});

function Needs() {
  const [category, setCategory] = useState<string | null>(null);
  const results = useMemo(
    () => needs.filter((n) => !category || n.category === category),
    [category],
  );

  return (
    <PublicShell>
      <section className="surface-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <h1 className="text-3xl font-extrabold text-ink-foreground sm:text-4xl">Recurring needs</h1>
          <p className="mt-3 max-w-xl text-ink-muted">
            Each of these is ongoing work a company wants someone to own — with the scope, rhythm and price
            written down up front.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              category === null ? "border-ink bg-ink text-ink-foreground" : "border-border hover:border-primary",
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
                category === c ? "border-ink bg-ink text-ink-foreground" : "border-border hover:border-primary",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {results.map((n) => {
            const company = getCompany(n.companyId);
            return (
              <Link
                key={n.id}
                to="/needs/$needId"
                params={{ needId: n.id }}
                className="block rounded-2xl border border-border bg-card p-6 shadow-card transition-colors hover:border-primary"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-lg font-bold">{n.title}</h2>
                  <p className="text-sm font-semibold">
                    {money(n.price)}
                    <span className="text-muted-foreground"> / {n.billing.toLowerCase()}</span>
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {company?.name} · {n.remote} · Posted {n.posted}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{n.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Tag>{n.category}</Tag>
                  <Tag>{n.workFrequency}</Tag>
                  <Tag>Starts {n.startTiming.toLowerCase()}</Tag>
                </div>
              </Link>
            );
          })}
        </div>

        {results.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-secondary/40 px-6 py-12 text-center">
            <h3 className="text-base font-semibold">No recurring needs in this category</h3>
            <p className="mt-1 text-sm text-muted-foreground">Try another category.</p>
          </div>
        ) : null}
      </section>
    </PublicShell>
  );
}
