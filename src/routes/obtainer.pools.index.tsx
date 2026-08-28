import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { DemoNote, PageHeading, Panel, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { DEMO_OBTAINER_ID, getObtainer, money } from "@/lib/data";
import { joinPool, usePools } from "@/lib/pools-store";

export const Route = createFileRoute("/obtainer/pools/")({
  head: () => ({
    meta: [
      { title: "Free Pools — BoxLead" },
      {
        name: "description",
        content:
          "Stay connected to companies and people you trust, and pick up paid task work they post — instead of searching for new work every time.",
      },
      { property: "og:title", content: "Free Pools — BoxLead" },
      { property: "og:description", content: "Optional paid task work from people you already work with." },
    ],
  }),
  component: ObtainerPools,
});

function ObtainerPools() {
  const me = getObtainer(DEMO_OBTAINER_ID)!;
  const allPools = usePools();
  const myPools = allPools.filter((p) => p.members.some((m) => m.id === DEMO_OBTAINER_ID));
  const otherPools = allPools.filter((p) => !p.members.some((m) => m.id === DEMO_OBTAINER_ID));

  return (
    <>
      <PageHeading
        title="Free Pools"
        description="A pool keeps you connected to a company, individual or community you already trust. When they have paid task work, it appears here with the payment attached — you choose what you take on."
      />

      <Panel>
        <h2 className="text-lg font-bold">Pools you're in</h2>
        {myPools.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">You haven't joined a pool yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {myPools.map((p) => {
              const open = p.work.filter((w) => w.status === "Open");
              return (
                <li key={p.id} className="rounded-2xl border border-border p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        {p.ownerType} pool · {p.ownerName}
                      </p>
                    </div>
                    <Button variant="ink" size="sm" asChild>
                      <Link to="/obtainer/pools/$poolId" params={{ poolId: p.id }}>
                        Open pool
                      </Link>
                    </Button>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  {open.length ? (
                    <ul className="mt-3 space-y-2">
                      {open.slice(0, 3).map((w) => (
                        <li key={w.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-secondary px-4 py-3">
                          <span className="text-sm font-medium">{w.title}</span>
                          <span className="flex items-center gap-3 text-sm">
                            <span className="font-bold">{money(w.compensation)}</span>
                            <StatusPill status={w.status} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground">No open work right now — you stay in the pool either way.</p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Panel>

      <Panel>
        <h2 className="text-lg font-bold">Other pools you can join</h2>
        {otherPools.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">You're in every pool available in this demo.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {otherPools.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-border p-4">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.ownerType} pool · {p.ownerName} · {p.members.length} members
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.workDescription}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    joinPool(p.id, { id: me.id, name: me.name, initials: me.initials, note: "Joined from BoxLead" });
                    toast.success(`You joined ${p.name}.`);
                  }}
                >
                  Join pool
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <DemoNote>Demo build — being in a pool never obliges you to work, and everything is stored in your browser.</DemoNote>
    </>
  );
}
