import { createFileRoute } from "@tanstack/react-router";

import { DemoNote, PageHeading, Panel, StatusPill } from "@/components/brand";
import { money, obtainerEarnings } from "@/lib/data";

export const Route = createFileRoute("/obtainer/earnings")({
  head: () => ({
    meta: [
      { title: "Earnings — BoxLead" },
      {
        name: "description",
        content: "Recurring service payments and paid pool tasks, with what's been released and what's awaiting approval.",
      },
      { property: "og:title", content: "Earnings — BoxLead" },
      { property: "og:description", content: "Recurring payments and paid task work in one view." },
    ],
  }),
  component: ObtainerEarnings,
});

function ObtainerEarnings() {
  const paid = obtainerEarnings.filter((e) => e.status === "Paid out").reduce((s, e) => s + e.amount, 0);
  const pending = obtainerEarnings.filter((e) => e.status !== "Paid out").reduce((s, e) => s + e.amount, 0);

  return (
    <>
      <PageHeading
        title="Earnings"
        description="Recurring services bill on their rhythm. Pool tasks pay out once the owner approves the work."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Panel>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Released</p>
          <p className="mt-2 text-3xl font-extrabold">{money(paid)}</p>
        </Panel>
        <Panel>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Awaiting approval</p>
          <p className="mt-2 text-3xl font-extrabold">{money(pending)}</p>
        </Panel>
      </div>

      <Panel>
        <h2 className="text-lg font-bold">History</h2>
        <ul className="mt-4 space-y-3">
          {obtainerEarnings.map((e) => (
            <li key={e.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border p-4">
              <div>
                <p className="text-sm font-semibold">{e.description}</p>
                <p className="text-xs text-muted-foreground">{e.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold">{money(e.amount)}</span>
                <StatusPill status={e.status} />
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <DemoNote>Demo build — no real payments are processed.</DemoNote>
    </>
  );
}
