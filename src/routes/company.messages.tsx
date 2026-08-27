import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { DemoNote, Initials, PageHeading, Panel } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEMO_COMPANY_ID, getObtainer, threads } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/company/messages")({
  head: () => ({
    meta: [
      { title: "Messages — BoxLead" },
      { name: "description", content: "Talk to obtainers about scope, rhythm and anything outside the agreement." },
      { property: "og:title", content: "Messages — BoxLead" },
      { property: "og:description", content: "Conversations tied to your recurring services." },
    ],
  }),
  component: CompanyMessages,
});

function CompanyMessages() {
  const mine = threads.filter((t) => t.companyId === DEMO_COMPANY_ID);
  const [activeId, setActiveId] = useState(mine[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const active = mine.find((t) => t.id === activeId) ?? mine[0];
  const other = active ? getObtainer(active.obtainerId) : null;

  return (
    <>
      <PageHeading title="Messages" description="Every conversation is tied to a service or a recurring need." />

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Panel className="p-3 sm:p-3">
          <ul className="space-y-1">
            {mine.map((t) => {
              const o = getObtainer(t.obtainerId);
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(t.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                      t.id === active?.id ? "bg-secondary" : "hover:bg-secondary/60",
                    )}
                  >
                    <Initials value={o?.initials ?? "?"} size="sm" tone="primary" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{o?.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{t.context}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </Panel>

        {active ? (
          <Panel className="flex min-h-[440px] flex-col">
            <div className="border-b border-border pb-4">
              <p className="font-bold">{other?.name}</p>
              <p className="text-xs text-muted-foreground">{active.context}</p>
            </div>
            <div className="flex-1 space-y-3 py-5">
              {active.messages.map((m) => (
                <div
                  key={m.when + m.text}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                    m.from === "company" ? "ml-auto bg-ink text-ink-foreground" : "bg-secondary",
                  )}
                >
                  <p>{m.text}</p>
                  <p className={cn("mt-1.5 text-[11px]", m.from === "company" ? "text-ink-muted" : "text-muted-foreground")}>
                    {m.when}
                  </p>
                </div>
              ))}
            </div>
            <form
              className="flex gap-2 border-t border-border pt-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (!draft.trim()) return;
                setDraft("");
                toast.success("Message sent (demo — not stored).");
              }}
            >
              <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a message" className="rounded-full px-5" />
              <Button type="submit" variant="ink">
                Send
              </Button>
            </form>
          </Panel>
        ) : null}
      </div>

      <DemoNote>Demo build — messages are sample content and replies are not stored.</DemoNote>
    </>
  );
}
