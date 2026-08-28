import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, Repeat, ShieldCheck, Users } from "lucide-react";

import heroImage from "@/assets/hero-collab.jpg";
import { Initials, Rating } from "@/components/brand";
import { PublicShell } from "@/components/public-shell";
import { Button } from "@/components/ui/button";
import { CATEGORIES, money, obtainers, servicesByObtainer } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BoxLead — Recurring service relationships for companies" },
      {
        name: "description",
        content:
          "BoxLead helps companies build ongoing working relationships with trusted Obtainers through recurring services with a clear scope, price and billing rhythm.",
      },
      { property: "og:title", content: "BoxLead — Recurring service relationships for companies" },
      {
        property: "og:description",
        content: "Ongoing recurring service relationships with trusted Obtainers. Not job posts.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = obtainers.slice(0, 3);

  return (
    <PublicShell>
      <section className="surface-ink relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-28 lg:pt-16">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink-muted">
              <Repeat className="size-3.5" /> Recurring work and paid tasks
            </span>
            <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] text-ink-foreground sm:text-6xl">
              Work that repeats.
              <br />
              Relationships
              <br />
              that last.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
              BoxLead is where companies find obtainers who take ongoing responsibility for recurring
              work — an agreed scope, an agreed price, billed on a rhythm you both choose. And when work
              isn't recurring, people stay connected in a Free Pool and choose paid tasks as they come up,
              instead of starting a new freelancer search every time.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button variant="light" size="lg" asChild>
                <Link to="/auth" search={{ mode: "signup" }}>
                  I need work done <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="onInk" size="lg" asChild>
                <Link to="/auth" search={{ mode: "signup" }}>
                  I provide services and take on work
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-ink-muted">
              Demo build — all companies, obtainers and figures shown are sample content.
            </p>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Two colleagues reviewing recurring service work together"
              className="hero-mask h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            What people take on here
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                to="/browse"
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Two ways to keep work moving</h2>
          <p className="mt-3 text-muted-foreground">
            Recurring services cover the responsibilities that never really end. Free Pools cover everything
            else — paid task work sent to people you already trust, with the payment attached before anyone
            starts. Both have a defined scope and a defined price.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Repeat,
              title: "Ongoing responsibility",
              body: "An obtainer takes on a recurring service — design updates, QA passes, monthly close — and keeps it running for an agreed recurring payment.",
            },
            {
              icon: CalendarClock,
              title: "Paid work through trusted connections",
              body: "Join a Free Pool and stay connected to a company, individual or community. When they have paid task work, it appears there with the payment attached and you choose whether to take it.",
            },
            {
              icon: ShieldCheck,
              title: "Scope and payment agreed upfront",
              body: "Recurring or one-off, what's included and what it pays is written down before anything starts, and paid out once the work is approved.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <span className="grid size-11 place-items-center rounded-full bg-primary-soft text-accent-foreground">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <h2 className="text-3xl font-extrabold text-ink-foreground sm:text-4xl">
                Obtainers you can keep working with
              </h2>
              <p className="mt-3 text-ink-muted">
                People who run a small number of ongoing responsibilities and take on extra paid tasks from
                the companies and communities whose pools they're in.
              </p>
            </div>
            <Button variant="onInk" asChild>
              <Link to="/browse">Browse all obtainers</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featured.map((o) => {
              const svc = servicesByObtainer(o.id)[0];
              return (
                <Link
                  key={o.id}
                  to="/browse/$obtainerId"
                  params={{ obtainerId: o.id }}
                  className="rounded-2xl bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <Initials value={o.initials} tone="primary" />
                    <div className="min-w-0">
                      <p className="truncate font-bold">{o.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{o.location}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-medium leading-snug">{o.headline}</p>
                  <div className="mt-4">
                    <Rating value={o.rating} count={o.reviewCount} />
                  </div>
                  <p className="mt-4 border-t border-border pt-4 text-sm">
                    <span className="font-bold">{money(o.fromPrice)}</span>
                    <span className="text-muted-foreground"> / {o.fromFrequency.toLowerCase()}</span>
                    {svc ? <span className="text-muted-foreground"> · {svc.title}</span> : null}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-card sm:p-10">
            <span className="grid size-11 place-items-center rounded-full bg-secondary">
              <Users className="size-5" />
            </span>
            <h3 className="mt-5 text-2xl font-extrabold">For companies</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Post a recurring need or approach an obtainer directly. Agree the scope, confirm the price and
              the relationship starts. Then create a Free Pool — your own work space where people you trust
              stay connected, see the paid tasks you post with payment attached, and choose what to take on.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/for-companies">How it works for companies</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/browse">Browse obtainers</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-3xl bg-ink p-8 text-ink-foreground sm:p-10">
            <span className="grid size-11 place-items-center rounded-full bg-ink-foreground/10">
              <Repeat className="size-5" />
            </span>
            <h3 className="mt-5 text-2xl font-extrabold">For obtainers</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Publish the recurring services you offer, set your price and rhythm, and take on a small number
              of relationships you can keep. Join the Free Pools of companies and communities you trust and
              pick up paid tasks as they post them — no new search, no starting from scratch each time.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button variant="light" asChild>
                <Link to="/for-obtainers">How it works for obtainers</Link>
              </Button>
              <Button variant="onInk" asChild>
                <Link to="/needs">See available work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
