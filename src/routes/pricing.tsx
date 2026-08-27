import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { PublicShell } from "@/components/public-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — BoxLead" },
      {
        name: "description",
        content:
          "BoxLead is free to join for companies and obtainers. A flat platform fee applies to each recurring payment.",
      },
      { property: "og:title", content: "Pricing — BoxLead" },
      { property: "og:description", content: "Free to join. A flat fee on recurring payments." },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  return (
    <PublicShell>
      <section className="surface-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <h1 className="text-4xl font-extrabold text-ink-foreground sm:text-5xl">Pricing</h1>
          <p className="mt-5 max-w-xl text-ink-muted">
            No subscriptions and no listing fees. BoxLead takes a flat fee on the recurring payments that
            flow through a relationship.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Companies</p>
            <p className="mt-4 text-4xl font-extrabold">
              5%<span className="text-base font-semibold text-muted-foreground"> per recurring payment</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Post unlimited recurring needs",
                "Approach any obtainer directly",
                "Free Pools for occasional extra tasks",
                "Pause, change or end any relationship",
              ].map((i) => (
                <li key={i} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {i}
                </li>
              ))}
            </ul>
            <Button className="mt-8 w-full" size="lg" asChild>
              <Link to="/auth" search={{ mode: "signup" }}>
                Create a company account
              </Link>
            </Button>
          </div>

          <div className="rounded-3xl bg-ink p-8 text-ink-foreground">
            <p className="text-xs font-bold uppercase tracking-widest text-ink-muted">Obtainers</p>
            <p className="mt-4 text-4xl font-extrabold">
              8%<span className="text-base font-semibold text-ink-muted"> per payout</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Publish unlimited recurring services",
                "Private Service Links for your own clients",
                "Express interest in recurring needs",
                "Set your own availability and openings",
              ].map((i) => (
                <li key={i} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-ink-foreground" /> {i}
                </li>
              ))}
            </ul>
            <Button variant="light" className="mt-8 w-full" size="lg" asChild>
              <Link to="/auth" search={{ mode: "signup" }}>
                Create an obtainer account
              </Link>
            </Button>
          </div>
        </div>

        <p className="mt-8 rounded-xl border border-dashed border-border bg-secondary/60 px-4 py-3 text-xs text-muted-foreground">
          Demo build — payments are simulated and no card is ever charged.
        </p>
      </section>
    </PublicShell>
  );
}
