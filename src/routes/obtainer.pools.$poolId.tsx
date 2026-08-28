import { createFileRoute } from "@tanstack/react-router";

import { PoolWorkspace } from "@/components/pool-workspace";

export const Route = createFileRoute("/obtainer/pools/$poolId")({
  head: () => ({
    meta: [
      { title: "Pool workspace — BoxLead" },
      {
        name: "description",
        content: "See paid task work inside a pool you belong to, accept what suits you and submit it for approval.",
      },
      { property: "og:title", content: "Pool workspace — BoxLead" },
      { property: "og:description", content: "Paid task work from people you already trust." },
    ],
  }),
  component: ObtainerPoolWorkspace,
});

function ObtainerPoolWorkspace() {
  const { poolId } = Route.useParams();
  return <PoolWorkspace poolId={poolId} perspective="member" backTo="/obtainer/pools" />;
}
