import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PublicShell } from "@/components/public-shell";
import { Button } from "@/components/ui/button";
import { getTopic, LEARN_TOPICS } from "@/lib/learn-more";

export const Route = createFileRoute("/learn-more/$topic")({
  loader: ({ params }) => {
    const topic = getTopic(params.topic);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — BoxLead" }, { name: "robots", content: "noindex" }] };
    }
    const { topic } = loaderData;
    return {
      meta: [
        { title: `${topic.name} — BoxLead` },
        { name: "description", content: topic.short },
        { property: "og:title", content: `${topic.name} — BoxLead` },
        { property: "og:description", content: topic.short },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: TopicNotFound,
  component: TopicPage,
});

function TopicNotFound() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <h1 className="text-3xl font-extrabold">We couldn't find that page</h1>
        <p className="mt-3 text-muted-foreground">Try the Learn More overview instead.</p>
        <Button className="mt-7" asChild>
          <Link to="/learn-more">Learn More</Link>
        </Button>
      </section>
    </PublicShell>
  );
}

function TopicPage() {
  const { topic } = Route.useLoaderData();
  const others = LEARN_TOPICS.filter((t) => t.slug !== topic.slug);

  return (
    <PublicShell>
      <section className="surface-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <h1 className="max-w-2xl text-4xl font-extrabold text-ink-foreground sm:text-5xl">{topic.name}</h1>
          <p className="mt-5 max-w-2xl text-ink-muted">{topic.short}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed">{topic.intro}</p>
          <ul className="mt-8 space-y-3">
            {topic.points.map((p) => (
              <li key={p} className="rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed shadow-card">
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/auth" search={{ mode: "signup" }}>
                Get started
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/how-it-works">How it works</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">More BoxLead functions</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.map((t) => (
              <Link
                key={t.slug}
                to="/learn-more/$topic"
                params={{ topic: t.slug }}
                className="rounded-2xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
              >
                <h2 className="text-lg font-bold">{t.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
