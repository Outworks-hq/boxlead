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
    slug: "private-links",
    name: "Private Links",
    short: "A direct link to your service, shared only with the people you choose.",
    intro:
      "A Private Link is a shareable page for one of your recurring services. You send it to a company you already know, and they can read the scope, price and rhythm and start the relationship without going through public browsing.",
    points: [
      "One link per service, switch it on or off whenever you want.",
      "Keeps existing clients out of the public marketplace flow.",
      "The same confirmed-scope rules apply before anything starts.",
    ],
  },
  {
    slug: "presales",
    name: "PreSales",
    short: "Sort out questions, scope and price before anything is committed.",
    intro:
      "PreSales is the conversation that happens before a relationship or a pool task starts. Both sides ask questions, adjust the scope and settle the price, so nothing begins until the expectation is the same on both sides.",
    points: [
      "Ask questions about scope, timing and access before committing.",
      "Adjust the price or the scope until both sides agree.",
      "Nothing is billed until both sides confirm.",
    ],
  },
  {
    slug: "uptainer",
    name: "UpTainer",
    short: "Grow a trusted connection into a bigger ongoing responsibility.",
    intro:
      "UpTainer is how a light connection becomes a larger one. Someone who has been taking occasional paid tasks in your pool can be moved up into a full recurring service with its own scope, price and billing rhythm.",
    points: [
      "Starts from work already delivered, so there's real context.",
      "Turns occasional task work into an agreed recurring responsibility.",
      "Both sides confirm the new scope and price before it takes effect.",
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
