import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { DemoNote, DetailRow, PageHeading, Panel, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { agreements, companyPayments, DEMO_COMPANY_ID, money } from "@/lib/data";

export const Route = createFileRoute("/company/payments")({
  head: () => ({
    meta: [
      { title: "Payments — BoxLead" },
      { name: "description", content: "Recurring billing, payment history and the 5% company platform fee." },
      { property: "og:title", content: "Payments — BoxLead" },
      { property: "og:description", content: "Billing for your recurring services." },
    ],
  }),
  component: CompanyPayments,
});

function CompanyPayments() {
  const active = agreements.filter((a) => a.companyId === DEMO_COMPANY_ID && a.status === "Active");
  const monthly = active.reduce((s, a) => s + (a.billing === "Weekly" ? a.price * 4 : a.price), 0);

  return (
    <>
      <PageHeading title="Payments" description="Billing follows the rhythm each service was agreed on." />

      <Panel>
        <h2 className="text-lg font-bold">Summary</h2>
        <dl className="mt-3">
          <DetailRow label="Approximate monthly commitment" value={money(Math.round(monthly))} />
          <DetailRow label="Company platform fee" value="5% of each payment" />
          <DetailRow label="Payment method" value="Visa ending 4242" />
        </dl>
        <Button className="mt-4" variant="outline" size="sm" onClick={() => toast.info("Payment methods are simulated in this demo.")}>
          Update payment method
        </Button>
      </Panel>

      <Panel>
        <h2 className="text-lg font-bold">Upcoming charges</h2>
        <ul className="mt-4 space-y-3">
          {active.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{a.title}</p>
                <p className="text-xs text-muted-foreground">Next charge {a.nextBilling}</p>
              </div>
              <p className="text-sm font-bold">
                {money(a.price)}
                <span className="font-normal text-muted-foreground"> / {a.billing.toLowerCase()}</span>
              </p>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel>
        <h2 className="text-lg font-bold">Payment history</h2>
        <ul className="mt-4 divide-y divide-border">
          {companyPayments.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{p.description}</p>
                <p className="text-xs text-muted-foreground">{p.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-bold">{money(p.amount)}</p>
                <StatusPill status={p.status} />
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <DemoNote>Demo build — no real payments are processed and no card is charged.</DemoNote>
    </>
  );
}
