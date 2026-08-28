import { useSyncExternalStore } from "react";

import { DEMO_OBTAINER_ID, getCompany, getObtainer, pools as seedPools } from "@/lib/data";

export type PoolOwnerType = "Company" | "Individual" | "Community";

export type PoolWorkKind = "Task" | "Project" | "Recurring";

export type PoolWorkStatus = "Open" | "Accepted" | "Submitted" | "Approved" | "Paid";

export type PoolMember = {
  id: string;
  name: string;
  initials: string;
  joined: string;
  note: string;
};

export type PoolWork = {
  id: string;
  title: string;
  scope: string;
  requirements: string;
  compensation: number;
  kind: PoolWorkKind;
  status: PoolWorkStatus;
  acceptedBy?: string;
  acceptedByName?: string;
  posted: string;
  submissionNote?: string;
};

export type PoolMessage = {
  id: string;
  author: string;
  text: string;
  when: string;
};

export type StoredPool = {
  id: string;
  name: string;
  ownerId: string;
  ownerName: string;
  ownerType: PoolOwnerType;
  description: string;
  workDescription: string;
  members: PoolMember[];
  work: PoolWork[];
  messages: PoolMessage[];
  activity: { id: string; text: string; when: string }[];
  createdByMe?: boolean;
};

const KEY = "boxlead.pools.v1";
const listeners = new Set<() => void>();

function seed(): StoredPool[] {
  return seedPools.map((p) => {
    const owner = getCompany(p.companyId);
    return {
      id: p.id,
      name: p.name,
      ownerId: p.companyId,
      ownerName: owner?.name ?? "BoxLead member",
      ownerType: "Company" as PoolOwnerType,
      description: p.description,
      workDescription:
        "Occasional paid work that sits outside any recurring service — members choose what they take on.",
      members: p.members.map((m) => {
        const o = getObtainer(m.obtainerId);
        return {
          id: m.obtainerId,
          name: o?.name ?? "Member",
          initials: o?.initials ?? "BL",
          joined: m.joined,
          note: m.note,
        };
      }),
      work: p.opportunities.map((op) => {
        const work: PoolWork = {
          id: op.id,
          title: op.title,
          scope: op.scope,
          requirements: "Share a short written summary when you submit.",
          compensation: op.compensation,
          kind: "Task",
          status: op.status,
          posted: op.posted,
        };
        if (op.acceptedBy) {
          work.acceptedBy = op.acceptedBy;
          work.acceptedByName = getObtainer(op.acceptedBy)?.name ?? "Member";
        }
        return work;
      }),
      messages: [],
      activity: [{ id: `${p.id}-a0`, text: "Pool created", when: "Jun 2026" }],
    };
  });
}

let cache: StoredPool[] | null = null;
let loaded = false;

function read(): StoredPool[] {
  if (typeof window === "undefined") return seed();
  if (!loaded) {
    try {
      const raw = window.localStorage.getItem(KEY);
      cache = raw ? (JSON.parse(raw) as StoredPool[]) : seed();
    } catch {
      cache = seed();
    }
    loaded = true;
  }
  return cache ?? seed();
}

function write(next: StoredPool[]) {
  cache = next;
  loaded = true;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

const serverSnapshot = seed();

export function usePools(): StoredPool[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => read(),
    () => serverSnapshot,
  );
}

export function usePool(poolId: string): StoredPool | undefined {
  return usePools().find((p) => p.id === poolId);
}

const now = () => new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

function update(poolId: string, fn: (pool: StoredPool) => StoredPool) {
  write(read().map((p) => (p.id === poolId ? fn(p) : p)));
}

function logged(pool: StoredPool, text: string): StoredPool {
  return { ...pool, activity: [{ id: uid("act"), text, when: now() }, ...pool.activity] };
}

export function createPool(input: {
  name: string;
  ownerName: string;
  ownerType: PoolOwnerType;
  description: string;
  workDescription: string;
}): string {
  const id = uid("pool");
  const pool: StoredPool = {
    id,
    name: input.name,
    ownerId: "me",
    ownerName: input.ownerName,
    ownerType: input.ownerType,
    description: input.description,
    workDescription: input.workDescription,
    members: [],
    work: [],
    messages: [],
    activity: [{ id: uid("act"), text: "Pool created", when: now() }],
    createdByMe: true,
  };
  write([pool, ...read()]);
  return id;
}

export function joinPool(poolId: string, member: { id: string; name: string; initials: string; note: string }) {
  update(poolId, (pool) =>
    pool.members.some((m) => m.id === member.id)
      ? pool
      : logged(
          { ...pool, members: [...pool.members, { ...member, joined: now() }] },
          `${member.name} joined the pool`,
        ),
  );
}

export function leavePool(poolId: string, memberId: string) {
  update(poolId, (pool) =>
    logged({ ...pool, members: pool.members.filter((m) => m.id !== memberId) }, "A member left the pool"),
  );
}

export function postWork(
  poolId: string,
  input: { title: string; scope: string; requirements: string; compensation: number; kind: PoolWorkKind },
) {
  update(poolId, (pool) =>
    logged(
      {
        ...pool,
        work: [
          { id: uid("work"), status: "Open" as PoolWorkStatus, posted: now(), ...input },
          ...pool.work,
        ],
      },
      `Posted "${input.title}"`,
    ),
  );
}

export function acceptWork(poolId: string, workId: string, member: { id: string; name: string }) {
  update(poolId, (pool) =>
    logged(
      {
        ...pool,
        work: pool.work.map((w) =>
          w.id === workId
            ? { ...w, status: "Accepted", acceptedBy: member.id, acceptedByName: member.name }
            : w,
        ),
      },
      `${member.name} accepted work`,
    ),
  );
}

export function submitWork(poolId: string, workId: string, note: string) {
  update(poolId, (pool) =>
    logged(
      {
        ...pool,
        work: pool.work.map((w) => (w.id === workId ? { ...w, status: "Submitted", submissionNote: note } : w)),
      },
      "Work submitted for approval",
    ),
  );
}

export function approveWork(poolId: string, workId: string) {
  update(poolId, (pool) =>
    logged(
      { ...pool, work: pool.work.map((w) => (w.id === workId ? { ...w, status: "Approved" } : w)) },
      "Work approved",
    ),
  );
}

export function releasePayment(poolId: string, workId: string) {
  update(poolId, (pool) =>
    logged(
      { ...pool, work: pool.work.map((w) => (w.id === workId ? { ...w, status: "Paid" } : w)) },
      "Payment released",
    ),
  );
}

export function postMessage(poolId: string, author: string, text: string) {
  update(poolId, (pool) => ({
    ...pool,
    messages: [...pool.messages, { id: uid("msg"), author, text, when: now() }],
  }));
}

export const ME_OBTAINER = DEMO_OBTAINER_ID;

export function isMember(pool: StoredPool, memberId: string) {
  return pool.members.some((m) => m.id === memberId);
}
