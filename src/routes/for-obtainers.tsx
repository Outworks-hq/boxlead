import { createFileRoute, Link } from "@tanstack/react-router";

import { PublicShell } from "@/components/public-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/for-obtainers")({
  head: () => ({
    meta: [
      { title: "For Obtainers — BoxLead" },
      {
        name: "description",
        content:
          "Publish the recurring services you offer, set your price and rhythm, and hold a small number of lasting company relationships.",
      },
      { property: "og:title", content: "For Obtainers — BoxLead" },
      {
        property: "og:description",
        content: "Recurring services, predictable income, relationships you choose to keep.",
      },
    ],
  }),
  component: ForObtainers,
});

const steps = [
  {
    title: "Publish a recurring service",
    body: "Describe what you take responsibility for, what's included, what isn't, the price and the billing rhythm.",
  },
  {
    title: "Express interest in recurring needs",
    body: "Companies post needs that repeat. You send a short note — no bidding wars, no proposals for one-off projects.",
  },
  {
    title: "Confirm the scope",
    body: "Both sides confirm before the relationship starts. Out-of-scope work is agreed separately.",
  },
  {
    title: "Keep the relationship",
    body: "You choose how many relationships you hold. Availability is yours to set, and you can pause or end anytime.",
  },
];

function ForObtainers() {
  return (
    <PublicShell>
      <section className="surface-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <h1 className="max-w-2xl text-4xl font-extrabold text-ink-foreground sm:text-5xl">
            A handful of relationships beats a hundred one-off jobs.
          </h1>
          <p className="mt-5 max-w-2xl text-ink-muted">
            BoxLead is built for people who take ongoing responsibility for a company's recurring work — and
            who want that work, and that income, to repeat.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="light" size="lg" asChild>
              <Link to="/auth" search={{ mode: "signup" }}>
                Create an obtainer account
              </Link>
            </Button>
            <Button variant="onInk" size="lg" asChild>
              <Link to="/needs">See recurring needs</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <h2 className="text-3xl font-extrabold">How it works</h2>
        <ol className="mt-8 space-y-4">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-card">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-ink-foreground">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

      </section>
    </PublicShell>
  );
}
