import { createFileRoute, Link } from "@tanstack/react-router";

import { DemoNote, Initials, PageHeading, Panel, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import {
  agreements,
  DEMO_COMPANY_ID,
  getObtainer,
  money,
  needs,
  pools,
  threads,
} from "@/lib/data";

export const Route = createFileRoute("/company/")({
  head: () => ({
    meta: [
      { title: "Company overview — BoxLead" },
      { name: "description", content: "Your recurring services, needs and pool activity at a glance." },
      { property: "og:title", content: "Company overview — BoxLead" },
      { property: "og:description", content: "Track recurring services and relationships." },
    ],
  }),
  component: CompanyOverview,
});

function CompanyOverview() {
  const mine = agreements.filter((a) => a.companyId === DEMO_COMPANY_ID);
  const active = mine.filter((a) => a.status === "Active");
  const myNeeds = needs.filter((n) => n.companyId === DEMO_COMPANY_ID);
  const myPools = pools.filter((p) => p.companyId === DEMO_COMPANY_ID);
  const monthly = active.reduce(
    (sum, a) => sum + (a.billing === "Weekly" ? a.price * 4 : a.billing === "Quarterly" ? a.price / 3 : a.price),
    0,
  );

  return (
    <>
      <PageHeading
        title="Overview"
        description="Everything you have running right now."
        action={
          <Button variant="ink" asChild>
            <Link to="/company/needs">Post a recurring need</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Active recurring services" value={String(active.length)} />
        <Stat label="Approx. monthly commitment" value={money(Math.round(monthly))} />
        <Stat label="Open recurring needs" value={String(myNeeds.length)} />
      </div>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold">Active services</h2>
          <Link to="/company/services" className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        <ul className="mt-4 space-y-3">
          {mine.map((a) => {
            const o = getObtainer(a.obtainerId);
            return (
              <li key={a.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-border p-4">
                <Initials value={o?.initials ?? "?"} size="sm" tone="primary" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{a.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {o?.name} · {money(a.price)} / {a.billing.toLowerCase()}
                    {a.nextBilling ? ` · next ${a.nextBilling}` : ""}
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
            <h2 className="text-lg font-bold">Free Pools</h2>
            <Link to="/company/pools" className="text-sm font-semibold text-primary hover:underline">
              Manage
            </Link>
          </div>
          {myPools.map((p) => (
            <div key={p.id} className="mt-4 rounded-2xl border border-border p-4">
              <p className="font-semibold">{p.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {p.members.length} members · {p.opportunities.filter((o) => o.status === "Open").length} open tasks
              </p>
            </div>
          ))}
        </Panel>

        <Panel>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold">Recent messages</h2>
            <Link to="/company/messages" className="text-sm font-semibold text-primary hover:underline">
              Open inbox
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {threads
              .filter((t) => t.companyId === DEMO_COMPANY_ID)
              .map((t) => {
                const o = getObtainer(t.obtainerId);
                const last = t.messages[t.messages.length - 1];
                return (
                  <li key={t.id} className="rounded-2xl border border-border p-4">
                    <p className="text-sm font-semibold">{o?.name}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{last.text}</p>
                  </li>
                );
              })}
          </ul>
        </Panel>
      </div>

      <DemoNote>Demo build — all figures and activity shown here are sample content.</DemoNote>
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
