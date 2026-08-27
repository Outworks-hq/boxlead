import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { DemoNote, PageHeading, Panel, Tag } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { CATEGORIES, getCompany, money, needs } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/obtainer/find-work")({
  head: () => ({
    meta: [
      { title: "Find recurring work — BoxLead" },
      { name: "description", content: "Browse companies looking for someone to take ongoing responsibility." },
      { property: "og:title", content: "Find recurring work — BoxLead" },
      { property: "og:description", content: "Recurring needs posted by companies." },
    ],
  }),
  component: FindWork,
});

function FindWork() {
  const [category, setCategory] = useState<string | null>(null);
  const results = useMemo(() => needs.filter((n) => !category || n.category === category), [category]);

  return (
    <>
      <PageHeading title="Find work" description="Only recurring needs are listed. Nothing here is a one-off project." />

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

      <div className="space-y-4">
        {results.map((n) => {
          const c = getCompany(n.companyId);
          return (
            <Panel key={n.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <Link to="/needs/$needId" params={{ needId: n.id }} className="text-lg font-bold hover:underline">
                  {n.title}
                </Link>
                <p className="text-sm font-semibold">
                  {money(n.price)}
                  <span className="text-muted-foreground"> / {n.billing.toLowerCase()}</span>
                </p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {c?.name} · {n.remote} · posted {n.posted}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{n.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Tag>{n.category}</Tag>
                <Tag>{n.workFrequency}</Tag>
                <Tag>Starts {n.startTiming.toLowerCase()}</Tag>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                <Button variant="ink" size="sm" onClick={() => toast.success("Interest sent — the company can now propose a scope (demo).")}>
                  Express interest
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/needs/$needId" params={{ needId: n.id }}>
                    View details
                  </Link>
                </Button>
              </div>
            </Panel>
          );
        })}
      </div>

      <DemoNote>Demo build — expressing interest does not notify anyone.</DemoNote>
    </>
  );
}
