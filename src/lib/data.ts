// Demo data for the BoxLead MVP. All content here is sample/demo content and is
// clearly labelled as such in the UI. No real ratings, revenue or user counts.

export type Frequency = "Weekly" | "Bi-weekly" | "Monthly" | "Quarterly";
export type AgreementStatus = "Pending" | "Active" | "Paused" | "Canceled" | "Ended";

export type Obtainer = {
  id: string;
  name: string;
  initials: string;
  headline: string;
  about: string;
  location: string;
  remote: boolean;
  categories: string[];
  skills: string[];
  availability: string;
  fromPrice: number;
  fromFrequency: Frequency;
  rating: number;
  reviewCount: number;
  completedRelationships: number;
  repeatRelationships: number;
  since: string;
  work: { title: string; note: string }[];
  reviews: { company: string; rating: number; text: string; duration: string }[];
};

export type RecurringService = {
  id: string;
  obtainerId: string;
  title: string;
  category: string;
  description: string;
  scope: string;
  included: string[];
  excluded: string[];
  price: number;
  billing: Frequency;
  serviceFrequency: string;
  availability: string;
  examples?: string[];
};

export type Company = {
  id: string;
  name: string;
  initials: string;
  description: string;
  industry: string;
  website: string;
  location: string;
  remoteFriendly: boolean;
  since: string;
  relationships: number;
};

export type RecurringNeed = {
  id: string;
  companyId: string;
  title: string;
  category: string;
  description: string;
  scope: string;
  skills: string[];
  covered: string[];
  limits: string;
  price: number;
  billing: Frequency;
  workFrequency: string;
  startTiming: string;
  remote: string;
  posted: string;
  interested: { obtainerId: string; note: string; when: string }[];
};

export type Agreement = {
  id: string;
  companyId: string;
  obtainerId: string;
  title: string;
  description: string;
  scope: string;
  included: string[];
  excluded: string[];
  price: number;
  billing: Frequency;
  startDate: string;
  status: AgreementStatus;
  nextBilling: string | null;
  paymentMethod: string;
  history: { date: string; event: string }[];
};

export type Pool = {
  id: string;
  companyId: string;
  name: string;
  description: string;
  members: { obtainerId: string; joined: string; note: string }[];
  opportunities: PoolOpportunity[];
};

export type PoolOpportunity = {
  id: string;
  poolId: string;
  title: string;
  scope: string;
  compensation: number;
  status: "Open" | "Accepted" | "Submitted" | "Approved" | "Paid";
  acceptedBy?: string;
  posted: string;
};

export type PrivateLink = {
  slug: string;
  obtainerId: string;
  serviceId: string;
  active: boolean;
  created: string;
  subscribers: number;
};

export type Thread = {
  id: string;
  companyId: string;
  obtainerId: string;
  context: string;
  messages: { from: "company" | "obtainer"; text: string; when: string }[];
};

export const CATEGORIES = [
  "Design",
  "Software support",
  "Quality assurance",
  "Marketing",
  "Bookkeeping",
  "Recruiting support",
  "Administrative support",
  "AI automation",
];

export const companies: Company[] = [
  {
    id: "c1",
    name: "Northbeam Labs",
    initials: "NL",
    description:
      "A 24-person product company building scheduling software for clinics. We keep a small core team and rely on recurring service relationships for design, QA and bookkeeping.",
    industry: "Software",
    website: "northbeamlabs.com",
    location: "Austin, TX",
    remoteFriendly: true,
    since: "2024",
    relationships: 6,
  },
  {
    id: "c2",
    name: "Halden & Rowe",
    initials: "HR",
    description: "Independent accounting practice supporting small businesses across the Midwest.",
    industry: "Professional services",
    website: "haldenrowe.com",
    location: "Chicago, IL",
    remoteFriendly: true,
    since: "2025",
    relationships: 2,
  },
  {
    id: "c3",
    name: "Verity Foods",
    initials: "VF",
    description: "Regional food brand with a lean marketing team and ongoing content needs.",
    industry: "Consumer goods",
    website: "verityfoods.com",
    location: "Denver, CO",
    remoteFriendly: false,
    since: "2025",
    relationships: 3,
  },
];

export const obtainers: Obtainer[] = [
  {
    id: "o1",
    name: "Marcus Johnson",
    initials: "MJ",
    headline: "Ongoing product design support for small software teams",
    about:
      "I take responsibility for a company's ongoing design work — interface updates, design system upkeep and steady iteration — on a monthly basis. I work with two to four companies at a time so each relationship stays reliable.",
    location: "Atlanta, GA",
    remote: true,
    categories: ["Design"],
    skills: ["Product design", "Design systems", "Figma", "Prototyping", "Webflow"],
    availability: "Available — 1 opening",
    fromPrice: 2400,
    fromFrequency: "Monthly",
    rating: 4.9,
    reviewCount: 12,
    completedRelationships: 9,
    repeatRelationships: 4,
    since: "2024",
    work: [
      { title: "Clinic scheduling app refresh", note: "Ongoing monthly interface updates, 14 months" },
      { title: "Design system upkeep for a fintech tool", note: "Component library maintained weekly" },
    ],
    reviews: [
      {
        company: "Northbeam Labs",
        rating: 5,
        text: "Marcus has handled our design updates every month without us chasing him. Scope is clear and he flags anything outside it.",
        duration: "14 month relationship",
      },
      {
        company: "Halden & Rowe",
        rating: 5,
        text: "Steady, predictable, easy to work with. We renewed twice.",
        duration: "8 month relationship",
      },
    ],
  },
  {
    id: "o2",
    name: "Priya Raman",
    initials: "PR",
    headline: "Recurring QA coverage for product releases",
    about:
      "I own release-cycle QA for small product teams: regression passes, bug reports and release sign-off on an agreed weekly rhythm.",
    location: "Toronto, ON",
    remote: true,
    categories: ["Quality assurance", "Software support"],
    skills: ["Manual QA", "Playwright", "Regression testing", "Bug triage", "Release sign-off"],
    availability: "Available — 2 openings",
    fromPrice: 900,
    fromFrequency: "Weekly",
    rating: 4.8,
    reviewCount: 7,
    completedRelationships: 5,
    repeatRelationships: 2,
    since: "2025",
    work: [{ title: "Weekly regression coverage", note: "Two-year relationship with a B2B SaaS team" }],
    reviews: [
      {
        company: "Northbeam Labs",
        rating: 5,
        text: "Priya's weekly regression pass caught issues before every release. Reports are consistent.",
        duration: "11 month relationship",
      },
    ],
  },
  {
    id: "o3",
    name: "Ellis Grant",
    initials: "EG",
    headline: "Monthly website maintenance and small fixes",
    about:
      "I keep company websites healthy — updates, small bug fixes, uptime checks and content changes — on a monthly retainer with a clearly capped scope.",
    location: "Manchester, UK",
    remote: true,
    categories: ["Software support"],
    skills: ["WordPress", "React", "Performance", "Accessibility", "Hosting"],
    availability: "Available from next month",
    fromPrice: 1200,
    fromFrequency: "Monthly",
    rating: 4.7,
    reviewCount: 9,
    completedRelationships: 11,
    repeatRelationships: 5,
    since: "2024",
    work: [{ title: "Marketing site upkeep", note: "Monthly fixes and content updates, 2 years" }],
    reviews: [
      {
        company: "Verity Foods",
        rating: 5,
        text: "Ellis handles our site so we never think about it. Anything larger gets quoted separately, which we appreciate.",
        duration: "19 month relationship",
      },
    ],
  },
  {
    id: "o4",
    name: "Sofia Marchetti",
    initials: "SM",
    headline: "Bookkeeping and monthly close for small companies",
    about:
      "Monthly bookkeeping, reconciliation and close packages for companies under 50 people. Fixed monthly scope, no surprises.",
    location: "Lisbon, PT",
    remote: true,
    categories: ["Bookkeeping", "Administrative support"],
    skills: ["Bookkeeping", "Reconciliation", "Xero", "QuickBooks", "Monthly close"],
    availability: "Waitlist",
    fromPrice: 1500,
    fromFrequency: "Monthly",
    rating: 5,
    reviewCount: 6,
    completedRelationships: 6,
    repeatRelationships: 3,
    since: "2025",
    work: [{ title: "Monthly close for a 30-person agency", note: "Ongoing" }],
    reviews: [
      {
        company: "Halden & Rowe",
        rating: 5,
        text: "Close lands on the same day every month.",
        duration: "10 month relationship",
      },
    ],
  },
  {
    id: "o5",
    name: "Dara Okoye",
    initials: "DO",
    headline: "Ongoing marketing support — content and email",
    about:
      "I run a company's recurring marketing rhythm: monthly content, newsletters and campaign upkeep against an agreed volume.",
    location: "Remote — GMT+1",
    remote: true,
    categories: ["Marketing"],
    skills: ["Content", "Email marketing", "SEO", "Copywriting", "Analytics"],
    availability: "Available — 1 opening",
    fromPrice: 1800,
    fromFrequency: "Monthly",
    rating: 4.6,
    reviewCount: 5,
    completedRelationships: 4,
    repeatRelationships: 1,
    since: "2025",
    work: [{ title: "Monthly content programme", note: "Four posts and two newsletters per month" }],
    reviews: [
      {
        company: "Verity Foods",
        rating: 5,
        text: "Consistent output, clear monthly scope.",
        duration: "7 month relationship",
      },
    ],
  },
  {
    id: "o6",
    name: "Tobias Lund",
    initials: "TL",
    headline: "AI automation upkeep and workflow maintenance",
    about:
      "I maintain automation workflows companies already depend on — monitoring, fixes and small improvements on a monthly basis.",
    location: "Copenhagen, DK",
    remote: true,
    categories: ["AI automation", "Software support"],
    skills: ["Automation", "Integrations", "Python", "Monitoring", "Prompt maintenance"],
    availability: "Available — 2 openings",
    fromPrice: 1600,
    fromFrequency: "Monthly",
    rating: 4.8,
    reviewCount: 4,
    completedRelationships: 3,
    repeatRelationships: 1,
    since: "2026",
    work: [{ title: "Ops automation upkeep", note: "Monthly monitoring and fixes" }],
    reviews: [
      {
        company: "Northbeam Labs",
        rating: 5,
        text: "Our workflows stopped breaking silently. Tobias reports monthly.",
        duration: "5 month relationship",
      },
    ],
  },
];

export const services: RecurringService[] = [
  {
    id: "s1",
    obtainerId: "o1",
    title: "Monthly Design Updates",
    category: "Design",
    description:
      "Ongoing responsibility for your product's interface changes — a steady stream of screens, states and design-system upkeep each month.",
    scope: "Up to 20 design hours per month, delivered continuously rather than as a single project.",
    included: [
      "Interface updates for existing product areas",
      "Design system component upkeep",
      "Design review on shipped work",
      "One scheduled call per month",
    ],
    excluded: ["Full product redesigns", "Brand identity work", "Motion or 3D work", "Front-end implementation"],
    price: 2400,
    billing: "Monthly",
    serviceFrequency: "Continuous, with weekly hand-offs",
    availability: "1 opening",
    examples: ["Clinic scheduling app refresh", "Fintech design system upkeep"],
  },
  {
    id: "s2",
    obtainerId: "o2",
    title: "Weekly QA Coverage",
    category: "Quality assurance",
    description: "I own the regression pass and release sign-off for your product every week.",
    scope: "One full regression pass per week plus triage of incoming bug reports.",
    included: ["Weekly regression pass", "Written bug reports", "Release sign-off", "Bug triage during the week"],
    excluded: ["Building automated test infrastructure from scratch", "Load testing", "Security auditing"],
    price: 900,
    billing: "Weekly",
    serviceFrequency: "Weekly",
    availability: "2 openings",
  },
  {
    id: "s3",
    obtainerId: "o3",
    title: "Monthly Website Maintenance",
    category: "Software support",
    description: "Your website stays updated, fast and working. Small fixes handled as they come up.",
    scope: "Up to 10 hours of maintenance per month.",
    included: ["Platform and plugin updates", "Small bug fixes", "Content updates", "Uptime and performance checks"],
    excluded: ["New page builds beyond one per month", "Redesigns", "Custom application development"],
    price: 1200,
    billing: "Monthly",
    serviceFrequency: "Monthly, with same-week response on issues",
    availability: "From next month",
  },
  {
    id: "s4",
    obtainerId: "o4",
    title: "Monthly Bookkeeping & Close",
    category: "Bookkeeping",
    description: "Books reconciled and closed every month on a fixed schedule.",
    scope: "Up to 250 transactions per month across two accounts.",
    included: ["Transaction categorisation", "Bank reconciliation", "Monthly close package", "Quarterly summary"],
    excluded: ["Tax filing", "Payroll processing", "Audit support"],
    price: 1500,
    billing: "Monthly",
    serviceFrequency: "Monthly",
    availability: "Waitlist",
  },
  {
    id: "s5",
    obtainerId: "o5",
    title: "Ongoing Marketing Support",
    category: "Marketing",
    description: "A steady monthly marketing rhythm: content, newsletters and campaign upkeep.",
    scope: "Four articles and two newsletters per month.",
    included: ["Content writing", "Newsletter production", "Basic SEO upkeep", "Monthly performance note"],
    excluded: ["Paid media budget management", "Brand strategy", "Video production"],
    price: 1800,
    billing: "Monthly",
    serviceFrequency: "Monthly",
    availability: "1 opening",
  },
  {
    id: "s6",
    obtainerId: "o6",
    title: "Automation Workflow Upkeep",
    category: "AI automation",
    description: "I keep the automations your team relies on running, and fix them when they break.",
    scope: "Up to 12 workflows monitored, up to 8 hours of fixes per month.",
    included: ["Monitoring and alerts", "Break/fix work", "Small improvements", "Monthly status report"],
    excluded: ["Building new automation platforms", "Data migration projects"],
    price: 1600,
    billing: "Monthly",
    serviceFrequency: "Monthly",
    availability: "2 openings",
  },
];

export const needs: RecurringNeed[] = [
  {
    id: "n1",
    companyId: "c1",
    title: "Handle weekly design updates for our product",
    category: "Design",
    description:
      "We ship every two weeks and need someone responsible for the ongoing interface work rather than a one-off project.",
    scope: "Roughly 15–20 hours of design work per month, continuous.",
    skills: ["Product design", "Figma", "Design systems"],
    covered: ["Interface updates for new features", "Design system upkeep", "Review of shipped screens"],
    limits: "Brand work and full redesigns are out of scope and would be agreed separately.",
    price: 2400,
    billing: "Monthly",
    workFrequency: "Weekly hand-offs",
    startTiming: "Within 2 weeks",
    remote: "Remote",
    posted: "3 days ago",
    interested: [
      { obtainerId: "o1", note: "This matches the monthly design service I already run. One opening available.", when: "2 days ago" },
      { obtainerId: "o5", note: "Happy to cover the content-adjacent design work as well.", when: "1 day ago" },
    ],
  },
  {
    id: "n2",
    companyId: "c1",
    title: "Provide ongoing QA for product releases",
    category: "Quality assurance",
    description: "Weekly regression coverage and sign-off before each release.",
    scope: "One regression pass per week plus triage.",
    skills: ["Manual QA", "Regression testing", "Bug triage"],
    covered: ["Weekly regression pass", "Written reports", "Release sign-off"],
    limits: "Test automation build-out is not included.",
    price: 900,
    billing: "Weekly",
    workFrequency: "Weekly",
    startTiming: "Immediately",
    remote: "Remote",
    posted: "1 week ago",
    interested: [{ obtainerId: "o2", note: "I run this exact coverage weekly for two other teams.", when: "6 days ago" }],
  },
  {
    id: "n3",
    companyId: "c3",
    title: "Maintain our website bugs each month",
    category: "Software support",
    description: "Small monthly maintenance responsibility for our marketing site.",
    scope: "Up to 10 hours per month.",
    skills: ["WordPress", "Performance", "Accessibility"],
    covered: ["Plugin updates", "Bug fixes", "Content changes"],
    limits: "New page templates quoted separately.",
    price: 1200,
    billing: "Monthly",
    workFrequency: "Monthly, with same-week response",
    startTiming: "Next month",
    remote: "Remote",
    posted: "5 days ago",
    interested: [],
  },
  {
    id: "n4",
    companyId: "c2",
    title: "Monthly bookkeeping and close",
    category: "Bookkeeping",
    description: "Recurring bookkeeping responsibility for a practice with two entities.",
    scope: "Up to 250 transactions per month.",
    skills: ["Bookkeeping", "Reconciliation", "Xero"],
    covered: ["Categorisation", "Reconciliation", "Monthly close package"],
    limits: "Tax filing handled internally.",
    price: 1500,
    billing: "Monthly",
    workFrequency: "Monthly",
    startTiming: "Within a month",
    remote: "Remote",
    posted: "2 weeks ago",
    interested: [{ obtainerId: "o4", note: "Currently on waitlist but can start in four weeks.", when: "9 days ago" }],
  },
  {
    id: "n5",
    companyId: "c3",
    title: "Maintain our automation workflows",
    category: "AI automation",
    description: "Ongoing upkeep of the internal automations our ops team depends on.",
    scope: "Up to 12 workflows monitored.",
    skills: ["Automation", "Integrations", "Monitoring"],
    covered: ["Monitoring", "Break/fix", "Monthly report"],
    limits: "New platform builds are separate.",
    price: 1600,
    billing: "Monthly",
    workFrequency: "Monthly",
    startTiming: "Flexible",
    remote: "Remote",
    posted: "4 days ago",
    interested: [],
  },
];

export const agreements: Agreement[] = [
  {
    id: "a1",
    companyId: "c1",
    obtainerId: "o1",
    title: "Monthly Design Updates",
    description: "Ongoing responsibility for interface changes and design system upkeep.",
    scope: "Up to 20 design hours per month, delivered continuously.",
    included: ["Interface updates", "Design system upkeep", "Design review", "One monthly call"],
    excluded: ["Full redesigns", "Brand identity", "Front-end implementation"],
    price: 2400,
    billing: "Monthly",
    startDate: "May 5, 2026",
    status: "Active",
    nextBilling: "Sep 5, 2026",
    paymentMethod: "Visa ending 4242",
    history: [
      { date: "Aug 5, 2026", event: "Payment of $2,400 succeeded" },
      { date: "Jul 5, 2026", event: "Payment of $2,400 succeeded" },
      { date: "Jun 5, 2026", event: "Scope confirmed by both sides — no change" },
      { date: "May 5, 2026", event: "Recurring service became active" },
    ],
  },
  {
    id: "a2",
    companyId: "c1",
    obtainerId: "o2",
    title: "Weekly QA Coverage",
    description: "Weekly regression pass and release sign-off.",
    scope: "One regression pass per week plus triage.",
    included: ["Weekly regression pass", "Bug reports", "Release sign-off"],
    excluded: ["Automation build-out", "Load testing"],
    price: 900,
    billing: "Weekly",
    startDate: "Jun 15, 2026",
    status: "Active",
    nextBilling: "Aug 24, 2026",
    paymentMethod: "Visa ending 4242",
    history: [
      { date: "Aug 17, 2026", event: "Payment of $900 succeeded" },
      { date: "Aug 10, 2026", event: "Payment of $900 succeeded" },
      { date: "Jun 15, 2026", event: "Recurring service became active" },
    ],
  },
  {
    id: "a3",
    companyId: "c1",
    obtainerId: "o6",
    title: "Automation Workflow Upkeep",
    description: "Monitoring and maintenance of internal automation workflows.",
    scope: "Up to 12 workflows, 8 hours of fixes per month.",
    included: ["Monitoring", "Break/fix", "Monthly report"],
    excluded: ["New platform builds", "Data migration"],
    price: 1600,
    billing: "Monthly",
    startDate: "Mar 1, 2026",
    status: "Paused",
    nextBilling: null,
    paymentMethod: "Visa ending 4242",
    history: [
      { date: "Aug 1, 2026", event: "Paused by company — billing stopped" },
      { date: "Jul 1, 2026", event: "Payment of $1,600 succeeded" },
      { date: "Mar 1, 2026", event: "Recurring service became active" },
    ],
  },
  {
    id: "a4",
    companyId: "c3",
    obtainerId: "o3",
    title: "Monthly Website Maintenance",
    description: "Ongoing website upkeep and small fixes.",
    scope: "Up to 10 hours per month.",
    included: ["Updates", "Bug fixes", "Content changes"],
    excluded: ["Redesigns", "New templates"],
    price: 1200,
    billing: "Monthly",
    startDate: "Jul 12, 2026",
    status: "Pending",
    nextBilling: "Starts on confirmation",
    paymentMethod: "Not added yet",
    history: [{ date: "Aug 18, 2026", event: "Scope proposed — waiting on both confirmations" }],
  },
];

export const pools: Pool[] = [
  {
    id: "p1",
    companyId: "c1",
    name: "Northbeam Trusted Network",
    description:
      "People we have worked with before and want quick access to. Membership does not guarantee work — members choose what they accept.",
    members: [
      { obtainerId: "o1", joined: "Jun 2026", note: "Ongoing design relationship" },
      { obtainerId: "o2", joined: "Jul 2026", note: "Weekly QA" },
      { obtainerId: "o3", joined: "Jul 2026", note: "Previous site work" },
    ],
    opportunities: [
      {
        id: "po1",
        poolId: "p1",
        title: "One-off accessibility sweep on the booking flow",
        scope: "Audit the booking flow and list issues with severity. Around 6 hours.",
        compensation: 600,
        status: "Open",
        posted: "2 days ago",
      },
      {
        id: "po2",
        poolId: "p1",
        title: "Update onboarding screenshots for the help centre",
        scope: "Recapture 18 screenshots after the July release.",
        compensation: 350,
        status: "Submitted",
        acceptedBy: "o1",
        posted: "1 week ago",
      },
      {
        id: "po3",
        poolId: "p1",
        title: "Regression pass on the new billing page",
        scope: "Single pass, written report.",
        compensation: 400,
        status: "Paid",
        acceptedBy: "o2",
        posted: "3 weeks ago",
      },
    ],
  },
  {
    id: "p2",
    companyId: "c3",
    name: "Verity Content Circle",
    description: "Writers and designers who already know our brand.",
    members: [
      { obtainerId: "o5", joined: "Apr 2026", note: "Monthly content" },
      { obtainerId: "o3", joined: "May 2026", note: "Site upkeep" },
    ],
    opportunities: [
      {
        id: "po4",
        poolId: "p2",
        title: "Two extra product descriptions for autumn range",
        scope: "Outside the monthly content scope — separate compensation.",
        compensation: 220,
        status: "Accepted",
        acceptedBy: "o5",
        posted: "4 days ago",
      },
    ],
  },
];

export const privateLinks: PrivateLink[] = [
  { slug: "monthly-design-updates", obtainerId: "o1", serviceId: "s1", active: true, created: "Jun 2026", subscribers: 2 },
  { slug: "weekly-qa-coverage", obtainerId: "o2", serviceId: "s2", active: true, created: "Jul 2026", subscribers: 1 },
  { slug: "website-maintenance", obtainerId: "o3", serviceId: "s3", active: false, created: "May 2026", subscribers: 0 },
];

export const threads: Thread[] = [
  {
    id: "t1",
    companyId: "c1",
    obtainerId: "o1",
    context: "Monthly Design Updates — active service",
    messages: [
      { from: "company", text: "Next month we'd like two extra flows. Is that inside scope?", when: "Aug 18, 10:04" },
      {
        from: "obtainer",
        text: "One fits in the monthly hours. The second would push past it, so I'd propose a separate agreement for it.",
        when: "Aug 18, 10:22",
      },
      { from: "company", text: "That works. Send the scope over and we'll confirm.", when: "Aug 18, 10:40" },
    ],
  },
  {
    id: "t2",
    companyId: "c1",
    obtainerId: "o2",
    context: "Weekly QA Coverage — active service",
    messages: [
      { from: "obtainer", text: "This week's regression pass is done, three issues logged.", when: "Aug 19, 16:12" },
      { from: "company", text: "Thanks — we'll fix two before Friday's release.", when: "Aug 19, 17:00" },
    ],
  },
  {
    id: "t3",
    companyId: "c1",
    obtainerId: "o5",
    context: "Recurring need — weekly design updates",
    messages: [
      { from: "obtainer", text: "I saw your recurring need. Could you share the current design system?", when: "Aug 19, 09:30" },
    ],
  },
];

export const companyPayments = [
  { id: "pm1", date: "Aug 17, 2026", description: "Weekly QA Coverage — Priya Raman", amount: 900, status: "Paid" },
  { id: "pm2", date: "Aug 10, 2026", description: "Weekly QA Coverage — Priya Raman", amount: 900, status: "Paid" },
  { id: "pm3", date: "Aug 5, 2026", description: "Monthly Design Updates — Marcus Johnson", amount: 2400, status: "Paid" },
  { id: "pm4", date: "Aug 2, 2026", description: "Free Pool task — regression pass", amount: 400, status: "Paid" },
  { id: "pm5", date: "Jul 5, 2026", description: "Monthly Design Updates — Marcus Johnson", amount: 2400, status: "Failed" },
];

export const obtainerEarnings = [
  { id: "e1", date: "Aug 5, 2026", description: "Monthly Design Updates — Northbeam Labs", amount: 2400, status: "Paid out" },
  { id: "e2", date: "Aug 2, 2026", description: "Free Pool task — help centre screenshots", amount: 350, status: "Pending approval" },
  { id: "e3", date: "Jul 5, 2026", description: "Monthly Design Updates — Northbeam Labs", amount: 2400, status: "Paid out" },
  { id: "e4", date: "Jun 5, 2026", description: "Monthly Design Updates — Northbeam Labs", amount: 2400, status: "Paid out" },
];

// ---- lookups -------------------------------------------------------------

export const getObtainer = (id: string) => obtainers.find((o) => o.id === id);
export const getCompany = (id: string) => companies.find((c) => c.id === id);
export const getService = (id: string) => services.find((s) => s.id === id);
export const getNeed = (id: string) => needs.find((n) => n.id === id);
export const getAgreement = (id: string) => agreements.find((a) => a.id === id);
export const getPool = (id: string) => pools.find((p) => p.id === id);
export const getLink = (slug: string) => privateLinks.find((l) => l.slug === slug);
export const servicesByObtainer = (id: string) => services.filter((s) => s.obtainerId === id);

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// The signed-in demo identities
export const DEMO_COMPANY_ID = "c1";
export const DEMO_OBTAINER_ID = "o1";
