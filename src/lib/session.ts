import { useSyncExternalStore } from "react";

export type Role = "company" | "obtainer";

export type Session = {
  role: Role;
  name: string;
  email: string;
  /** A brand-new account has no services/needs yet — used for empty demo states. */
  fresh: boolean;
};

const KEY = "boxlead.session";
const listeners = new Set<() => void>();
let cache: Session | null = null;
let loaded = false;

function read(): Session | null {
  if (typeof window === "undefined") return null;
  if (!loaded) {
    try {
      const raw = window.localStorage.getItem(KEY);
      cache = raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      cache = null;
    }
    loaded = true;
  }
  return cache;
}

function emit() {
  listeners.forEach((l) => l());
}

export function signIn(session: Session) {
  cache = session;
  loaded = true;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    /* ignore */
  }
  emit();
}

export function signOut() {
  cache = null;
  loaded = true;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  emit();
}

export function useSession(): Session | null {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => read(),
    () => null,
  );
}
