import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { DemoNote, Initials, PageHeading, Panel, Rating, Tag } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEMO_OBTAINER_ID, getObtainer } from "@/lib/data";

export const Route = createFileRoute("/obtainer/profile")({
  head: () => ({
    meta: [
      { title: "Profile — BoxLead" },
      {
        name: "description",
        content: "How companies and pool owners see you: what you take responsibility for and what you're open to.",
      },
      { property: "og:title", content: "Profile — BoxLead" },
      { property: "og:description", content: "Your public BoxLead profile." },
    ],
  }),
  component: ObtainerProfile,
});

function ObtainerProfile() {
  const me = getObtainer(DEMO_OBTAINER_ID)!;

  return (
    <>
      <PageHeading
        title="Profile"
        description="This is what companies see when they browse, and what pool owners see before they send you work."
        action={
          <Button variant="outline" asChild>
            <Link to="/browse/$obtainerId" params={{ obtainerId: me.id }}>
              View public profile
            </Link>
          </Button>
        }
      />

      <Panel>
        <div className="flex flex-wrap items-center gap-4">
          <Initials value={me.initials} tone="primary" />
          <div className="min-w-0">
            <p className="text-lg font-bold">{me.name}</p>
            <p className="text-sm text-muted-foreground">{me.location}</p>
          </div>
          <div className="ml-auto">
            <Rating value={me.rating} count={me.reviewCount} />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {me.skills.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </Panel>

      <Panel>
        <h2 className="text-lg font-bold">Edit profile</h2>
        <form
          className="mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Profile saved (demo).");
          }}
        >
          <div>
            <Label className="mb-1.5 block">Headline</Label>
            <Input defaultValue={me.headline} required />
          </div>
          <div>
            <Label className="mb-1.5 block">About</Label>
            <Textarea rows={4} defaultValue={me.about} required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-1.5 block">Location</Label>
              <Input defaultValue={me.location} />
            </div>
            <div>
              <Label className="mb-1.5 block">Availability</Label>
              <Input defaultValue={me.availability} />
            </div>
          </div>
          <Button type="submit" variant="ink">
            Save profile
          </Button>
        </form>
      </Panel>

      <DemoNote>Demo build — profile changes are not saved.</DemoNote>
    </>
  );
}
