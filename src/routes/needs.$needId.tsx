import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { DemoNote, Initials, Panel, Tag } from "@/components/brand";
import { PublicShell } from "@/components/public-shell";
import { Button } from "@/components/ui/button";
import { getCompany, getNeed, getObtainer, money } from "@/lib/data";

export const Route = createFileRoute("/needs/$needId")({
  loader: ({ params }) => {
    const need = getNeed(params.needId);
    if (!need) throw notFound();
    return { need, company: getCompany(need.companyId) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Need not found — BoxLead" }, { name: "robots", content: "noindex" }] };
    }
    const { need } = loaderData;
    return {
      meta: [
        { title: `${need.title} — Recurring need on BoxLead` },
        { name: "description", content: need.description },
        { property: "og:title", content: `${need.title} — BoxLead` },
        { property: "og:description", content: need.description },
      ],
    };
  },
  component: NeedDetail,
});

function NeedDetail() {
  const { need, company } = Route.useLoaderData();

  return (
    <PublicShell>
      <section className="surface-ink">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <Link to="/needs" className="text-sm text-ink-muted hover:text-ink-foreground">
            ← All recurring needs
          </Link>
          <h1 className="mt-6 text-3xl font-extrabold text-ink-foreground sm:text-4xl">{need.title}</h1>
          <p className="mt-3 text-ink-muted">
            {company?.name} · {need.remote} · Posted {need.posted}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <p className="text-2xl font-extrabold text-ink-foreground">
              {money(need.price)}
              <span className="text-base font-semibold text-ink-muted"> / {need.billing.toLowerCase()}</span>
            </p>
            <Button variant="light" size="lg" asChild>
              <Link to="/auth" search={{ mode: "signup" }}>
                Express interest
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-6 px-5 py-12 sm:px-8">
        <Panel>
          <h2 className="text-lg font-bold">What this covers</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{need.description}</p>
          <p className="mt-4 text-sm">
            <span className="font-semibold">Scope:</span> {need.scope}
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Covered</p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {need.covered.map((c) => (
                  <li key={c}>· {c}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Limits</p>
              <p className="mt-2 text-sm text-muted-foreground">{need.limits}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Tag>{need.category}</Tag>
            <Tag>{need.workFrequency}</Tag>
            <Tag>Starts {need.startTiming.toLowerCase()}</Tag>
            {need.skills.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </Panel>

        {company ? (
          <Panel>
            <h2 className="text-lg font-bold">About the company</h2>
            <div className="mt-4 flex items-center gap-3">
              <Initials value={company.initials} />
              <div>
                <p className="font-semibold">{company.name}</p>
                <p className="text-xs text-muted-foreground">
                  {company.industry} · {company.location} · On BoxLead since {company.since}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{company.description}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              {company.relationships} recurring relationships held on BoxLead.
            </p>
          </Panel>
        ) : null}

        <Panel>
          <h2 className="text-lg font-bold">Interested obtainers ({need.interested.length})</h2>
          {need.interested.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">No obtainers have expressed interest yet.</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {need.interested.map((i) => {
                const o = getObtainer(i.obtainerId);
                if (!o) return null;
                return (
                  <li key={i.obtainerId} className="rounded-2xl border border-border p-5">
                    <div className="flex items-center gap-3">
                      <Initials value={o.initials} size="sm" tone="primary" />
                      <div className="min-w-0">
                        <Link
                          to="/browse/$obtainerId"
                          params={{ obtainerId: o.id }}
                          className="font-semibold hover:underline"
                        >
                          {o.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{i.when}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{i.note}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        <DemoNote>Demo build — this recurring need is sample content.</DemoNote>
      </section>
    </PublicShell>
  );
}
