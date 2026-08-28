import { obtainers, services } from "@/lib/data";

/**
 * A ServiceTap is a pre-priced, already-scoped unit of an existing recurring
 * service that can be tapped to start the next cycle without a new brief.
 */
export type ServiceTap = {
  id: string;
  obtainerId: string;
  serviceId: string;
  title: string;
  category: string;
  summary: string;
  scope: string;
  price: number;
  turnaround: string;
};

export const serviceTaps: ServiceTap[] = [
  {
    id: "t1",
    obtainerId: "o1",
    serviceId: "s1",
    title: "Design update cycle",
    category: "Design",
    summary: "Tap to start the next design cycle on an agreed scope and price.",
    scope: "One cycle of interface updates and design-system upkeep (up to 20 hours).",
    price: 2400,
    turnaround: "Starts within 3 days",
  },
  {
    id: "t2",
    obtainerId: "o2",
    serviceId: "s2",
    title: "Regression pass",
    category: "Quality assurance",
    summary: "A single full regression pass with a written report.",
    scope: "One full pass across the agreed test surface, signed off in writing.",
    price: 900,
    turnaround: "Within the week",
  },
  {
    id: "t3",
    obtainerId: "o3",
    serviceId: "s3",
    title: "Maintenance block",
    category: "Software support",
    summary: "Tap when the site needs an extra block of upkeep this month.",
    scope: "Up to 10 hours of platform updates, fixes and content changes.",
    price: 1200,
    turnaround: "Same-week response",
  },
  {
    id: "t4",
    obtainerId: "o4",
    serviceId: "s4",
    title: "Monthly books close",
    category: "Bookkeeping",
    summary: "Close the month on the same scope you already agreed.",
    scope: "Reconciliation, categorisation and a month-end summary.",
    price: 800,
    turnaround: "Within 5 working days",
  },
  {
    id: "t5",
    obtainerId: "o5",
    serviceId: "s5",
    title: "Content batch",
    category: "Marketing",
    summary: "An extra batch of content on top of the recurring rhythm.",
    scope: "Four pieces written, edited and scheduled.",
    price: 650,
    turnaround: "Within 7 days",
  },
];

export const getTapObtainer = (tap: ServiceTap) => obtainers.find((o) => o.id === tap.obtainerId);
export const getTapService = (tap: ServiceTap) => services.find((s) => s.id === tap.serviceId);
