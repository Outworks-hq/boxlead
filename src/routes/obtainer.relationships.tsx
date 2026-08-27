import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { DemoNote, DetailRow, Initials, PageHeading, Panel, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { agreements, DEMO_OBTAINER_ID, getCompany, money } from "@/lib/data";

export const Route = createFileRoute("/obtainer/relationships")({
  head: () => ({
    meta: [
      { title: "Active relationships — BoxLead" },
      { name: "description", content: "The companies you hold recurring responsibility for, with confirmed scope and rhythm." },
      { property: "og:title", content: "Active relationships — BoxLead" },
      { property: "og:description", content: "Manage your recurring relationships." },
    ],
  }),
  component: Relationships,
});

function Relationships() {
  const mine = agreements.filter((a) => a.obtainerId === DEMO_OBTAINER_ID);

  return (
    <>
      <PageHeading
        title="Active relationships"
        description="A relationship starts only when both sides confirm the scope."
      />

      <div className="space-y-6">
        {mine.map((a) => {
          const c = getCompany(a.companyId);
          return (
            <Panel key={a.id}>
              <div className="flex flex-wrap items-center gap-3">
                <Initials value={c?.initials ?? "?"} />
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-lg font-bold">{a.title}</h2>
                  <p className="truncate text-sm text-muted-foreground">{c?.name}</p>
                </div>
                <StatusPill status={a.status} />
              </div>

              <dl className="mt-4">
                <DetailRow label="Confirmed scope" value={a.scope} />
                <DetailRow label="Payment" value={`${money(a.price)} / ${a.billing.toLowerCase()}`} />
                <DetailRow label="Started" value={a.startDate} />
                <DetailRow label="Next payment" value={a.nextBilling ?? "Paused"} />
              </dl>

              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">History</p>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {a.history.map((h) => (
                    <li key={h.date + h.event}>
                      <span className="font-medium text-foreground">{h.date}</span> — {h.event}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                {a.status === "Pending" ? (
                  <Button variant="ink" size="sm" onClick={() => toast.success("Scope confirmed — the relationship can start (demo).")}>
                    Confirm scope
                  </Button>
                ) : null}
                <Button variant="outline" size="sm" onClick={() => toast.info("Scope change proposed — the company must confirm (demo).")}>
                  Propose scope change
                </Button>
                <Button variant="ghost" size="sm" onClick={() => toast.info("End requested (demo).")}>
                  End relationship
                </Button>
              </div>
            </Panel>
          );
        })}
      </div>

      <DemoNote>Demo build — confirmations and changes are simulated.</DemoNote>
    </>
  );
}
