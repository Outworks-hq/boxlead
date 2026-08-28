import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { DemoNote, Initials, PageHeading, Panel, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getObtainer, money, DEMO_OBTAINER_ID } from "@/lib/data";
import {
  acceptWork,
  approveWork,
  joinPool,
  leavePool,
  postMessage,
  postWork,
  releasePayment,
  submitWork,
  usePool,
  type PoolWorkKind,
} from "@/lib/pools-store";

const KINDS: PoolWorkKind[] = ["Task", "Project", "Recurring"];

export function PoolWorkspace({
  poolId,
  perspective,
  backTo,
}: {
  poolId: string;
  perspective: "owner" | "member";
  backTo: string;
}) {
  const pool = usePool(poolId);
  const [showPost, setShowPost] = useState(false);
  const [kind, setKind] = useState<PoolWorkKind>("Task");
  const [draft, setDraft] = useState("");

  const me = getObtainer(DEMO_OBTAINER_ID)!;
  const iAmMember = pool?.members.some((m) => m.id === me.id) ?? false;

  if (!pool) {
    return (
      <>
        <PageHeading title="Pool not found" description="This pool no longer exists in the demo data." />
        <Button variant="outline" asChild>
          <Link to={backTo}>Back to Free Pools</Link>
        </Button>
      </>
    );
  }

  const openWork = pool.work.filter((w) => w.status === "Open");
  const inFlight = pool.work.filter((w) => w.status !== "Open" && w.status !== "Paid");
  const done = pool.work.filter((w) => w.status === "Paid");

  return (
    <>
      <PageHeading
        title={pool.name}
        description={`${pool.ownerType} pool · ${pool.ownerName} · ${pool.members.length} member${pool.members.length === 1 ? "" : "s"}`}
        action={
          perspective === "owner" ? (
            <Button variant="ink" onClick={() => setShowPost((v) => !v)}>
              {showPost ? "Close" : "Post paid work"}
            </Button>
          ) : iAmMember ? (
            <Button variant="outline" onClick={() => { leavePool(pool.id, me.id); toast.info("You left this pool."); }}>
              Leave pool
            </Button>
          ) : (
            <Button
              variant="ink"
              onClick={() => {
                joinPool(pool.id, { id: me.id, name: me.name, initials: me.initials, note: "Joined from BoxLead" });
                toast.success("You joined this pool — you'll see paid work as it's posted.");
              }}
            >
              Join this pool
            </Button>
          )
        }
      />

      <Panel>
        <p className="text-sm leading-relaxed text-muted-foreground">{pool.description}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Work posted here: </span>
          {pool.workDescription}
        </p>
      </Panel>

      {showPost && perspective === "owner" ? (
        <Panel>
          <h2 className="text-lg font-bold">Post paid work in this pool</h2>
          <form
            className="mt-5 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget as HTMLFormElement);
              postWork(pool.id, {
                title: String(f.get("title")),
                scope: String(f.get("scope")),
                requirements: String(f.get("requirements")),
                compensation: Number(f.get("compensation")),
                kind,
              });
              setShowPost(false);
              toast.success("Posted — members can now choose whether to take it on.");
            }}
          >
            <div>
              <Label className="mb-1.5 block">Title</Label>
              <Input name="title" placeholder="Accessibility sweep on the booking flow" required />
            </div>
            <div>
              <Label className="mb-1.5 block">Scope</Label>
              <Textarea name="scope" rows={3} placeholder="What the work covers and roughly how long it should take." required />
            </div>
            <div>
              <Label className="mb-1.5 block">Requirements</Label>
              <Textarea name="requirements" rows={2} placeholder="What you need back, and any tools or access involved." required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-1.5 block">Payment attached</Label>
                <Input name="compensation" type="number" min={1} placeholder="600" required />
              </div>
              <div>
                <Label className="mb-1.5 block">Type of work</Label>
                <div className="flex flex-wrap gap-2">
                  {KINDS.map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setKind(k)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        kind === k ? "border-primary text-primary" : "border-border text-muted-foreground"
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Button type="submit" variant="ink">
              Post work
            </Button>
          </form>
        </Panel>
      ) : null}

      <Panel>
        <h2 className="text-lg font-bold">Available work</h2>
        {openWork.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">Nothing open right now. Members stay in the pool and see new work when it's posted.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {openWork.map((w) => (
              <li key={w.id} className="rounded-2xl border border-border p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold">{w.title}</p>
                  <StatusPill status={w.status} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{w.scope}</p>
                <p className="mt-1 text-sm text-muted-foreground">{w.requirements}</p>
                <p className="mt-2 text-sm">
                  <span className="font-bold">{money(w.compensation)}</span>
                  <span className="text-muted-foreground"> · {w.kind.toLowerCase()} · posted {w.posted}</span>
                </p>
                {perspective === "member" && iAmMember ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      variant="ink"
                      size="sm"
                      onClick={() => {
                        acceptWork(pool.id, w.id, { id: me.id, name: me.name });
                        toast.success("Accepted — the payment stays attached until you submit and it's approved.");
                      }}
                    >
                      Accept work
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => toast.info("Skipped — your membership is unaffected.")}>
                      Not this time
                    </Button>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {inFlight.length ? (
        <Panel>
          <h2 className="text-lg font-bold">In progress</h2>
          <ul className="mt-4 space-y-3">
            {inFlight.map((w) => {
              const mine = w.acceptedBy === me.id;
              return (
                <li key={w.id} className="rounded-2xl border border-border p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold">{w.title}</p>
                    <StatusPill status={w.status} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{w.scope}</p>
                  <p className="mt-2 text-sm">
                    <span className="font-bold">{money(w.compensation)}</span>
                    {w.acceptedByName ? (
                      <span className="text-muted-foreground"> · accepted by {w.acceptedByName}</span>
                    ) : null}
                  </p>
                  {w.submissionNote ? (
                    <p className="mt-2 rounded-xl bg-secondary p-3 text-sm">{w.submissionNote}</p>
                  ) : null}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {perspective === "member" && mine && w.status === "Accepted" ? (
                      <Button
                        variant="ink"
                        size="sm"
                        onClick={() => {
                          submitWork(pool.id, w.id, "Work completed and handed over for review.");
                          toast.success("Submitted for approval.");
                        }}
                      >
                        Submit work
                      </Button>
                    ) : null}
                    {perspective === "owner" && w.status === "Submitted" ? (
                      <Button variant="ink" size="sm" onClick={() => { approveWork(pool.id, w.id); toast.success("Approved."); }}>
                        Approve work
                      </Button>
                    ) : null}
                    {perspective === "owner" && w.status === "Approved" ? (
                      <Button
                        variant="ink"
                        size="sm"
                        onClick={() => { releasePayment(pool.id, w.id); toast.success("Payment released (demo)."); }}
                      >
                        Release payment
                      </Button>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      ) : null}

      {done.length ? (
        <Panel>
          <h2 className="text-lg font-bold">Completed and paid</h2>
          <ul className="mt-4 space-y-3">
            {done.map((w) => (
              <li key={w.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border p-4">
                <div>
                  <p className="font-semibold">{w.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {w.acceptedByName ? `${w.acceptedByName} · ` : ""}posted {w.posted}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold">{money(w.compensation)}</span>
                  <StatusPill status={w.status} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      ) : null}

      <Panel>
        <h2 className="text-lg font-bold">Members ({pool.members.length})</h2>
        {pool.members.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            No one has joined yet. Share the pool with people you already trust — they stay connected and see work as you post it.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {pool.members.map((m) => (
              <li key={m.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-border p-4">
                <Initials value={m.initials} size="sm" tone="primary" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{m.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {m.note} · joined {m.joined}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel>
        <h2 className="text-lg font-bold">Pool activity</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {pool.activity.slice(0, 8).map((a) => (
            <li key={a.id}>
              {a.text} · <span className="text-xs">{a.when}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel>
        <h2 className="text-lg font-bold">Pool discussion</h2>
        <ul className="mt-4 space-y-3">
          {pool.messages.length === 0 ? (
            <li className="text-sm text-muted-foreground">No messages yet — use this to talk through work before or during it.</li>
          ) : (
            pool.messages.map((m) => (
              <li key={m.id} className="rounded-2xl border border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {m.author} · {m.when}
                </p>
                <p className="mt-2 text-sm">{m.text}</p>
              </li>
            ))
          )}
        </ul>
        <form
          className="mt-4 flex flex-wrap gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!draft.trim()) return;
            postMessage(pool.id, perspective === "owner" ? pool.ownerName : me.name, draft.trim());
            setDraft("");
          }}
        >
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write a message to the pool"
            className="min-w-[220px] flex-1"
          />
          <Button type="submit" variant="ink">
            Send
          </Button>
        </form>
      </Panel>

      <div>
        <Button variant="outline" asChild>
          <Link to={backTo}>Back to Free Pools</Link>
        </Button>
      </div>

      <DemoNote>Demo build — pool membership never guarantees work, and everything is stored locally in your browser.</DemoNote>
    </>
  );
}
