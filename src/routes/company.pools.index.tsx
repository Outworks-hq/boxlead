import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { DemoNote, PageHeading, Panel, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEMO_COMPANY_ID, getCompany, money } from "@/lib/data";
import { createPool, usePools, type PoolOwnerType } from "@/lib/pools-store";

export const Route = createFileRoute("/company/pools/")({
  head: () => ({
    meta: [
      { title: "Free Pools — BoxLead" },
      {
        name: "description",
        content:
          "Create a Free Pool, keep trusted people connected to you, and post paid task work with the payment already attached.",
      },
      { property: "og:title", content: "Free Pools — BoxLead" },
      { property: "og:description", content: "Your own workspace for optional paid task work." },
    ],
  }),
  component: CompanyPools,
});

const OWNER_TYPES: PoolOwnerType[] = ["Company", "Individual", "Community"];

function CompanyPools() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [ownerType, setOwnerType] = useState<PoolOwnerType>("Company");
  const allPools = usePools();
  const company = getCompany(DEMO_COMPANY_ID);
  const myPools = allPools.filter((p) => p.ownerId === DEMO_COMPANY_ID || p.createdByMe);

  return (
    <>
      <PageHeading
        title="Free Pools"
        description="A Free Pool is your own workspace. People you trust join it and stay connected, and when you have paid task work you post it there with the payment already attached. Members choose what they take on."
        action={
          <Button variant="ink" onClick={() => setShowForm((v) => !v)}>
            {showForm ? "Close" : "Create a Pool"}
          </Button>
        }
      />

      {showForm ? (
        <Panel>
          <h2 className="text-lg font-bold">Create a Free Pool</h2>
          <form
            className="mt-5 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget as HTMLFormElement);
              const id = createPool({
                name: String(f.get("name")),
                ownerName: String(f.get("ownerName")) || company?.name || "My organisation",
                ownerType,
                description: String(f.get("description")),
                workDescription: String(f.get("workDescription")),
              });
              setShowForm(false);
              toast.success("Pool created — invite people you already trust.");
              navigate({ to: "/company/pools/$poolId", params: { poolId: id } });
            }}
          >
            <div>
              <Label className="mb-1.5 block">Pool name</Label>
              <Input name="name" placeholder="Northbeam Trusted Network" required />
            </div>
            <div>
              <Label className="mb-1.5 block">Owned by</Label>
              <Input name="ownerName" defaultValue={company?.name ?? ""} placeholder="Your company, name or community" />
            </div>
            <div>
              <Label className="mb-1.5 block">Pool type</Label>
              <div className="flex flex-wrap gap-2">
                {OWNER_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setOwnerType(t)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      ownerType === t ? "border-primary text-primary" : "border-border text-muted-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block">About this pool</Label>
              <Textarea name="description" rows={2} placeholder="Who this pool is for and why people stay in it." required />
            </div>
            <div>
              <Label className="mb-1.5 block">What kind of work you post here</Label>
              <Textarea
                name="workDescription"
                rows={2}
                placeholder="Occasional design, QA or content tasks with payment attached."
                required
              />
            </div>
            <Button type="submit" variant="ink">
              Create Pool
            </Button>
          </form>
        </Panel>
      ) : null}

      {myPools.map((p) => {
        const open = p.work.filter((w) => w.status === "Open");
        return (
          <Panel key={p.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">{p.name}</h2>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {p.ownerType} pool · {p.members.length} member{p.members.length === 1 ? "" : "s"} · {open.length} open
                </p>
              </div>
              <Button variant="ink" size="sm" asChild>
                <Link to="/company/pools/$poolId" params={{ poolId: p.id }}>
                  Open pool
                </Link>
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
            {p.work.length ? (
              <ul className="mt-4 space-y-2">
                {p.work.slice(0, 3).map((w) => (
                  <li key={w.id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border p-4">
                    <span className="text-sm font-semibold">{w.title}</span>
                    <span className="flex items-center gap-3 text-sm">
                      <span className="font-bold">{money(w.compensation)}</span>
                      <StatusPill status={w.status} />
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </Panel>
        );
      })}

      <DemoNote>Demo build — pool membership never guarantees work, and pools are stored in your browser.</DemoNote>
    </>
  );
}
