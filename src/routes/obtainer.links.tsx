import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { DemoNote, PageHeading, Panel } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { DEMO_OBTAINER_ID, getService, money, privateLinks } from "@/lib/data";

export const Route = createFileRoute("/obtainer/links")({
  head: () => ({
    meta: [
      { title: "Private service links — BoxLead" },
      {
        name: "description",
        content: "Share a private link so an existing client can start a recurring service without browsing the platform.",
      },
      { property: "og:title", content: "Private service links — BoxLead" },
      { property: "og:description", content: "Direct links to your recurring services." },
    ],
  }),
  component: ObtainerLinks,
});

function ObtainerLinks() {
  const mine = privateLinks.filter((l) => l.obtainerId === DEMO_OBTAINER_ID);

  return (
    <>
      <PageHeading
        title="Private service links"
        description="Send a link straight to a client you already know. They subscribe to the exact scope and price you set."
      />

      <div className="space-y-4">
        {mine.map((l) => {
          const s = getService(l.serviceId);
          const url = `boxlead.app/s/${l.slug}`;
          return (
            <Panel key={l.slug}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-bold">{s?.title ?? l.slug}</h2>
                <p className="text-sm font-semibold">
                  {s ? `${money(s.price)} / ${s.billing.toLowerCase()}` : ""}
                </p>
              </div>
              <p className="mt-2 break-all rounded-xl bg-secondary px-4 py-3 font-mono text-xs">{url}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Created {l.created} · {l.subscribers} active subscriber{l.subscribers === 1 ? "" : "s"} ·{" "}
                {l.active ? "Active" : "Disabled"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant="ink"
                  size="sm"
                  onClick={() => {
                    void navigator.clipboard?.writeText(`https://${url}`);
                    toast.success("Link copied.");
                  }}
                >
                  Copy link
                </Button>
                <Button variant="ghost" size="sm" onClick={() => toast.info(l.active ? "Link disabled (demo)." : "Link enabled (demo).")}>
                  {l.active ? "Disable" : "Enable"}
                </Button>
              </div>
            </Panel>
          );
        })}
      </div>

      <DemoNote>Demo build — private links are sample content and do not resolve.</DemoNote>
    </>
  );
}
