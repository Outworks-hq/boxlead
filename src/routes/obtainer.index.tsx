import { createFileRoute, Link } from "@tanstack/react-router";

import { DemoNote, Initials, PageHeading, Panel, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import {
  agreements,
  DEMO_OBTAINER_ID,
  getCompany,
  money,
  pools,
  servicesByObtainer,
  threads,
} from "@/lib/data";

export const Route = createFileRoute("/obtainer/")({
  head: () => ({
    meta: [
      { title: "Obtainer overview — BoxLead" },
      { name: "description", content: "Your recurring relationships, income rhythm and pool activity." },
      { property: "og:title", content: "Obtainer overview — BoxLead" },
      { property: "og:description", content: "Track your recurring work on BoxLead." },
    ],
  }),
  component: ObtainerOverview,
});

function ObtainerOverview() {
  const mine = agreements.filter((a) => a.obtainerId === DEMO_OBTAINER_ID);
  const active = mine.filter((a) => a.status === "Active");
  const recurring = active.reduce((s, a) => s + (a.billing === "Weekly" ? a.price * 4 : a.price), 0);
  const myServices = servicesByObtainer(DEMO_OBTAINER_ID);
  const myPools = pools.filter((p) => p.members.some((m) => m.obtainerId === DEMO_OBTAINER_ID));

  return (
    <>
      <PageHeading
        title="Overview"
        description="Your recurring work at a glance."
        action={
          <Button variant="ink" asChild>
            <Link to="/obtainer/find-work">Find recurring work</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Active relationships" value={String(active.length)} />
        <Stat label="Approx. monthly income" value={money(Math.round(recurring))} />
        <Stat label="Published services" value={String(myServices.length)} />
      </div>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold">Active relationships</h2>
          <Link to="/obtainer/relationships" className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        <ul className="mt-4 space-y-3">
          {mine.map((a) => {
            const c = getCompany(a.companyId);
            return (
              <li key={a.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-border p-4">
                <Initials value={c?.initials ?? "?"} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{a.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {c?.name} · {money(a.price)} / {a.billing.toLowerCase()}
                  </p>
                </div>
                <StatusPill status={a.status} />
              </li>
            );
          })}
        </ul>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold">Pools you belong to</h2>
            <Link to="/obtainer/pools" className="text-sm font-semibold text-primary hover:underline">
              View tasks
            </Link>
          </div>
          {myPools.map((p) => (
            <div key={p.id} className="mt-4 rounded-2xl border border-border p-4">
              <p className="font-semibold">{p.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {p.opportunities.filter((o) => o.status === "Open").length} optional tasks open
              </p>
            </div>
          ))}
        </Panel>

        <Panel>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold">Recent messages</h2>
            <Link to="/obtainer/messages" className="text-sm font-semibold text-primary hover:underline">
              Open inbox
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {threads
              .filter((t) => t.obtainerId === DEMO_OBTAINER_ID)
              .map((t) => {
                const c = getCompany(t.companyId);
                const last = t.messages[t.messages.length - 1];
                return (
                  <li key={t.id} className="rounded-2xl border border-border p-4">
                    <p className="text-sm font-semibold">{c?.name}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{last.text}</p>
                  </li>
                );
              })}
          </ul>
        </Panel>
      </div>

      <DemoNote>Demo build — all figures shown here are sample content.</DemoNote>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-extrabold">{value}</p>
    </div>
  );
}
