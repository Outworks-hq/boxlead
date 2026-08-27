import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { DemoNote, PageHeading, Panel, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { DEMO_OBTAINER_ID, getCompany, money, pools } from "@/lib/data";

export const Route = createFileRoute("/obtainer/pools")({
  head: () => ({
    meta: [
      { title: "Free Pools — BoxLead" },
      {
        name: "description",
        content: "Optional extra tasks from companies you already work with. You choose what to accept.",
      },
      { property: "og:title", content: "Free Pools — BoxLead" },
      { property: "og:description", content: "Optional, separately paid tasks from trusted companies." },
    ],
  }),
  component: ObtainerPools,
});

function ObtainerPools() {
  const myPools = pools.filter((p) => p.members.some((m) => m.obtainerId === DEMO_OBTAINER_ID));

  return (
    <>
      <PageHeading
        title="Free Pools"
        description="Being in a pool never obliges you to work. Each task is optional and paid separately from your recurring services."
      />

      {myPools.map((p) => {
        const c = getCompany(p.companyId);
        return (
          <Panel key={p.id}>
            <h2 className="text-lg font-bold">{p.name}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{c?.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>

            <ul className="mt-5 space-y-3">
              {p.opportunities.map((op) => {
                const isMine = op.acceptedBy === DEMO_OBTAINER_ID;
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
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {op.status === "Open" ? (
                        <>
                          <Button variant="ink" size="sm" onClick={() => toast.success("Task accepted (demo).")}>
                            Accept task
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => toast.info("Declined — no effect on your pool membership.")}>
                            Not this time
                          </Button>
                        </>
                      ) : null}
                      {isMine && op.status === "Accepted" ? (
                        <Button variant="ink" size="sm" onClick={() => toast.success("Work submitted for approval (demo).")}>
                          Submit work
                        </Button>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>
        );
      })}

      <DemoNote>Demo build — accepting or declining pool tasks is simulated.</DemoNote>
    </>
  );
}
