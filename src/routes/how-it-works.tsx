import { createFileRoute, Link } from "@tanstack/react-router";

import { PublicShell } from "@/components/public-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — BoxLead" },
      {
        name: "description",
        content:
          "BoxLead in four parts: recurring needs, recurring services, confirmed scope, and Free Pools for the occasional extra task.",
      },
      { property: "og:title", content: "How It Works — BoxLead" },
      {
        property: "og:description",
        content: "Recurring needs, recurring services, confirmed scope and Free Pools.",
      },
    ],
  }),
  component: HowItWorks,
});

const blocks = [
  {
    title: "Recurring needs",
    body: "A company writes down work that repeats: what it covers, how often, what falls outside it and what they'll pay per cycle. Obtainers express interest with a short note.",
  },
  {
    title: "Recurring services",
    body: "An obtainer publishes an ongoing service they take responsibility for, with a fixed scope, price and billing rhythm. Companies can approach them directly.",
  },
  {
    title: "Confirmed scope",
    body: "Nothing starts until both sides confirm the same scope and price. Changes to a live relationship also need both confirmations, so neither side can quietly expand the work.",
  },
  {
    title: "Free Pools",
    body: "A private group of obtainers a company already trusts. Occasional tasks that sit outside any recurring scope can be posted there with their own compensation. Members choose what they accept.",
  },
  {
    title: "Billing that follows the rhythm",
    body: "Weekly, bi-weekly, monthly or quarterly. Payments repeat with the work until the relationship is paused or ended.",
  },
  {
    title: "Ending well",
    body: "Either side can pause or end a relationship. History stays on both accounts so future relationships start with real context.",
  },
];

function HowItWorks() {
  return (
    <PublicShell>
      <section className="surface-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <h1 className="max-w-2xl text-4xl font-extrabold text-ink-foreground sm:text-5xl">
            How BoxLead works
          </h1>
          <p className="mt-5 max-w-2xl text-ink-muted">
            One idea, applied consistently: recurring work belongs in a relationship with a defined scope,
            not in a stream of one-off jobs.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-lg font-bold">{b.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link to="/auth" search={{ mode: "signup" }}>
              Get started
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/pricing">See pricing</Link>
          </Button>
        </div>
      </section>
    </PublicShell>
  );
}
