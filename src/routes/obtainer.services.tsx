import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { DemoNote, EmptyState, PageHeading, Panel, Tag } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, DEMO_OBTAINER_ID, money, servicesByObtainer } from "@/lib/data";

export const Route = createFileRoute("/obtainer/services")({
  head: () => ({
    meta: [
      { title: "My recurring services — BoxLead" },
      { name: "description", content: "Publish recurring services with a fixed scope, price and billing rhythm." },
      { property: "og:title", content: "My recurring services — BoxLead" },
      { property: "og:description", content: "Manage the recurring services you offer." },
    ],
  }),
  component: ObtainerServices;
});

function ObtainerServices() {
  const [showForm, setShowForm] = useState(false);
  const mine = servicesByObtainer(DEMO_OBTAINER_ID);

  return (
    <>
      <PageHeading
        title="My services"
        description="Every service you publish must be recurring — an ongoing responsibility, not a one-off deliverable."
        action={
          <Button variant="ink" onClick={() => setShowForm((v) => !v)}>
            {showForm ? "Close" : "Create a service"}
          </Button>
        }
      />

      {showForm ? (
        <Panel>
          <h2 className="text-lg font-bold">New recurring service</h2>
          <form
            className="mt-5 grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setShowForm(false);
              toast.success("Service published (demo — not saved).");
            }}
          >
            <div className="sm:col-span-2">
              <Label className="mb-1.5 block">Title</Label>
              <Input placeholder="Monthly Design Updates" required />
            </div>
            <div>
              <Label className="mb-1.5 block">Category</Label>
              <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" defaultValue={CATEGORIES[0]}>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="mb-1.5 block">Billing rhythm</Label>
              <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option>Weekly</option>
                <option>Bi-weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
            </div>
            <div>
              <Label className="mb-1.5 block">Price</Label>
              <Input type="number" placeholder="2400" required />
            </div>
            <div>
              <Label className="mb-1.5 block">Availability</Label>
              <Input placeholder="Taking 1 new relationship" />
            </div>
            <div className="sm:col-span-2">
              <Label className="mb-1.5 block">Scope per period</Label>
              <Textarea rows={3} placeholder="Up to 20 design hours per month." required />
            </div>
            <div className="sm:col-span-2">
              <Label className="mb-1.5 block">What is not included</Label>
              <Textarea rows={2} placeholder="Full redesigns, brand identity." />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" variant="ink">
                Publish service
              </Button>
            </div>
          </form>
        </Panel>
      ) : null}

      {mine.length === 0 ? (
        <EmptyState title="No services yet" description="Publish a recurring service so companies can find you." />
      ) : (
        <div className="space-y-4">
          {mine.map((s) => (
            <Panel key={s.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-lg font-bold">{s.title}</h2>
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
              <div className="mt-4 flex flex-wrap gap-2">
                <Tag>{s.category}</Tag>
                <Tag>{s.serviceFrequency}</Tag>
                <Tag>{s.availability}</Tag>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                <Button variant="outline" size="sm" onClick={() => toast.info("Editing is simulated in this demo.")}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => toast.info("Service unpublished (demo).")}>
                  Unpublish
                </Button>
              </div>
            </Panel>
          ))}
        </div>
      )}

      <DemoNote>Demo build — services are sample content and changes are not stored.</DemoNote>
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
