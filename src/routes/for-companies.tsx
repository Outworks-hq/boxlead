import { createFileRoute, Link } from "@tanstack/react-router";

import { PublicShell } from "@/components/public-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/for-companies")({
  head: () => ({
    meta: [
      { title: "For Companies — BoxLead" },
      {
        name: "description",
        content:
          "Find obtainers who take ongoing responsibility for your recurring work, with an agreed scope and a billing rhythm you control.",
      },
      { property: "og:title", content: "For Companies — BoxLead" },
      {
        property: "og:description",
        content: "Recurring services with defined scope, agreed price and a rhythm that repeats.",
      },
    ],
  }),
  component: ForCompanies,
});

const steps = [
  {
    title: "Describe the recurring need",
    body: "What repeats, how often, what's covered and what isn't. This is not a job post — it's an ongoing service you want someone to own.",
  },
  {
    title: "Review interested obtainers",
    body: "Obtainers express interest with a note. You can also approach any obtainer directly from their profile.",
  },
  {
    title: "Confirm the scope and price",
    body: "Both sides confirm before anything starts. Nothing changes later without both confirmations.",
  },
  {
    title: "The relationship runs",
    body: "Work happens on the agreed rhythm and billing follows it. Pause, change or end it whenever the relationship changes.",
  },
];




function ForCompanies() {
  return (
    <PublicShell>
      <section className="surface-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <h1 className="max-w-2xl text-4xl font-extrabold text-ink-foreground sm:text-5xl">
            Keep a small core team. Keep the recurring work covered.
          </h1>
          <p className="mt-5 max-w-2xl text-ink-muted">
            BoxLead is for the work that comes back every week or every month — design updates, QA passes,
            bookkeeping, site maintenance. You hand it to an obtainer who takes responsibility for it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="light" size="lg" asChild>
              <Link to="/auth" search={{ mode: "signup" }}>
                Create a company account
              </Link>
            </Button>
            <Button variant="onInk" size="lg" asChild>
              <Link to="/browse">Browse obtainers</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <h2 className="text-3xl font-extrabold">How a relationship starts</h2>
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

        <div className="mt-12 rounded-2xl border border-border bg-secondary/50 p-6 sm:p-8">
          <h3 className="text-lg font-bold">Free Pools</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Keep a private group of obtainers you have worked with before. When something small falls outside
            an existing scope, post it to the pool — members choose whether to accept. Membership never
            obligates anyone to work.
          </p>
        </div>
      </section>
    </PublicShell>
  );
}
