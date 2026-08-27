import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { DemoNote, PageHeading, Panel } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { companies, DEMO_COMPANY_ID } from "@/lib/data";

export const Route = createFileRoute("/company/settings")({
  head: () => ({
    meta: [
      { title: "Company settings — BoxLead" },
      { name: "description", content: "Update your company profile as obtainers see it." },
      { property: "og:title", content: "Company settings — BoxLead" },
      { property: "og:description", content: "Manage your company profile on BoxLead." },
    ],
  }),
  component: CompanySettings,
});

function CompanySettings() {
  const company = companies.find((c) => c.id === DEMO_COMPANY_ID)!;

  return (
    <>
      <PageHeading title="Settings" description="This is what obtainers see when you post a recurring need." />

      <Panel>
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Profile saved (demo — not persisted).");
          }}
        >
          <div className="sm:col-span-2">
            <Label className="mb-1.5 block">Company name</Label>
            <Input defaultValue={company.name} />
          </div>
          <div>
            <Label className="mb-1.5 block">Industry</Label>
            <Input defaultValue={company.industry} />
          </div>
          <div>
            <Label className="mb-1.5 block">Location</Label>
            <Input defaultValue={company.location} />
          </div>
          <div className="sm:col-span-2">
            <Label className="mb-1.5 block">Website</Label>
            <Input defaultValue={company.website} />
          </div>
          <div className="sm:col-span-2">
            <Label className="mb-1.5 block">About</Label>
            <Textarea rows={4} defaultValue={company.description} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" variant="ink">
              Save profile
            </Button>
          </div>
        </form>
      </Panel>

      <DemoNote>Demo build — settings changes are not stored.</DemoNote>
    </>
  );
}
