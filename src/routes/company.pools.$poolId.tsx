import { createFileRoute } from "@tanstack/react-router";

import { PoolWorkspace } from "@/components/pool-workspace";

export const Route = createFileRoute("/company/pools/$poolId")({
  head: () => ({
    meta: [
      { title: "Pool workspace — BoxLead" },
      {
        name: "description",
        content: "Post paid task work inside your Free Pool, approve submissions and release payment.",
      },
      { property: "og:title", content: "Pool workspace — BoxLead" },
      { property: "og:description", content: "Your pool members, work and activity in one place." },
    ],
  }),
  component: CompanyPoolWorkspace,
});

function CompanyPoolWorkspace() {
  const { poolId } = Route.useParams();
  return <PoolWorkspace poolId={poolId} perspective="owner" backTo="/company/pools" />;
}
