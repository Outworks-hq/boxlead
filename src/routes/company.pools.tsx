import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { DemoNote, Initials, PageHeading, Panel, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEMO_COMPANY_ID, getObtainer, money, pools } from "@/lib/data";

export const Route = createFileRoute("/company/pools")({
  head: () => ({
    meta: [
      { title: "Free Pools — BoxLead" },
      {
        name: "description",
        content: "Keep trusted obtainers in a pool and offer optional extra tasks. Membership never guarantees work.",
      },
      { property: "og:title", content: "Free Pools — BoxLead" },
      { property: "og:description", content: "Optional extra tasks for trusted obtainers." },
    ],
  }),
  component: CompanyPools,
});

function CompanyPools() {
  const [showForm, setShowForm] = useState(false);
  const myPools = pools.filter((p) => p.companyId === DEMO_COMPANY_ID);

  return (
    <>
      <PageHeading
        title="Free Pools"
        description="A pool is a group of obtainers you trust. Tasks posted here are optional and separately compensated."
        action={
          <Button variant="ink" onClick={() => setShowForm((v) => !v)}>
            {showForm ? "Close" : "Post a pool task"}
          </Button>
        }
      />

      {showForm ? (
        <Panel>
          <h2 className="text-lg font-bold">New pool task</h2>
          <form
            className="mt-5 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setShowForm(false);
              toast.success("Pool task posted — members can accept or ignore it (demo).");
            }}
          >
            <div>
              <Label className="mb-1.5 block">Title</Label>
              <Input placeholder="Accessibility sweep on the booking flow" required />
            </div>
            <div>
              <Label className="mb-1.5 block">Scope</Label>
              <Textarea rows={3} placeholder="What the task covers and roughly how long it should take." required />
            </div>
            <div>
              <Label className="mb-1.5 block">Compensation</Label>
              <Input type="number" placeholder="600" required />
            </div>
            <Button type="submit" variant="ink">
              Post task
            </Button>
          </form>
        </Panel>
      ) : null}

      {myPools.map((p) => (
        <Panel key={p.id}>
          <h2 className="text-lg font-bold">{p.name}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>

          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Members ({p.members.length})
            </p>
            <ul className="mt-3 space-y-3">
              {p.members.map((m) => {
                const o = getObtainer(m.obtainerId);
                if (!o) return null;
                return (
                  <li key={m.obtainerId} className="flex flex-wrap items-center gap-3 rounded-2xl border border-border p-4">
                    <Initials value={o.initials} size="sm" tone="primary" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{o.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {m.note} · joined {m.joined}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/browse/$obtainerId" params={{ obtainerId: o.id }}>
                        Profile
                      </Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tasks</p>
            <ul className="mt-3 space-y-3">
              {p.opportunities.map((op) => {
                const who = op.acceptedBy ? getObtainer(op.acceptedBy) : null;
                return (
                  <li key={op.id} className="rounded-2xl border border-border p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-semibold">{op.title}</p>
                      <StatusPill status={op.status} />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{op.scope}</p>
                    <p className="mt-2 text-sm">
                      <span className="font-bold">{money(op.compensation)}</span>
                      <span className="text-muted-foreground"> · posted {op.posted}</span>
                      {who ? <span className="text-muted-foreground"> · accepted by {who.name}</span> : null}
                    </p>
                    {op.status === "Submitted" ? (
                      <Button
                        className="mt-3"
                        variant="ink"
                        size="sm"
                        onClick={() => toast.success("Work approved — payment released (demo).")}
                      >
                        Approve and pay
                      </Button>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        </Panel>
      ))}

      <DemoNote>Demo build — pool membership never guarantees work, and nothing here is saved.</DemoNote>
    </>
  );
}
