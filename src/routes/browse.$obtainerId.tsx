import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { DemoNote, Initials, Panel, Rating, Tag } from "@/components/brand";
import { PublicShell } from "@/components/public-shell";
import { Button } from "@/components/ui/button";
import { getObtainer, money, servicesByObtainer } from "@/lib/data";

export const Route = createFileRoute("/browse/$obtainerId")({
  loader: ({ params }) => {
    const obtainer = getObtainer(params.obtainerId);
    if (!obtainer) throw notFound();
    return { obtainer, services: servicesByObtainer(obtainer.id) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Obtainer not found — BoxLead" }, { name: "robots", content: "noindex" }] };
    }
    const { obtainer } = loaderData;
    return {
      meta: [
        { title: `${obtainer.name} — Recurring services on BoxLead` },
        { name: "description", content: obtainer.headline },
        { property: "og:title", content: `${obtainer.name} — BoxLead` },
        { property: "og:description", content: obtainer.headline },
      ],
    };
  },
  component: ObtainerProfile,
});

function ObtainerProfile() {
  const { obtainer, services } = Route.useLoaderData();

  return (
    <PublicShell>
      <section className="surface-ink">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
          <Link to="/browse" className="text-sm text-ink-muted hover:text-ink-foreground">
            ← Back to browse
          </Link>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <Initials value={obtainer.initials} size="lg" tone="primary" />
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-extrabold text-ink-foreground">{obtainer.name}</h1>
              <p className="mt-2 text-ink-muted">{obtainer.headline}</p>
              <p className="mt-3 text-sm text-ink-muted">
                {obtainer.location} · {obtainer.remote ? "Remote" : "On-site"} · On BoxLead since {obtainer.since}
              </p>
            </div>
            <Button variant="light" size="lg" asChild>
              <Link to="/auth" search={{ mode: "signup" }}>
                Start a relationship
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-6 px-5 py-12 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Relationships held" value={String(obtainer.completedRelationships)} />
          <Stat label="Companies that renewed" value={String(obtainer.repeatRelationships)} />
          <Stat label="Availability" value={obtainer.availability} />
        </div>

        <Panel>
          <h2 className="text-lg font-bold">About</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{obtainer.about}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {obtainer.skills.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </Panel>

        <Panel>
          <h2 className="text-lg font-bold">Recurring services</h2>
          <div className="mt-4 space-y-4">
            {services.map((s) => (
              <div key={s.id} className="rounded-2xl border border-border p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="text-sm font-semibold">
                    {money(s.price)}
                    <span className="text-muted-foreground"> / {s.billing.toLowerCase()}</span>
                  </p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                <p className="mt-3 text-sm">
                  <span className="font-semibold">Scope:</span> {s.scope}
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <List title="Included" items={s.included} />
                  <List title="Not included" items={s.excluded} />
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  {s.serviceFrequency} · {s.availability}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <h2 className="text-lg font-bold">Past recurring work</h2>
          <ul className="mt-4 space-y-3">
            {obtainer.work.map((w) => (
              <li key={w.title} className="border-b border-border pb-3 last:border-0 last:pb-0">
                <p className="text-sm font-semibold">{w.title}</p>
                <p className="text-sm text-muted-foreground">{w.note}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold">Reviews from relationships</h2>
            <Rating value={obtainer.rating} count={obtainer.reviewCount} />
          </div>
          <ul className="mt-4 space-y-4">
            {obtainer.reviews.map((r) => (
              <li key={r.company + r.duration} className="rounded-2xl bg-secondary/50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold">{r.company}</p>
                  <p className="text-xs text-muted-foreground">{r.duration}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <DemoNote>Demo build — this profile and its reviews are sample content.</DemoNote>
      </section>
    </PublicShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 text-lg font-bold">{value}</p>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</p>
      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i}>· {i}</li>
        ))}
      </ul>
    </div>
  );
}
