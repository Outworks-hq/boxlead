export type LearnTopic = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  points: string[];
};

export const LEARN_TOPICS: LearnTopic[] = [
  {
    slug: "free-pool",
    name: "Free Pool",
    short: "Stay connected to someone you trust and take paid task work when they post it.",
    intro:
      "A Free Pool is a private work space that belongs to one company, individual or community. People join that specific pool and stay in it. When the owner has paid work available, they post it inside the pool with the payment already attached. Members see it, choose whether to take it, complete it, submit it, and get paid once it's approved.",
    points: [
      "Create a pool, name it and describe the kind of work you post there.",
      "People join that pool and remain members — no reapplying, no searching for new work each time.",
      "Work is posted inside the pool with scope, requirements and payment attached.",
      "Members accept only what suits them. Membership never obliges anyone to work.",
      "Work is submitted, the owner approves, and payment is released.",
    ],
  },
  {
    slug: "servicetap",
    name: "ServiceTap",
    short: "Start an agreed service with one tap instead of renegotiating it.",
    intro:
      "ServiceTap is the shortcut for work you've already agreed on. Once a scope and price exist between two sides, either side can tap the service to start the next cycle without writing a new brief.",
    points: [
      "Reuses the scope and price both sides already confirmed.",
      "Good for repeat cycles and predictable extra rounds of the same work.",
      "Any change to scope or price still needs both confirmations.",
    ],
  },
  {
    slug: "uptainer",
    name: "UpTainer Enterprise",
    short: "Take an established BoxLead relationship further. Future feature.",
    intro:
      "After a company has worked with an Obtainer, built trust, and no longer needs the normal marketplace layer for that relationship, UpTainer provides a deeper way to work together inside approved company systems and operating environments. The company decides who it trusts. UpTainer simply provides the enterprise layer for that trusted relationship.",
    points: [
      "Find an Obtainer on BoxLead and establish a recurring service relationship.",
      "Work together over time until the company decides it trusts that person or group.",
      "Move that relationship into UpTainer Enterprise for deeper internal access and work.",
      "BoxLead does not certify or declare any provider trustworthy — the company decides.",
      "UpTainer is a future feature and is not part of the current BoxLead launch offering.",
    ],
  },
  {
    slug: "support",
    name: "Support",
    short: "Help with scope, payments and anything that goes sideways.",
    intro:
      "Support covers the practical side of using BoxLead: understanding scope confirmations, billing rhythms, released payments and what to do when a relationship or a pool task doesn't go to plan.",
    points: [
      "Guidance on scope, billing rhythms and released payments.",
      "Help pausing or ending a relationship cleanly.",
      "A place to raise a disagreement over delivered work.",
    ],
  },
];

export const getTopic = (slug: string) => LEARN_TOPICS.find((t) => t.slug === slug);
