import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { DemoNote, EmptyState, Initials, PageHeading, Panel, Tag } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, DEMO_COMPANY_ID, getObtainer, money, needs } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/company/needs")({
  head: () => ({
    meta: [
      { title: "Recurring needs — BoxLead" },
      { name: "description", content: "Post and manage the ongoing work you want someone to take responsibility for." },
      { property: "og:title", content: "Recurring needs — BoxLead" },
      { property: "og:description", content: "Manage your posted recurring needs." },
    ],
  }),
  component: CompanyNeeds,
});

function CompanyNeeds() {
  const [showForm, setShowForm] = useState(false);
  const mine = needs.filter((n) => n.companyId === DEMO_COMPANY_ID);

  return (
    <>
      <PageHeading
        title="Recurring needs"
        description="Ongoing work with a defined scope, price and rhythm. One-off projects are not posted here."
        action={
          <Button variant="ink" onClick={() => setShowForm((v) => !v)}>
            {showForm ? "Close" : "Post a recurring need"}
          </Button>
        }
      />

      {showForm ? (
        <Panel>
          <h2 className="text-lg font-bold">New recurring need</h2>
          <form
            className="mt-5 grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setShowForm(false);
              toast.success("Recurring need posted (demo — nothing is saved).");
            }}
          >
            <Field label="Title" className="sm:col-span-2">
              <Input placeholder="Weekly design updates" required />
            </Field>
            <Field label="Category">
              <select
                required
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                defaultValue={CATEGORIES[0]}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Work frequency">
              <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option>Weekly</option>
                <option>Bi-weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
            </Field>
            <Field label="Price">
              <Input type="number" placeholder="2400" required />
            </Field>
            <Field label="Billing rhythm">
              <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option>Weekly</option>
                <option>Bi-weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
            </Field>
            <Field label="Scope — what is covered each period" className="sm:col-span-2">
              <Textarea rows={3} placeholder="Up to 20 hours per month of interface updates." required />
            </Field>
            <Field label="Limits — what is not covered" className="sm:col-span-2">
              <Textarea rows={2} placeholder="Full redesigns and brand identity are separate agreements." />
            </Field>
            <div className="sm:col-span-2">
              <Button type="submit" variant="ink">
                Post recurring need
              </Button>
            </div>
          </form>
        </Panel>
      ) : null}

      {mine.length === 0 ? (
        <EmptyState
          title="No recurring needs yet"
          description="Post the ongoing work you want covered and obtainers can express interest."
        />
      ) : (
        <div className="space-y-4">
          {mine.map((n) => (
            <Panel key={n.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <Link to="/needs/$needId" params={{ needId: n.id }} className="text-lg font-bold hover:underline">
                  {n.title}
                </Link>
                <p className="text-sm font-semibold">
                  {money(n.price)}
                  <span className="text-muted-foreground"> / {n.billing.toLowerCase()}</span>
                </p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{n.scope}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Tag>{n.category}</Tag>
                <Tag>{n.workFrequency}</Tag>
                <Tag>Posted {n.posted}</Tag>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-semibold">Interested obtainers ({n.interested.length})</p>
                <ul className="mt-3 space-y-3">
                  {n.interested.map((i) => {
                    const o = getObtainer(i.obtainerId);
                    if (!o) return null;
                    return (
                      <li key={i.obtainerId} className="flex flex-wrap items-center gap-3">
                        <Initials value={o.initials} size="sm" tone="primary" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{o.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{i.note}</p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/browse/$obtainerId" params={{ obtainerId: o.id }}>
                            View profile
                          </Link>
                        </Button>
                        <Button
                          variant="ink"
                          size="sm"
                          onClick={() => toast.success(`Scope sent to ${o.name} — both sides must confirm (demo).`)}
                        >
                          Propose scope
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Panel>
          ))}
        </div>
      )}

      <DemoNote>Demo build — posting and proposing do not persist.</DemoNote>
    </>
  );
}

function Field({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block">{label}</Label>
      {children}
    </div>
  );
}
