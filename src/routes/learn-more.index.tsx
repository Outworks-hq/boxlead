import { createFileRoute, Link } from "@tanstack/react-router";

import { PublicShell } from "@/components/public-shell";
import { LEARN_TOPICS } from "@/lib/learn-more";

export const Route = createFileRoute("/learn-more/")({
  head: () => ({
    meta: [
      { title: "Learn More — BoxLead functions explained" },
      {
        name: "description",
        content:
          "Free Pool, ServiceTap, UpTainer Enterprise and Support — what each part of BoxLead does, in plain English.",
      },
      { property: "og:title", content: "Learn More — BoxLead functions explained" },
      { property: "og:description", content: "Every BoxLead function explained in plain English." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearnMoreIndex,
});

function LearnMoreIndex() {
  return (
    <PublicShell>
      <section className="surface-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <h1 className="max-w-2xl text-4xl font-extrabold text-ink-foreground sm:text-5xl">
            The rest of how BoxLead works
          </h1>
          <p className="mt-5 max-w-2xl text-ink-muted">
            Recurring services are one half of BoxLead. The other half is staying connected to companies and
            people you trust, and choosing paid task work as it comes up.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {LEARN_TOPICS.map((t) => (
            <Link
              key={t.slug}
              to="/learn-more/$topic"
              params={{ topic: t.slug }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
            >
              <h2 className="text-lg font-bold">{t.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.short}</p>
            </Link>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
