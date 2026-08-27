import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { DemoNote, DetailRow, Initials, PageHeading, Panel, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { agreements, DEMO_COMPANY_ID, getObtainer, money } from "@/lib/data";

export const Route = createFileRoute("/company/services")({
  head: () => ({
    meta: [
      { title: "Active recurring services — BoxLead" },
      { name: "description", content: "Every recurring service you have running, with its scope, price and billing rhythm." },
      { property: "og:title", content: "Active recurring services — BoxLead" },
      { property: "og:description", content: "Manage scope, pauses and cancellations." },
    ],
  }),
  component: CompanyServices,
});

function CompanyServices() {
  const mine = agreements.filter((a) => a.companyId === DEMO_COMPANY_ID);

  return (
    <>
      <PageHeading
        title="Active services"
        description="Each service has a confirmed scope. Anything outside it becomes a separate agreement."
      />

      <div className="space-y-6">
        {mine.map((a) => {
          const o = getObtainer(a.obtainerId);
          return (
            <Panel key={a.id}>
              <div className="flex flex-wrap items-center gap-3">
                <Initials value={o?.initials ?? "?"} tone="primary" />
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-lg font-bold">{a.title}</h2>
                  <p className="truncate text-sm text-muted-foreground">{o?.name}</p>
                </div>
                <StatusPill status={a.status} />
              </div>

              <p className="mt-4 text-sm text-muted-foreground">{a.description}</p>

              <dl className="mt-4">
                <DetailRow label="Confirmed scope" value={a.scope} />
                <DetailRow label="Price" value={`${money(a.price)} / ${a.billing.toLowerCase()}`} />
                <DetailRow label="Started" value={a.startDate} />
                <DetailRow label="Next billing" value={a.nextBilling ?? "Paused"} />
                <DetailRow label="Payment method" value={a.paymentMethod} />
              </dl>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <List title="Included" items={a.included} />
                <List title="Not included" items={a.excluded} />
              </div>

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
                <Button variant="outline" size="sm" onClick={() => toast.info("Scope change proposed — the obtainer must confirm (demo).")}>
                  Propose scope change
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.info(a.status === "Paused" ? "Service resumed (demo)." : "Service paused — billing stops (demo).")}
                >
                  {a.status === "Paused" ? "Resume" : "Pause"}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => toast.info("Cancellation requested (demo).")}>
                  Cancel service
                </Button>
              </div>
            </Panel>
          );
        })}
      </div>

      <DemoNote>Demo build — pausing, cancelling and scope changes are simulated.</DemoNote>
    </>
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
